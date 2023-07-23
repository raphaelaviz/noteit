import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        Assistance: true,
      },
    })

    if (!category) {
      return new NextResponse('Category not found', { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error in GET /api/categories/:id', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

// DELETE CATEGORY
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    const deletedCategory = await prisma.category.delete({
      where: { id },
    })

    if (!deletedCategory) {
      return new Response('Category not found', { status: 404 })
    }

    return new Response(JSON.stringify({ deletedCategory }))
  } catch (error) {
    console.error('Error in DELETE /api/category/:id', error)
    return new Response('Internal server error', { status: 500 })
  }
}
