import NotesClient from '../Notes.client'

type FilteredNotesProps = {
  params: Promise<{ slug: string[] }>
}

export default async function FilteredNotes({ params }: FilteredNotesProps) {
  const { slug } = await params
  return <>{slug[0] === 'All' ? <NotesClient /> : <NotesClient category={slug} />}</>
}
