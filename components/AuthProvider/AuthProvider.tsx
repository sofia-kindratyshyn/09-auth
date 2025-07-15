'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { checkServerSession } from '../../lib/api/serverApi'
import { useAuthStore } from '../../lib/store/authStore'
import { ClipLoader } from 'react-spinners'

const privateRoutes = ['/profile', '/notes']

type Props = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { setUser, clearIsAuthenticated } = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const res = await checkServerSession()
        if (res?.data) {
          setUser(res.data)
        } else {
          if (privateRoutes.some(route => pathname.startsWith(route))) {
            clearIsAuthenticated(true)
            router.push('/sign-in')
          }
        }
      } catch {
        if (privateRoutes.some(route => pathname.startsWith(route))) {
          clearIsAuthenticated(true)
          router.push('/sign-in')
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router, setUser, clearIsAuthenticated])

  if (isLoading)
    return (
      <ClipLoader
        size={50}
        cssOverride={{
          display: 'block',
          margin: '0 auto',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      />
    )

  return <>{children}</>
}
