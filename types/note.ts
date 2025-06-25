export type NoteForPost = {
    title: string,
    content: string,
categoryId: string
}

export type ErrorProps = {
  error: Error
  reset: () => void
}