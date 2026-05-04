import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { site } from '@/config/agent'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${manrope.variable} h-full scroll-smooth antialiased overflow-y-scroll`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-charcoal font-sans">
        {children}
      </body>
    </html>
  )
}
