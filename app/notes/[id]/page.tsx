import NoteDetailsClient from './NoteDetails.client'

type NoteDetailsProps = { params: Promise<{ id: string }> }

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params
  return <NoteDetailsClient noteId={id} />
}

export default NoteDetails
