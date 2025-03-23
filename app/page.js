"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserStore from "./store/userStore";
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './pages/signup/handleErrors';
import { Button } from '@/components/ui/button';


export default function Home() {
  const router = useRouter();
  const user = UserStore();

  useEffect(() => {
    if (user && user.email)
      router.replace('/landing');
  }, [user]); 

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
})

useEffect(()=>{
    const localStorage_token = localStorage.getItem("token");
    const localStorage_name = localStorage.getItem('name');
    const localStorage_email = localStorage.getItem('email');

    if(localStorage_email && localStorage_name && localStorage_token){
        user.setUser({
            email : localStorage_email,
            token : localStorage_token
        })
    }
},[])


const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
}

const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
        return handleError('email and password are required')
    }
    try {
        const url = "http://localhost:8000/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        const result = await response.json();
        const { success, message, jwtToken, name, error } = result;
        if (success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('name', name);
            localStorage.setItem('email' , email);
            user.setUser({
              email : loginInfo.email,
              token : jwtToken
            })
            setTimeout(() => {
                router.replace('/landing')
            }, 1000)
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details);
        } else if (!success) {
            handleError(message);
        }
        console.log(result);
    } catch (err) {
        handleError(err);
    }
}

  return (
    <div className=' w-screen h-screen flex justify-around items-center'>
    <div className='container'>
    <h1 className='text-2xl font-extrabold '>Login</h1>
    <form onSubmit={handleLogin}>
        <div>
            <label htmlFor='email'>Email</label>
            <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter your email...'
                value={loginInfo.email}
            />
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter your password...'
                value={loginInfo.password}
            />
        </div>
        <Button type='submit'>Login</Button>
        <span>Does't have an account ?
            <Link href="/pages/signup" className='p-2 text-blue-600'>Signup</Link>
        </span>
    </form>
    <ToastContainer />
</div>
</div>
    
  );
}
