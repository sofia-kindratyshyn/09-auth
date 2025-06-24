import { useMutation } from '@tanstack/react-query'
import type { Note } from '../../types/note'
import css from './NoteList.module.css'
import toast from 'react-hot-toast'
import { deleteNote } from '../../lib/api'
import Link from 'next/link'

interface NoteListProps {
  notes: Note[]
  onDelete: (id: number) => void
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onError: () => {
      toast.error('There was an error while deleting.')
    },
    onSuccess: (_note, id) => {
      toast.success('The note successfully deleted!')
      onDelete(id)
    },
  })

  return (
    <ul className={css.list}>
      {notes.map(note => {
        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <Link href={`/notes/${note.id}`} className={css.tag}>
                View details...
              </Link>
              <button onClick={() => mutation.mutate(note.id)} className={css.button}>
                Delete
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
