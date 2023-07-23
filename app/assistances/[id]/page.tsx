import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { DeleteAssistanceButton } from '@/app/components/DeleteAssistanceButton'
import { DeleteAssistanceModal } from '@/app/components/DeleteAssistanceModal'
import Editor from '@/app/components/Editor'
import { myFont } from '@/app/layout'
import { getServerSession } from 'next-auth'

const getSingleAssistanceData = async (id: string) => {
  const response = await fetch(`${process.env.API_ENDPOINT}/${id}`, {
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

const AssistancePage = async ({ params }: { params: { id: string } }) => {
  const assistance = await getSingleAssistanceData(params.id)
  const session = await getServerSession(authOptions)

  return (
    <div className="relative min-h-screen w-full flex-col bg-gray-200">
      <div className={`flex-center gap-4 pb-4 pt-6 ${myFont.className}`}>
        <span
          style={{ backgroundColor: assistance.Category.color }}
          className={`ml-4 rounded-md px-6 py-3 text-2xl font-extrabold tracking-wide text-gray-700`}
        >
          {assistance.Category.name}
        </span>
        <span className="text-6xl text-gray-700">
          {assistance.name.toUpperCase()}
        </span>
      </div>
      <Editor assistance={assistance} />
      { session && <DeleteAssistanceButton/> }
      <DeleteAssistanceModal assistance={assistance} /> 
    </div>
  )
}

export default AssistancePage
