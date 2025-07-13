'use client'
import Link from 'next/link'
import css from './Profile.client.module.css'
import Image from 'next/image'
import type { Metadata } from 'next'
import { useAuthStore } from '../../../lib/store/userAuthStore'

export const metaData: Metadata = {
  title: 'User`s profile',
  description: 'Profile info page',
}

export default function ProfileClient() {
  const { user } = useAuthStore()
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href={'/'} className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src='https://cdn-icons-png.flaticon.com/512/3675/3675805.png'
              alt='User Avatar'
              width={120}
              height={120}
              className={css.avatar}
              priority
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </>
  )
}
