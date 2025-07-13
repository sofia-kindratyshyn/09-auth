'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  const [loading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    router.refresh()
    setIsLoading(false)
  }, [router])
  return <>{loading ? <p>Loading...</p> : <div>{children}</div>}</>
}
