import { getNotes } from '../../lib/api'
import NotesClient from './Notes.client'

const Notes = async () => {
  const notes = await getNotes('', 1)

  return <NotesClient notes={notes} />
}

export default Notes
