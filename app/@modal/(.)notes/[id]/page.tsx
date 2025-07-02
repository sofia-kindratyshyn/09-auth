'use client'

import { useParams } from 'next/navigation'
import Modal from '../../../../components/Modal/Modal'
import NotePreview from './NotePreview'

export default function NotePrewievPage() {
  const params = useParams()
  const id = params?.id as string

  return (
    <Modal toClose={() => {}}>
      <NotePreview id={id} />
    </Modal>
  )
}
