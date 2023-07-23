'use client'

import React from 'react'
import { Session } from 'next-auth'
import Image from 'next/image'
import { signIn, signOut } from 'next-auth/react'
import userPlaceholderPic from '@/assets/user-place-holder.png'

interface LogButtonProps {
  session: Session | null
}
const LogButton = ({ session }: LogButtonProps) => {
  const user = session?.user

  return (
    <div className="flex items-center space-x-1">
      {user ? (
        <>
          <Image
            src={user?.image || userPlaceholderPic}
            alt="Profile picture"
            width={40}
            height={40}
            className="w-10 rounded-full mr-3"
          />
          <button
            className="border-primary rounded-md p-3 transition-transform hover:scale-110 bg-gray-50"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Sign Out
          </button>
        </>
      ) : (

        <button className="border-primary rounded-md p-3 transition-transform hover:scale-110 bg-gray-50" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  )
}

export default LogButton
