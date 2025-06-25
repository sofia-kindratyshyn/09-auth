import { getNotes } from '../../lib/api'
import NotesClient from './Notes.client'

const Notes = async () => {
  const notes = await getNotes('', 1)

  return <NotesClient response={notes} />
}

export default Notes
