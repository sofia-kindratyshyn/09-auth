'use client'
import css from './Notes.client.module.css'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { getNotes, NotesResponse } from '../../lib/api'
import NoteList from '../../components/NoteList/NoteList'
import SearchBox from '../../components/SearchBox/SearchBox'
import Pagination from '../../components/Pagination/Pagination'
import NoteModal from '../../components/NoteModal/NoteModal'
import { Toaster } from 'react-hot-toast'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

type NotesClientProps = {
  responce: NotesResponse
}

export default function NotesClient({ responce }: NotesClientProps) {
  const [page, setPage] = useState(1)
  const [searchedValue, setSearchedValue] = useState('')
  const [debouncedText] = useDebounce(searchedValue, 300)
  const [openModal, setOpenModal] = useState(false)

  const { data } = useQuery({
    queryKey: ['notes', debouncedText, page],
    queryFn: () => getNotes(debouncedText, page),
    placeholderData: keepPreviousData,
  })

  const getHandleSearch = (value: string) => {
    setSearchedValue(value)
    setPage(1)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox getValue={getHandleSearch} />
        {typeof responce.totalPages === 'number' && responce.totalPages > 1 && (
          <Pagination totalPages={responce.totalPages} currentPage={page} onPageChange={setPage} />
        )}

        <button onClick={() => setOpenModal(true)} className={css.button}>
          Create note +
        </button>
      </header>

      {responce.notes.length === 0 && <p>There are no notes found for your request</p>}
      {data?.notes && <NoteList notes={data.notes} />}
      {openModal && <NoteModal toClose={closeModal} />}
    </div>
  )
}
