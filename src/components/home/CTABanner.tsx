'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const easeSmooth = [0.33, 0.66, 0.66, 1]

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
                <p className="text-xs font-semibold tracking-luxury text-white/60 uppercase mb-3">
                  Follow
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/ericzunkleyrealestate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-goldenrod transition-colors text-sm"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/ericzunkleyrealtor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-goldenrod transition-colors text-sm"
                  >
                    Facebook
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
                className="w-full bg-goldenrod text-charcoal hover:bg-goldenrod/90 font-semibold py-3 mt-2"
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
