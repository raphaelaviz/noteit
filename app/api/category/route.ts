import prisma from '@/prisma/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

interface CategoryRequestBody {
  name: string
  color: string
  userId: string | null // Add userId to the request body
}

// CREATES A NEW CATEGORY
export async function POST(request: Request) {
  try {
    const body: CategoryRequestBody = await request.json()

    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        color: body.color,
        userId: body.userId, // Use userId from the request body
      },
    })

    return NextResponse.json(newCategory)
  } catch (error) {
    console.error('Error in POST /api/category:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
