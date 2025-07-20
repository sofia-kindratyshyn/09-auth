'use client'

import css from './Notes.client.module.css'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Toaster } from 'react-hot-toast'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import SearchBox from '../../../../../components/SearchBox/SearchBox'
import Pagination from '../../../../../components/Pagination/Pagination'
import NoteList from '../../../../../components/NoteList/NoteList'
import Link from 'next/link'
import { getNotes } from '../../../../../lib/api/clientApi'
import { ClipLoader } from 'react-spinners'

type NotesClientProps = {
  tag?: string
  //initialNotes: NotesResponse
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1)
  const [searchedValue, setSearchedValue] = useState('')
  const [debouncedText] = useDebounce(searchedValue, 300)

  const { data, isFetching } = useQuery({
    queryKey: ['notes', debouncedText, page, tag],
    queryFn: () => getNotes(debouncedText, page, tag),
    placeholderData: keepPreviousData,
    //initialData: initialNotes,
    refetchOnMount: false,
  })

  const getHandleSearch = (value: string) => {
    setSearchedValue(value)
    setPage(1)
  }

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox getValue={getHandleSearch} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={newPage => {
              if (newPage !== page) {
                setPage(newPage)
              }
            }}
          />
        )}

        <Link href={'/notes/action/create'} className={css.button}>
          Create note +
        </Link>
      </header>

      {isFetching ? (
        <ClipLoader
          size={50}
          cssOverride={{
            display: 'block',
            margin: '0 auto',
            position: 'fixed',
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        />
      ) : (
        data && data?.notes?.length > 0 && <NoteList notes={data.notes} />
      )}

      {data?.notes?.length === 0 && !isFetching && <p>There are no notes found for your request</p>}
    </div>
  )
}
