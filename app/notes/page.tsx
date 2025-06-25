import { getNotes } from '../../lib/api'
import NotesClient from './Notes.client'

const Notes = async () => {
  const notes = await getNotes('', 1)

  return <NotesClient responce={notes} />
}

export default Notes
