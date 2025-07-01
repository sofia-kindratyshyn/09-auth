import Link from 'next/link'
import css from './SidebarNotes.module.css'

type SidebarNotesProps = {
  notes: string[]
}

export default function SidebarNotes({ notes }: SidebarNotesProps) {
  return (
    <ul className={css.menuList}>
      <li key='All' className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All
        </Link>
      </li>
      {notes.map(tag => {
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
