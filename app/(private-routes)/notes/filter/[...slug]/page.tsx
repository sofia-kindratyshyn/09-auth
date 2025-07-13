import { Metadata } from 'next'
import NotesClient from './Notes.client'
import { getNotes } from '../../../../../lib/api/api'

type FilteredNotesProps = {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: FilteredNotesProps): Promise<Metadata> {
  const { slug } = await params
  const category = slug[0]
  return {
    title: `${category} Notes`,
    description: `Browse all notes in the "${category}" category.`,
    openGraph: {
      title: `${category} Notes | NoteHUB`,
      description: `Discover insightful notes categorized under "${category}". Updated regularly with fresh content.`,
      url: `https://07-routing-nextjs-nu-orpin.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: 'https://cdn.prod.website-files.com/61a05ff14c09ecacc06eec05/61f59d9bcbc09e86950d63a2_illustration_1-3.png',
          alt: 'Notebook with a pen',
        },
      ],
    },
  }
}

export default async function FilteredNotes({ params }: FilteredNotesProps) {
  const { slug } = await params
  const notes = slug[0] === 'All' ? await getNotes('', 1) : await getNotes('', 1, slug[0])
  return (
    <>
      {slug[0] === 'All' ? (
        <NotesClient initialNotes={notes} />
      ) : (
        <NotesClient initialNotes={notes} tag={slug[0]} />
      )}
    </>
  )
}
