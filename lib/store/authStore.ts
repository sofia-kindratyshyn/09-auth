import { create } from 'zustand'
import { User } from '../../types/user'
import { persist } from 'zustand/middleware'

type AuthStore = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  setUser: (userData: User) => void
  user: User
}

const initialUserData: User = {
  email: '',
  username: '',
  avatar: '',
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: initialUserData,
      isAuthenticated: false,
      setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
      setUser: (userData: User) => set({ user: userData, isAuthenticated: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
