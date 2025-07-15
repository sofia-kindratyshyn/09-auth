import { NextResponse } from 'next/server'
import { serverApi } from '../../api'
import { cookies } from 'next/headers'

type Props = {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Props) {
  const cookieStore = await cookies()
  const { id } = await params
  const accessToken = cookieStore.get('accessToken')?.value
  const token = cookieStore.get('refreshToken')?.value

  const { data } = await serverApi.get(`/notes/${id}`, {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${token}`,
    },
  })
  if (data) {
    return NextResponse.json(data)
  }
  return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 })
}

export async function DELETE(request: Request, { params }: Props) {
  const cookieStore = await cookies()
  const { id } = await params

  try {
    await serverApi.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })
    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: Props) {
  const cookieStore = await cookies()
  const { id } = await params
  const body = await request.json()

  try {
    const { data } = await serverApi.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })
    if (data) {
      return NextResponse.json(data)
    }
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}
