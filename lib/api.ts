import axios from 'axios'
import { NoteForPost } from '../types/note'
import type { Note } from '../types/note'

axios.defaults.baseURL = 'https://notehub-public.goit.study/api'

export type NotesResponse = {
  notes: Note[]
  totalPages: number
}

export const getNotes = async (
  searchedValue: string,
  pageCount: number
): Promise<NotesResponse> => {
  const url = searchedValue
    ? `/notes?page=${pageCount}&perPage=12&search=${searchedValue}`
    : `/notes?page=${pageCount}&perPage=12`

  const res = await axios.get<NotesResponse>(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })

  return res.data
}

export const postNote = async (noteForPostObj: NoteForPost): Promise<Note> => {
  const res = await axios.post<Note>(`/notes`, noteForPostObj, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })

  return res.data
}

export const deleteNote = async (id: number): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })

  return res.data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })

  return res.data
}
