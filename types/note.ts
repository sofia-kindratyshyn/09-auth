export type NoteForPost = {
  title: string
  content: string
  tag: string
}
export type Note = {
  id: number
  title: string
  content: string
  tag: string
  createdAt: string
}

export type Metadata = {
  title: string
  description: string
  openGraph: {
    title: string
    description: string
    url: string
    images: {
      url: string
      alt: string
    }[]
  }
}
