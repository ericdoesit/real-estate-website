'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const easeSmooth: [number, number, number, number] = [0.33, 0.66, 0.66, 1]

export function CTABanner() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormState({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-charcoal">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: easeSmooth }}
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Badge */}
            <div className="inline-flex w-fit">
              <div className="px-3 py-1 bg-charcoal/50 border border-white/20 rounded-full">
                <p className="text-xs font-semibold tracking-luxury text-white/80 uppercase">
                  Contact
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h2 className="font-serif text-5xl font-semibold text-white leading-tight">
                Get in touch.
              </h2>
              <p className="font-sans text-lg text-white/70">
                Whether you're buying, selling, or investing in LA real estate, I'm here to help. Reach out anytime.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 pt-4">
              {/* Email */}
              <div>
                <p className="text-xs font-semibold tracking-luxury text-white/60 uppercase mb-1">
                  Email
                </p>
                <a
                  href="mailto:ezunkleysellsit@gmail.com"
                  className="text-white hover:text-goldenrod transition-colors"
                >
                  ezunkleysellsit@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs font-semibold tracking-luxury text-white/60 uppercase mb-1">
                  Phone
                </p>
                <a
                  href="tel:+13234879865"
                  className="text-white hover:text-goldenrod transition-colors"
                >
                  (323) 487-9865
                </a>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs font-semibold tracking-luxury text-white/60 uppercase mb-1">
                  Location
                </p>
                <p className="text-white">Los Angeles, CA</p>
              </div>

              {/* Social */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex gap-5">
                  <a
                    href="https://instagram.com/ericzunkleyrealestate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#efede8" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/ericzunkleyrealtor"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#efede8" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: easeSmooth }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold tracking-luxury text-white/70 uppercase mb-2">
                  Name <span className="text-goldenrod">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:border-goldenrod/50 focus:ring-1 focus:ring-goldenrod/30 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold tracking-luxury text-white/70 uppercase mb-2">
                  Email <span className="text-goldenrod">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:border-goldenrod/50 focus:ring-1 focus:ring-goldenrod/30 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold tracking-luxury text-white/70 uppercase mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="(323) 123-4567"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:border-goldenrod/50 focus:ring-1 focus:ring-goldenrod/30 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold tracking-luxury text-white/70 uppercase mb-2">
                  Message <span className="text-goldenrod">*</span>
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your real estate needs..."
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:border-goldenrod/50 focus:ring-1 focus:ring-goldenrod/30 transition-colors resize-none"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <p className="text-goldenrod text-sm">Message sent! I'll be in touch soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-sm">Something went wrong. Please try again.</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-semibold py-3 mt-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
