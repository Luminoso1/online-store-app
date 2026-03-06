import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuth = create(
  persist(
    (set) => ({
      isAuth: false,

      user: null,

      login: (user) => set({ isAuth: true, user }),

      logout: () => set({ isAuth: false, user: null }),

      setAuth: (user) => set({ user })
    }),
    { name: 'auth' }
  )
)

export default useAuth
