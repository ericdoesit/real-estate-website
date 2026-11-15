'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { agent, site } from '@/config/agent'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = 'h-16 w-16', showText = true }: LogoProps) {
  const pathname = usePathname()

  function handleClick(e: React.MouseEvent) {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Link href="/" onClick={handleClick} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div className={className + ' flex-shrink-0 rounded overflow-hidden'}>
        <img
          src={site.logo}
          alt={agent.name}
          className="w-full h-full"
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-sans text-base font-semibold uppercase tracking-luxury text-charcoal">{agent.name}, {agent.title}</span>
        </div>
      )}
    </Link>
  )
}
