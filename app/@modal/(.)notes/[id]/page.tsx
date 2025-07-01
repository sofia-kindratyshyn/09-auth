'use client'

import { useParams } from 'next/navigation'
import NotePreview from '../../../../components/NotePreview/NotePreview'
import Modal from '../../../../components/NoteModal/NoteModal'

export default function NotePrewievPage() {
  const params = useParams()
  const id = params?.id as string

  return (
    <Modal toClose={() => {}}>
      <NotePreview id={id} />
    </Modal>
  )
}
