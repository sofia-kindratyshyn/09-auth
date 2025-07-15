import axios from 'axios'
import { Note, NoteForPost } from '../../types/note'
import { clientApi } from './api'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL + '/api'

export const logout = async () => {
  const res = await axios.post('auth/logout', null)
  return res
}

type UserData = {
  email?: string
  username: string
}

export const updateUser = async (data: UserData) => {
  const res = await clientApi.patch('/users/me', data)
  return res
}

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

  const res = await clientApi.get<NotesResponse>(url)
  return res.data
}

export const postNote = async (noteForPostObj: NoteForPost): Promise<Note> => {
  const res = await clientApi.post<Note>(`/notes`, noteForPostObj)

  return res.data
}

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await clientApi.delete<Note>(`/notes/${id}`)

  return res.data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await clientApi.get<Note>(`/notes/${id}`)
  console.log(res.data)
  return res.data
}
