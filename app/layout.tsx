import Header from './components/Header'
import './globals.css'
import SessionProvider  from './components/SessionProvider'
import localFont from 'next/font/local'
import { Metadata } from 'next'

export const myFont = localFont({ src: '../public/american_captain.ttf' })


export const metadata: Metadata = {
  title: "NoteIT",
  description: "Your most important IT notes in one place.",
  alternates: {
    canonical: "https://noteit-nu.vercel.app/"
  }
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className='flex-col bg-gray-200'>
        <SessionProvider>
         <Header/>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
