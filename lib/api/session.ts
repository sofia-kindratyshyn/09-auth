import { cookies } from 'next/headers'
import { clientApi } from './api'

export const checkServerSession = async () => {
  const cookieStore = await cookies()
  const res = await clientApi.get('/auth/session', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      Cookie: cookieStore.toString(),
    },
  })
  return res
}
