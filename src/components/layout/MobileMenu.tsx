'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from '@/lib/motion'
import { mobileNavLinks } from '@/config/navLinks'
import { easeSmooth } from '@/lib/ease'
import styles from './MobileMenu.module.css'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
      >
        <span className={`block h-[1.5px] w-6 bg-charcoal origin-center transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
        <span className={`block h-[1.5px] w-6 bg-charcoal transition-all duration-200 ease-in-out ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`block h-[1.5px] w-6 bg-charcoal origin-center transition-all duration-300 ease-in-out ${isOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            className={styles.dropdown}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: easeSmooth }}
          >
            <nav className={styles.nav}>
              {mobileNavLinks.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: easeSmooth, delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`${styles.link} hover-underline`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
