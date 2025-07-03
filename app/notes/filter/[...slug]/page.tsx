import { getNotes } from '../../../../lib/api'
import NotesClient from './Notes.client'

type FilteredNotesProps = {
  params: Promise<{ slug: string[] }>
}

export default async function FilteredNotes({ params }: FilteredNotesProps) {
  const { slug } = await params
  const notes = await getNotes('', 1)
  return (
    <>
      {slug[0] === 'All' ? (
        <NotesClient initialNotes={notes} />
      ) : (
        <NotesClient initialNotes={notes} tag={slug} />
      )}
    </>
  )
}
