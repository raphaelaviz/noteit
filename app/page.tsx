import Panel from './components/Panel'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import prisma from '@/prisma/prisma'
import NewAssistanceButton from './components/NewAssistanceButton'
import NewAssistanceModal from './components/NewAssistanceModal'

export interface Category {
  id: string
  name: string
  color: string
}

export interface Assistance {
  assistances: {
    id: string
    name: string
    Category: Category | null
    editorContent: any
  }[]
}

export async function getAllAssistancesData() {
  const session = await getServerSession(authOptions)

  const assistances = session
    ? await prisma.assistance.findMany({
      where: {
        starter: false,
        userId: session.user.id,
      },
      include: {
        Category: true,
      },
    })
    : await prisma.assistance.findMany({
      where: { starter: true },
      include: { Category: true },
    })

  return assistances
}

export async function getCategories() {
  const session = await getServerSession(authOptions)

  const categories = session
    ? await prisma.category.findMany({
      where: {
        OR: [{ userId: null }, { userId: session.user.id }],
      },
    })
    : await prisma.category.findMany({
      where: { userId: null },
    })

  return categories
}

const Container = async () => {

  const allAssistancesData = await getAllAssistancesData()
  const allCategoriesData = await getCategories()
  const session = await getServerSession(authOptions)

  return (
    <div>
      <Panel
        assistancesProp={allAssistancesData}
        categories={allCategoriesData}
      />
      <NewAssistanceButton session={session} />
      <NewAssistanceModal
        categoriesProp={allCategoriesData}
        session={session}
      />
    </div>
  )
}

export default Container
