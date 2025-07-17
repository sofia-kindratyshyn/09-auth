import { cookies } from 'next/headers'
import { serverApi } from '../../app/api/api'
import { User } from '../../types/user'

export const getUser = async () => {
  const cookieStore = await cookies()

  const res = await serverApi.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  return res.data
}
