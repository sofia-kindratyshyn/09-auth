import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { fetchNoteById } from '../../../lib/api'
import NoteDetailsClient from './NoteDetails.client'
import type { Note } from '../../../types/note'

type Props = {
  params: Promise<{ id: string }>
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={(await params).id} />
    </HydrationBoundary>
  )
}

export default NoteDetails
