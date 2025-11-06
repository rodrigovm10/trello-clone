import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'
import { Header } from '@/shared/components/header'
import { Footer } from '@/shared/components/footer'
import { Toaster } from 'sonner'

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'Trello Clone',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${ubuntu.variable} antialiased`}>
        <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
