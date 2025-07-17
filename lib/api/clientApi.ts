import { Note, NoteForPost } from '../../types/note'
import { nextServer } from './api'
import { User } from '../../types/user'

export type RegisterData = {
  email: string
  password: string
}

type UserData = {
  email?: string
  username: string
}

export const logout = async () => {
  const res = await nextServer.post('auth/logout', null)
  return res
}

export type NotesResponse = {
  notes: Note[]
  totalPages: number
}

export const updateUser = async (data: UserData) => {
  const res = await nextServer.patch('/users/me', data)
  return res
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

  const res = await nextServer.get<NotesResponse>(url)
  return res.data
}

export const postNote = async (noteForPostObj: NoteForPost): Promise<Note> => {
  const res = await nextServer.post<Note>(`/notes`, noteForPostObj)

  return res.data
}

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`)

  return res.data
}

export const register = async (data: RegisterData) => {
  const res = await nextServer.post<User>('/auth/register', data)
  return res
}

export const login = async (data: RegisterData) => {
  const res = nextServer.post<User>('/auth/login', data)
  return res
}

export const checkServerSession = async () => {
  const res = await nextServer.get('/auth/session')
  return res
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`)
  console.log(res.data)
  return res.data
}
