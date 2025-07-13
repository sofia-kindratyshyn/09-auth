import { create } from 'zustand'
import { User } from '../../types/user'

type AuthStore = {
  isAuthentificated: boolean
  clearIsAuthenticated: (value: boolean) => void
  setUser: (userData: User) => void
  user: User
  cleanUserData: () => void
}

const initialUserData: User = {
  email: '',
  username: '',
  avatar: '',
}

export const useAuthStore = create<AuthStore>(set => ({
  user: initialUserData,
  isAuthentificated: false,
  clearIsAuthenticated: (value: boolean) => set({ isAuthentificated: value }),
  setUser: (userData: User) => set({ user: userData }),
  cleanUserData: () => set({ user: initialUserData }),
}))
