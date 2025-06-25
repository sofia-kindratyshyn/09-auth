import axios from "axios";
import { NoteForPost } from "../types/note";

axios.defaults.baseURL = "https://next-docs-api.onrender.com"

export type Note = {
    id: number,
    title: string,
    content: string,
    categoryId: string,
    userId: string,
    createdAt: string
}

export type NotesResponce = {
  notes: Note[]
  total: number
}


export const getNotes = async (pageCount: number, searchedValue: string) => {
     const url = !(searchedValue) ? `/notes?page=${pageCount}` : `/notes?page=${pageCount}&title=${searchedValue}`; 
    const notes = await axios<NotesResponce>(url, {
        headers: {
           Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    })
    return notes.data
}


export const postNote = async (noteForPostObj: NoteForPost): Promise<NoteForPost> => {
    const response = await axios.post<NoteForPost>(`/notes`, noteForPostObj, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    })
    console.log(response.status)
    return response.data;
}

export const deleteNote = async (noteId: number): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    })
    return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await axios<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    });
    return response.data
}