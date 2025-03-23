import { create } from 'zustand';

const UserStore = create((set) => ({
    email: null,
    token : null,
    setUser: (newUser) => set((state) => ({ ...state, ...newUser }))
}));

export default UserStore;
