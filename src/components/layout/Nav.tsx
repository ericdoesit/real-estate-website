'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { Logo } from './Logo'
import styles from './Nav.module.css'
import { navLinks } from '@/config/navLinks'

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.maxWidth}>
          {/* Logo */}
          <Logo className="h-[55px] w-[55px]" />

          {/* Desktop Nav */}
          <div className={styles.desktopNav}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.navLink}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className={styles.mobileMenuContainer}>
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
