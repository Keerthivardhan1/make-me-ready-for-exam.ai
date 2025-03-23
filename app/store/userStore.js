import { create } from 'zustand';

const UserStore = create((set) => ({
    email: null,
    token : null,
    exam : null,
    setUser: (newUser) => set((state) => ({ ...state, ...newUser })),
    setExam : (newExam) => set((state) => ({...state , exam:newExam})),
    logout : ()=>set(()=>({ email: null, token: null, exam: null}))
}));

export default UserStore;
