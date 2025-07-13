import { cookies } from 'next/dist/server/request/cookies'
import { api, authToken } from './api'
import { User } from '../../types/user'

export type RegisterData = {
  email: string
  password: string
}

export const register = async (data: RegisterData) => {
  const res = await api.post<User>('/auth/register', data, authToken)
  return res
}

export const login = async (data: RegisterData) => {
  const res = api.post<User>('/auth/login', data, authToken)
  return res
}

export const checkServerSession = async () => {
  const cookieStore = await cookies()
  const res = await api.get('/auth/session', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      Cookie: cookieStore.toString(),
    },
  })
  return res
}
