import { authToken, clientApi } from './api'
import { User } from '../../types/user'
import axios from 'axios'

export type RegisterData = {
  email: string
  password: string
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL + '/api'

export const register = async (data: RegisterData) => {
  const res = await clientApi.post<User>('/auth/register', data, authToken)
  return res
}

export const login = async (data: RegisterData) => {
  const res = clientApi.post<User>('/auth/login', data, authToken)
  return res
}

export const checkServerSession = async () => {
  const res = await clientApi.get('/auth/session')
  return res
}
