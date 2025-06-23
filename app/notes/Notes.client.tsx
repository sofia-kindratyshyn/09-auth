'use client'
import css from './Notes.client.module.css'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import NoteList from '../../components/NoteList/NoteList'
import { useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import { Toaster } from 'react-hot-toast'
import { useDebounce } from 'use-debounce'
import React from 'react'
import { getNotes, NotesResponce } from '../../lib/api'
import SearchBox from '../../components/SearchBox/SearchBox'
import NoteModal from '../../components/NoteModal/NoteModal'

export default function NotesClient() {
  const [pageCount, setPageCount] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [searchedValue, setSearchedValue] = useState('')
  const [debouncedText] = useDebounce(searchedValue, 300)

  const { data, isSuccess } = useQuery<NotesResponce>({
    queryKey: ['note', debouncedText, pageCount],
    queryFn: () => getNotes(pageCount, debouncedText),
    placeholderData: keepPreviousData,
  })

  function closeModal() {
    setOpenModal(false)
    console.log(data?.total)
  }

  const getHandleSearch = (value: string) => {
    setSearchedValue(value)
    setPageCount(1)
  }

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox value={searchedValue} getValue={getHandleSearch} />
        {typeof data?.total === 'number' && data.total > 1 && (
          <Pagination totalPages={data.total} currentPage={pageCount} onPageChange={setPageCount} />
        )}

        {isSuccess && (
          <button onClick={() => setOpenModal(!openModal)} className={css.button}>
            Create note +
          </button>
        )}
      </header>

      {data?.notes && data.notes.length == 0 && <p>There are no notes found for your request</p>}
      {data?.notes && <NoteList notes={data.notes} />}
      {openModal && <NoteModal toClose={closeModal} />}
    </div>
  )
}
