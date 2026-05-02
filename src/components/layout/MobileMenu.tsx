'use client'

import React from 'react'
import Link from 'next/link'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'

export function MobileMenu() {
  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/neighborhoods', label: 'Neighborhoods' },
    { href: '/properties', label: 'Properties' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <Sheet>
      <SheetTrigger className="md:hidden text-charcoal hover:transition-colors">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="mt-8 flex flex-col gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-serif text-charcoal hover:transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
