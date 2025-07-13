import { cookies } from 'next/headers'
import { serverApi } from '../api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStore = cookies()
  const accessToken = (await cookieStore).get('accessToken')?.value
  const refreshToken = (await cookieStore).get('refreshToken')?.value

  const search = request.nextUrl.searchParams.get('search') ?? ''
  const page = Number(request.nextUrl.searchParams.get('page') ?? 1)
  const rawTag = request.nextUrl.searchParams.get('tag') ?? ''
  const tag = rawTag === 'All' ? '' : rawTag

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token missing' }, { status: 401 })
  }

  try {
    const { data } = await serverApi.get('/notes', {
      params: {
        ...(search && { search }),
        page,
        perPage: 12,
        ...(tag && { tag }),
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `refreshToken=${refreshToken}; accessToken=${accessToken}`,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch notes', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()

  try {
    const body = await request.json()

    const { data } = await serverApi.post('/notes', body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    })

    if (data) {
      console.log(data)
      return NextResponse.json(data, { status: 201 })
    }
  } catch (error) {
    console.error('Error creating note:', error)
  }

  return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
}
