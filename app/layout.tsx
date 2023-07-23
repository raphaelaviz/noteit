import Header from './components/Header'
import './globals.css'
import SessionProvider  from './components/SessionProvider'
import localFont from 'next/font/local'

export const myFont = localFont({ src: '../public/american_captain.ttf' })





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
