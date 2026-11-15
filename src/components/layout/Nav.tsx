'use client'

import React from 'react'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { Logo } from './Logo'
import { navLinks } from '@/config/navLinks'
import styles from './Nav.module.css'

export function Nav() {

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.maxWidth}>
          <Logo className="h-[55px] w-[55px]" />

          <div className={styles.desktopNav}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} hover-underline`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.mobileMenuContainer}>
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
