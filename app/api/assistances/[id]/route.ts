import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'

// get single assistance
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    const assistance = await prisma.assistance.findUnique({
      where: {
        id,
      },
      include: {
        Category: true, // include the related Category
      },
    })

    if (!assistance) {
      return new NextResponse('Assistance not found', { status: 404 })
    }

    return NextResponse.json(assistance)
  } catch (error) {
    console.error('Error in GET /api/assistances/:id', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

interface RequestBody {
  problem: boolean
}

interface RequestBody {
  editorContent: string
}

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()
    const body: RequestBody = await request.json()

    const updatedAssistance = await prisma.assistance.update({
      where: { id },
      data: {
        editorContent: body.editorContent,
      },
    })

    if (!updatedAssistance) {
      return new Response('Assistance not found', { status: 404 })
    }

    return new Response(JSON.stringify(updatedAssistance))
  } catch (error) {
    console.error('Error in PATCH /api/assistances/:id/editorContent', error)
    return new Response('Internal server error', { status: 500 })
  }
}

// DELETE ASSISTANT
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    const deletedAssistance = await prisma.assistance.delete({
      where: { id },
    })

    if (!deletedAssistance) {
      return new Response('Assistance not found', { status: 404 })
    }

    return new Response(JSON.stringify({ deletedAssistance }))
  } catch (error) {
    console.error('Error in DELETE /api/assistances/:id', error)
    return new Response('Internal server error', { status: 500 })
  }
}
