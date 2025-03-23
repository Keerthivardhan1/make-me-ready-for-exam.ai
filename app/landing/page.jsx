"use client"
import Link from "next/link"
import UserStore from "../store/userStore"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import RoadMapStore from "../store/RoadMapStore";
import axios from "axios";
import { handleError, handleSuccess } from "../pages/signup/handleErrors";
import Image from "next/image";
  
export default function page() {

  const user = UserStore();
  const router = useRouter();
  const {roadmap} = RoadMapStore()

  useEffect(()=>{
    console.log("user :",user )
    if(!user || !user.token || !user.email ){
      router.replace('/');
    }
  },[user , router])

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

  useEffect(()=>{
    console.log("store roadmap :::", roadmap);
  }, [])

  const handleLogout = async ()=>{
    try {
      const responce = await axios.post(
        "http://localhost:8000/saveroadmap" , {
          email : user.email,
          exam : user.exam,
          new_roadmap : roadmap
        }
      )
      console.log("save res :" , responce);
      if(responce.data.success){
        handleSuccess("roadmap saved ...")
      }
    } catch (error) {
      console.log("save roadmap error : ")
      handleError("Unable to save roadmap !!")
    }
    user.logout();
    localStorage.removeItem('name');
    localStorage.removeItem('email');

    console.log("logout user :", user)

  }
  
  return (
    <>
    <div>
    <div className=' mt-10 m-20 flex justify-center items-center h-[85vh] border-black rounded-md'>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wide lg:text-9xl">
      Your <span className=" ">Mentor</span> <br></br> And <br></br> <span className=" text-orange-500">Study Companian</span> <br></br> is <span className="">Hear</span> . . . 
    </h1>
    </div>
  <ul className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-300 bg-opacity-50 backdrop-blur-md max-w-[30vw] dock font-extrabold text-2xl rounded-lg flex justify-between items-center p-4 gap-4">
    <li>About</li>
    <li>Notes</li>
    <li>Doc</li>
    <li>
      <Link href={"/r4"}>RoadMap</Link>
    </li>
    <li>
    <Button  onClick={handleLogout} >Logout</Button>
    </li>

  </ul>

  <div className="h-[80vh] p-20 bg-zinc-100 flex  items-center justify-between gap-3  m-3 rounded-2xl">
    <div className="flex flex-col gap-3 max-w-[35vw]  text-wrap break-words ">
      <span className="text-2xl font-bold whitespace-nowrap" >🚀 Introducing <span className="text-orange-500">PrepareMe.AI</span> – Your AI-Powered Exam Mentor! 🎯</span>
      <p></p>
      <p></p>
      <span className="text-2xl font-bold" >🔍 How it works?</span>

      <div className="flex flex-col mt-3 gap-3">
      <span className="text-2xl font-bold" >📌 Takes exam syllabus, date, and <span className="text-orange-500">student preferences</span> as input</span>
      <span className="text-2xl font-bold" >📌 Generates a <span className="text-orange-500">personalized roadmap</span> for preparation</span>
      <span className="text-2xl font-bold" >📌 <span className="text-orange-500">Tracks progress</span> and ensures students stay on track</span>
      </div>
    </div>
  <Image src="/images/img1.png" alt="Banner" width={650} height={400} />
</div>

    <div className="h-[90vh] bg-black flex flex-col items-center justify-center m-3 rounded-2xl">
    <h4 className="scroll-m-20 text-xl text-orange-500 font-semibold tracking-tight ">
      @Keerthivardhan
    </h4>
    <h4 className="scroll-m-20 text-xl text-orange-500 font-semibold tracking-tight ">
      @Himanshu
    </h4>
    <h4 className="scroll-m-20 text-xl text-orange-500 font-semibold tracking-tight ">
      @Sumanth
    </h4>
    </div>
    </div>

    </>
  )
}
