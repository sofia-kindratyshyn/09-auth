import SidebarNotes from '../../../../components/SidebarNotes/SidebarNotes'
import { getNotes } from '../../../../lib/api'

export default async function Sidebar() {
  const { notes } = await getNotes('', 1)
  const uniqueTags = [...new Set(notes.map(note => note.tag))]
  return <SidebarNotes notes={uniqueTags} />
}
