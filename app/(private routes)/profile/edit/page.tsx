'use client'
import Image from 'next/image'
import css from './edit.module.css'
import { useAuthStore } from '../../../../lib/store/authStore'
import { useRouter } from 'next/navigation'
import { updateUser } from '../../../../lib/api/clientApi'
//import { updateUser } from '../../../../lib/api/clientApi'

type UpatedInfo = {
  username: string
}
export default function EditPage() {
  const { user, setUser } = useAuthStore()
  const router = useRouter()
  async function handleSubitUser(formData: FormData) {
    const formValue = Object.fromEntries(formData) as UpatedInfo
    const payload = {
      username: formValue.username,
      email: user.email,
    }
    console.log(payload)
    const { data } = await updateUser(payload)
    if (data) setUser(payload)
    router.push('/profile')
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src='https://cdn-icons-png.flaticon.com/512/3675/3675805.png'
          alt='User Avatar'
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} action={handleSubitUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor='username'>Username:</label>
            <input id='username' name='username' type='text' className={css.input} />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type='submit' className={css.saveButton}>
              Save
            </button>
            <button
              type='button'
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
