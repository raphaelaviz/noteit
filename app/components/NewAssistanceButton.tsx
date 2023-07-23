'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ImPlus } from 'react-icons/im'
import localFont from 'next/font/local'
import { Session } from 'next-auth'

export const myFont = localFont({ src: '../../public/american_captain.ttf' })

declare const modal_new_assistance: any // DaisyUI function

interface NewAssistanceButtonProps {
  session: Session | null
}

const NewAssistanceButton: React.FC<NewAssistanceButtonProps> = ({ session }) => {
  const [isHover, setHover] = useState(false)

  const handleClick = () => {
    if (!session) {
      signIn()

    } else {
      modal_new_assistance.showModal()
    }
  }

  return (
    <div
      className={`flex-center fixed bottom-4 right-0 rounded-l-full bg-gray-800 pl-4 transition-all duration-300 ease-in-out ${isHover ? 'w-72' : 'w-24'
        } z-10 h-20`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ transition: '0.5s' }}
    >
      <button
        className="flex-center absolute h-full cursor-pointer text-4xl text-white"
        onClick={handleClick}
      >
        <ImPlus />
        {isHover && (
          <span className={`${myFont.className} py-2 text-3xl tracking-wide`}>
            CREATE NEW ASSISTANCE
          </span>
        )}
      </button>
    </div>
  )
}

export default NewAssistanceButton
