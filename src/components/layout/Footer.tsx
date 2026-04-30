import React from 'react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-charcoal/10 bg-wheat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.svg"
                alt="Eric Zunkley"
                className="w-8 h-8"
              />
              <span className="font-serif text-lg font-semibold text-charcoal">
                Eric Zunkley
              </span>
            </div>
            <p className="text-sm text-muted">
              Eric Zunkley<br />
              CA DRE #01938067<br />
              eXp Realty of California Inc.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-charcoal mb-4">
              Navigate
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted hover:text-crimson transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods" className="text-muted hover:text-crimson transition-colors">
                  Neighborhoods
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-muted hover:text-crimson transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted hover:text-crimson transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-charcoal mb-4">
              Contact
            </h3>
            <address className="not-italic text-sm space-y-2">
              <p>
                <a
                  href="tel:+13234879865"
                  className="text-muted hover:text-crimson transition-colors"
                >
                  (323) 487-9865
                </a>
              </p>
              <p>
                <a
                  href="mailto:ezunkleysellsit@gmail.com"
                  className="text-muted hover:text-crimson transition-colors"
                >
                  ezunkleysellsit@gmail.com
                </a>
              </p>
              <p className="text-muted">Los Angeles, CA 90019</p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://instagram.com/ericzunkleyrealestate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-crimson transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com/ericzunkleyrealtor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-crimson transition-colors"
                >
                  Facebook
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>&copy; {currentYear} Eric Zunkley. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link href="/privacy" className="hover:text-crimson transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-crimson transition-colors">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
