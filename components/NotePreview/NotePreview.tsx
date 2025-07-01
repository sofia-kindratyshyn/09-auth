'use client'
import { useEffect, useState } from 'react'
import { fetchNoteById } from '../../lib/api'
import css from './NotePreview.module.css'
import { Note } from '../../types/note'
import { useRouter } from 'next/navigation'

type NotePreviewProps = {
  id: string
}

export default function NotePreview({ id }: NotePreviewProps) {
  const [notePreview, setNotePreview] = useState<Note | null>(null)
  const router = useRouter()
  useEffect(() => {
    fetchNoteById(id).then(setNotePreview)
  }, [id])

  return (
    <div className={css.container}>
      {notePreview && (
        <div className={css.item}>
          <button className={css.backBtn} onClick={() => router.back()}>
            Назад
          </button>
          <div className={css.header}>
            <h2>{notePreview.title}</h2>
            {notePreview.tag && <span className={css.tag}>{notePreview.tag}</span>}
          </div>
          <div className={css.content}>{notePreview.content}</div>
          <div className={css.date}>
            {new Date(notePreview.createdAt).toLocaleDateString('uk-UA')}
          </div>
        </div>
      )}
    </div>
  )
}
