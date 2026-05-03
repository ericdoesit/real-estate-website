'use client'

import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = 'h-16 w-16', showText = true }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div className={className + ' flex-shrink-0 rounded overflow-hidden'}>
        <img
          src="/logo.svg"
          alt="Eric Zunkley"
          className="w-full h-full"
        />
      </div>
      {showText && (
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="font-sans text-base font-bold uppercase tracking-luxury text-charcoal">Eric Zunkley, Realtor</span>
        </div>
      )}
    </Link>
  )
}
