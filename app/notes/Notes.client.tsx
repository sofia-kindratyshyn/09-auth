'use client'
import css from './Notes.client.module.css'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { NotesResponse, getNotes } from '../../lib/api'
import NoteList from '../../components/NoteList/NoteList'
import SearchBox from '../../components/SearchBox/SearchBox'
import Pagination from '../../components/Pagination/Pagination'
import NoteModal from '../../components/NoteModal/NoteModal'
import { Toaster } from 'react-hot-toast'

type NotesClientProps = {
  notes: NotesResponse
}

export default function NotesClient({ notes: initialNotes }: NotesClientProps) {
  const [notes, setNotes] = useState<NotesResponse>(initialNotes)
  const [page, setPage] = useState(1)
  const [searchedValue, setSearchedValue] = useState('')
  const [debouncedText] = useDebounce(searchedValue, 300)
  const [openModal, setOpenModal] = useState(false)
  const [localNotes, setLocalNotes] = useState(notes.notes)

  useEffect(() => {
    async function fetchNotes() {
      const res = await getNotes(debouncedText, page)
      setNotes(res)
    }

    fetchNotes()
  }, [debouncedText, page])

  const getHandleSearch = (value: string) => {
    setSearchedValue(value)
    setPage(1)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  function handleDelete(id: number) {
    setLocalNotes(prev => prev.filter(note => note.id !== id))
  }

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox value={searchedValue} getValue={getHandleSearch} />
        {typeof notes.totalPages === 'number' && notes.totalPages > 1 && (
          <Pagination totalPages={notes.totalPages} currentPage={page} onPageChange={setPage} />
        )}

        <button onClick={() => setOpenModal(true)} className={css.button}>
          Create note +
        </button>
      </header>

      {notes.notes.length === 0 && <p>There are no notes found for your request</p>}
      {notes.notes.length > 0 && <NoteList notes={localNotes} onDelete={handleDelete} />}
      {openModal && <NoteModal toClose={closeModal} />}
    </div>
  )
}
