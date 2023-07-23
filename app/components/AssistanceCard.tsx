import Link from 'next/link'
import { Category } from '../page'
import { Poppins } from 'next/font/google'

export const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
})

interface AssistanceCardProps {
  title: string
  category: Category | null
  id: string
}

const AssistanceCard: React.FC<AssistanceCardProps> = ({
  id,
  title,
  category,
}) => {

  return (
    <Link href={`/assistances/${id}`}>
      <div
        style={{ backgroundColor: category?.color }}
        className={`${poppins.className} assistance-card`}
      >
        <div className="text-gray-700 mb-5 text-4xl font-bold">{title}</div>
        <div className="absolute bottom-4 rounded-full border-primary bg-slate-50 p-3">
          {category?.name}
        </div>
      </div>
    </Link>
  )
}

export default AssistanceCard
