import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-charcoal/10 bg-cream">
      <div className="w-full px-6 lg:px-12 py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                <img
                  src="/logo.svg"
                  alt="Eric Zunkley"
                  className="w-full h-full"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-base font-semibold text-charcoal">Eric Zunkley, Realtor</span>
              </div>
            </Link>

            {/* Quick Links */}
            <nav className="flex gap-6 text-base sm:ml-auto">
              <Link href="/about" className={styles.footerLink}>
                About
              </Link>
              <Link href="/neighborhoods" className={styles.footerLink}>
                Neighborhoods
              </Link>
              <Link href="/properties" className={styles.footerLink}>
                Properties
              </Link>
              <Link href="/blog" className={styles.footerLink}>
                Blog
              </Link>
            </nav>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-charcoal/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted font-sans">
            <p>&copy; {currentYear} Eric Zunkley. All rights reserved.</p>
            <nav className="flex gap-6 text-base">
              <Link href="/privacy" className={styles.footerLink}>
                Privacy
              </Link>
              <Link href="/terms" className={styles.footerLink}>
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
