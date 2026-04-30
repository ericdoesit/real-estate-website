import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Eric Zunkley - Real Estate | Los Angeles',
  description: 'Real estate in Los Angeles. Eric Zunkley specializes in buying and selling properties across LA.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-charcoal font-sans">
        {children}
      </body>
    </html>
  )
}
