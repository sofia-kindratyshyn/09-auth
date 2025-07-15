import AuthProvider from '../../../../components/AuthProvider/AuthProvider'
import css from '../filter/[...slug]/Notes.client.module.css'
type Props = {
  children: React.ReactNode
  sidebar: React.ReactNode
}

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <AuthProvider>
      <section className={css.container}>
        <div className={css.sidebar}>{sidebar}</div>
        <div>{children}</div>
      </section>
    </AuthProvider>
  )
}

export default NotesLayout
