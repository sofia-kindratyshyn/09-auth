import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import NotePreview from './NotePreview.client'
import { fetchNoteById } from '../../../../lib/api'

type NotePreviewProps = {
  params: Promise<{ id: string }>
}

export default async function NotePrewievPage({ params }: NotePreviewProps) {
  const { id } = await params

  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['note_id'],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  )
}
