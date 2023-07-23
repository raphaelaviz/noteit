import prisma from '@/prisma/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

interface RequestBody {
  name: string
  categoryId: string
  userId: string | null // Add userId to the request body
}

// CREATES NEW ASSISTANCE
export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()

    const newAssistance = await prisma.assistance.create({
      data: {
        name: body.name,
        categoryId: body.categoryId,
        favorite: false,
        problem: false,
        userId: body.userId, // Use userId from the request body
        editorContent: '',
      },
      include: {
        Category: true,
      },
    })

    return NextResponse.json(newAssistance)
  } catch (error) {
    console.error('Error in POST /api/assistance:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

