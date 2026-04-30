'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MobileMenu } from './MobileMenu'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/neighborhoods', label: 'Neighborhoods' },
    { href: '/properties', label: 'Properties' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <nav
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 font-sans',
        isScrolled
          ? 'bg-wheat border-b border-charcoal/10 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo className="h-10 w-10" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-charcoal hover:text-crimson transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:block">
              <Button variant="default" size="sm">
                Consult
              </Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
