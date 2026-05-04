import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { agent, site } from '@/config/agent'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-cream">
      <div className="w-full px-6 lg:px-12 py-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">

            {/* Brand */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="h-[55px] w-[55px] flex-shrink-0 rounded overflow-hidden">
                  <img src={site.logo} alt={agent.name} className="w-full h-full" />
                </div>
                <span className="font-sans text-base font-bold uppercase tracking-luxury text-charcoal">{agent.name}, {agent.title}</span>
              </Link>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-charcoal/60">{agent.dreLicense}</span>
                <span className="text-sm text-charcoal/60">{agent.brokerage} {agent.brokerageDre}</span>
              </div>
              {/* Social icons */}
              <div className="flex items-center gap-4 mt-1">
                <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer" className="text-charcoal/50 hover:text-charcoal transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href={agent.social.facebook} target="_blank" rel="noopener noreferrer" className="text-charcoal/50 hover:text-charcoal transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor" aria-label="Facebook">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <Eyebrow>Contact</Eyebrow>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-luxury text-charcoal/50 mb-0.5">Email</p>
                  <a href={`mailto:${agent.email}`} className={`${styles.footerLink} text-sm`}>
                    {agent.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-luxury text-charcoal/50 mb-0.5">Phone</p>
                  <a href={`tel:${agent.phone}`} className={`${styles.footerLink} text-sm`}>
                    {agent.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-luxury text-charcoal/50 mb-0.5">Location</p>
                  <p className="text-sm text-charcoal">{agent.location}</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <Eyebrow>Quick Links</Eyebrow>
              <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                <Link href="/about" className={styles.footerLink}>About</Link>
                <Link href="/neighborhoods" className={styles.footerLink}>Neighborhoods</Link>
                <Link href="/sold" className={styles.footerLink}>Sold</Link>
                <Link href="/blog" className={styles.footerLink}>Blog</Link>
                <Link href="/contact" className={styles.footerLink}>Contact</Link>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-12 text-sm text-charcoal/50 font-sans leading-relaxed text-center">
            <p>&copy; {currentYear} {agent.name}. All content on this website is the property of {agent.name} or its respective copyright owners and partners, and is protected by US and international copyright laws.</p>
          </div>

        </div>
      </div>
    </footer>
  )
}
