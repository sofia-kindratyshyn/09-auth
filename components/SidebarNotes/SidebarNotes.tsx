'use client'
import Link from 'next/link'
import css from './SidebarNotes.module.css'
import { getNotes } from '../../lib/api'
import { useQuery } from '@tanstack/react-query'

export default function SidebarNotes() {
  const { data } = useQuery({
    queryKey: ['note-tag'],
    queryFn: () => getNotes('', 1),
    refetchOnMount: false,
  })
  return (
    <ul className={css.menuList}>
      <li key='All' className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All
        </Link>
      </li>
      {data?.notes &&
        data.notes.map(note => {
          return (
            <li key={note.tag} className={css.menuItem}>
              <Link href={`/notes/filter/${note.tag}`} className={css.menuLink}>
                {note.tag}
              </Link>
            </li>
          )
        })}
    </ul>
  )
}
