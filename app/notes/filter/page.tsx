import { getNotes } from '../../../lib/api'
import NotesClient from './Notes.client'

export default async function Notes() {
  const notes = await getNotes('', 1)
  return (
    <>
      <NotesClient response={notes} />
    </>
  )
}
