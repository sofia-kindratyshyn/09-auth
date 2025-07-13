import axios from 'axios'
import { Note, NoteForPost } from '../../types/note'

export const authToken = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
}

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api'

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

export type NotesResponse = {
  notes: Note[]
  totalPages: number
}

export const getNotes = async (
  searchedValue = '',
  pageCount = 1,
  tag?: string
): Promise<NotesResponse> => {
  const params = new URLSearchParams()
  params.append('page', pageCount.toString())
  params.append('perPage', '12')

  if (searchedValue) params.append('search', searchedValue)
  if (tag) params.append('tag', tag)

  const url = `/notes?${params.toString()}`

  const res = await api.get<NotesResponse>(url)

  return res.data
}

export const postNote = async (noteForPostObj: NoteForPost): Promise<Note> => {
  const res = await api.post<Note>(`/notes`, noteForPostObj, authToken)

  return res.data
}

export const deleteNote = async (id: number): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`, authToken)

  return res.data
}

export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`, authToken)

  return res.data
}
