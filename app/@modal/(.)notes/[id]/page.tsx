import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import NotePreview from './NotePreview.client'
import { fetchNoteById } from '../../../../lib/api/clientApi'

type NotePreviewProps = {
  params: Promise<{ id: string }>
}

export default async function NotePrewievPage({ params }: NotePreviewProps) {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note-preview', id],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  )
}
