import prisma from '@/prisma/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

// GETS ALL THE CATEGORIES

export async function GET() {
  const session = await getServerSession(authOptions)

  try {
    const categories = session
      ? await prisma.category.findMany({
        where: {
          OR: [{ userId: null }, { userId: session.user.id }],
        },
      })
      : await prisma.category.findMany({
        where: { userId: null },
      })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error in GET /api/categories:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
