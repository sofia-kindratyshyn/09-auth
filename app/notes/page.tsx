import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getNotes } from '../lib/api'
import NotesClient from './Notes.client'

const Notes = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['note'],
    queryFn: () => getNotes(1, ''),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  )
}

export default Notes
