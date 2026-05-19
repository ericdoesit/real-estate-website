'use client'

import { FormEvent, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { agent } from '@/config/agent'

interface ContactFormProps {
  dark?: boolean
  submitLabel?: string
  messagePlaceholder?: string
}

export function ContactForm({
  dark = false,
  submitLabel = 'Send Message',
  messagePlaceholder = 'Tell me about your real estate goals...',
}: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const labelClass = cn(
    'block text-xs font-semibold tracking-luxury uppercase mb-2',
    dark ? 'text-white/70' : 'text-charcoal/70'
  )

  const inputClass = cn(
    'w-full px-4 py-3 rounded-md focus:outline-none transition-colors',
    dark
      ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-cream/50 focus:ring-1 focus:ring-cream/30'
      : 'bg-white border border-charcoal/20 text-charcoal placeholder:text-charcoal/40 focus:border-charcoal/40'
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      website: formData.get('website'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error()

      setIsSuccess(true)
      e.currentTarget.reset()
      setTimeout(() => setIsSuccess(false), 5000)
    } catch {
      setError('Something went wrong. Please try again or call directly.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from humans, bots fill it in */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} />

      <div>
        <label htmlFor="cf-name" className={labelClass}>Name <span>*</span></label>
        <input id="cf-name" type="text" name="name" placeholder="John Smith" required disabled={isLoading} className={inputClass} />
      </div>

      <div>
        <label htmlFor="cf-email" className={labelClass}>Email <span>*</span></label>
        <input id="cf-email" type="email" name="email" placeholder="john@example.com" required disabled={isLoading} className={inputClass} />
      </div>

      <div>
        <label htmlFor="cf-phone" className={labelClass}>Phone</label>
        <input id="cf-phone" type="tel" name="phone" placeholder="(323) 555-0000" disabled={isLoading} className={inputClass} />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>Message <span>*</span></label>
        <textarea
          id="cf-message"
          name="message"
          placeholder={messagePlaceholder}
          rows={5}
          required
          disabled={isLoading}
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {isSuccess && (
        <p className={cn('text-sm', dark ? 'text-cream' : 'text-charcoal')}>
          Message sent! I'll be in touch soon.
        </p>
      )}
      {error && <p className={cn('text-sm', dark ? 'text-white/70' : 'text-charcoal/70')}>{error}</p>}

      <Button
        type="submit"
        variant={dark ? 'inverse' : 'default'}
        disabled={isLoading}
        className="mt-2"
      >
        {isLoading ? 'Sending...' : submitLabel}
      </Button>

      {!dark && (
        <p className="text-sm text-charcoal text-center">
          Or call me directly at{' '}
          <a href={`tel:${agent.phone}`} className="font-semibold">
            {agent.phoneDisplay}
          </a>
        </p>
      )}
    </form>
  )
}
