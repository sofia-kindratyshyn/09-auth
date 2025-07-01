import Link from 'next/link'
import css from './Header.module.css'
import TagsMenu from '../TagsMenu/TagsMenu'
import { getNotes } from '../../lib/api'

export default async function Header() {
  const notes = await getNotes('', 1)
  return (
    <header className={css.header}>
      <Link href='/' aria-label='Home'>
        NoteHub
      </Link>
      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <TagsMenu notesResponce={notes} />
          </li>
        </ul>
      </nav>
    </header>
  )
}
