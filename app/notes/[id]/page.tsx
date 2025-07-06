import { fetchNoteById } from '../../../lib/api'
import NoteDetailsClient from './NoteDetails.client'

type NoteDetailsProps = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: NoteDetailsProps) {
  const { id } = await params
  const selectedNote = await fetchNoteById(Number(id))
  return {
    title: `${selectedNote.title}`,
    description: `${selectedNote.content}`,
    openGraph: {
      title: `${selectedNote.title}`,
      description: `${selectedNote.content}`,
      url: `https://07-routing-nextjs-nu-orpin.vercel.app/notes/${selectedNote.id}`,
      images: [
        {
          url: 'https://cdn.prod.website-files.com/61a05ff14c09ecacc06eec05/61f59d9bcbc09e86950d63a2_illustration_1-3.png',
          alt: 'Notebook with a pen',
        },
      ],
    },
  }
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params
  const numericId = Number(id)
  return <NoteDetailsClient id={numericId} />
}

export default NoteDetails
