'use client'
import { ErrorProps } from '../../types/note'

export default function Error({ error, reset }: ErrorProps) {
  return (
    <>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try Again</button>
    </>
  )
}
