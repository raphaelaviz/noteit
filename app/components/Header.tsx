import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import LogButton from './LogButton'
import Image from 'next/image'
import logo from '../../public/noteit_logo.png'

const Header: React.FC = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="h-30 flex w-full justify-between border-b-2 border-gray-800 bg-gray-50 px-8">
      <Link href={'/'}>
        <Image
          height={12}
          width={240}
          src={logo} alt={'logo'}
          className='py-1'
        />
      </Link>
      <LogButton session={session} />
    </div>
  )
}

export default Header
