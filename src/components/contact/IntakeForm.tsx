'use client'

import { FormEvent, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { agent } from '@/config/agent'

type Intent = 'buying' | 'selling' | 'both' | ''

export function IntakeForm() {
  const [intent, setIntent] = useState<Intent>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const labelClass = 'block text-xs font-semibold tracking-luxury uppercase mb-2 text-charcoal/70'
  const inputClass = 'w-full px-4 py-3 rounded-md focus:outline-none transition-colors bg-white border border-charcoal/20 text-charcoal placeholder:text-charcoal/40 focus:border-charcoal/40'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      intent: formData.get('intent'),
      sellingAddress: formData.get('sellingAddress'),
      buyingAreas: formData.get('buyingAreas'),
      priceRange: formData.get('priceRange'),
      timeframe: formData.get('timeframe'),
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
      setIntent('')
      setTimeout(() => setIsSuccess(false), 6000)
    } catch {
      setError('Something went wrong. Please try again or call directly.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} />

      {/* Intent */}
      <div>
        <label className={labelClass}>I'm looking to <span>*</span></label>
        <div className="flex flex-wrap gap-3 mt-1">
          {(['buying', 'selling', 'both'] as const).map((opt) => (
            <label key={opt} className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-md border cursor-pointer transition-colors text-sm font-medium',
              intent === opt
                ? 'border-charcoal bg-charcoal text-white'
                : 'border-charcoal/20 bg-white text-charcoal hover:border-charcoal/40'
            )}>
              <input
                type="radio"
                name="intent"
                value={opt}
                required
                checked={intent === opt}
                onChange={() => setIntent(opt)}
                className="sr-only"
              />
              {opt === 'buying' ? 'Buy' : opt === 'selling' ? 'Sell' : 'Buy & Sell'}
            </label>
          ))}
        </div>
      </div>

      {/* Conditional: selling address */}
      {(intent === 'selling' || intent === 'both') && (
        <div>
          <label htmlFor="if-selling-address" className={labelClass}>Property address</label>
          <input
            id="if-selling-address"
            type="text"
            name="sellingAddress"
            placeholder="123 Main St, Los Angeles, CA"
            disabled={isLoading}
            className={inputClass}
          />
        </div>
      )}

      {/* Conditional: buying areas */}
      {(intent === 'buying' || intent === 'both') && (
        <div>
          <label htmlFor="if-buying-areas" className={labelClass}>Areas of interest</label>
          <input
            id="if-buying-areas"
            type="text"
            name="buyingAreas"
            placeholder="e.g. Silver Lake, Los Feliz, Echo Park"
            disabled={isLoading}
            className={inputClass}
          />
        </div>
      )}

      {/* Price range + Timeframe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="if-price" className={labelClass}>Price range</label>
          <select id="if-price" name="priceRange" disabled={isLoading} className={cn(inputClass, 'cursor-pointer')}>
            <option value="">Select a range</option>
            <option>Under $600K</option>
            <option>$600K – $900K</option>
            <option>$900K – $1.2M</option>
            <option>$1.2M – $1.8M</option>
            <option>$1.8M – $2.5M</option>
            <option>$2.5M+</option>
          </select>
        </div>

        <div>
          <label htmlFor="if-timeframe" className={labelClass}>Timeframe</label>
          <select id="if-timeframe" name="timeframe" disabled={isLoading} className={cn(inputClass, 'cursor-pointer')}>
            <option value="">Select a timeframe</option>
            <option>As soon as possible</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
            <option>Just exploring</option>
          </select>
        </div>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="if-name" className={labelClass}>Name <span>*</span></label>
          <input id="if-name" type="text" name="name" placeholder="John Smith" required disabled={isLoading} className={inputClass} />
        </div>

        <div>
          <label htmlFor="if-email" className={labelClass}>Email <span>*</span></label>
          <input id="if-email" type="email" name="email" placeholder="john@example.com" required disabled={isLoading} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="if-phone" className={labelClass}>Phone</label>
        <input id="if-phone" type="tel" name="phone" placeholder="(323) 555-0000" disabled={isLoading} className={inputClass} />
      </div>

      <div>
        <label htmlFor="if-message" className={labelClass}>Anything else I should know?</label>
        <textarea
          id="if-message"
          name="message"
          placeholder="Tell me more about what you're looking for..."
          rows={4}
          disabled={isLoading}
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {isSuccess && (
        <p className="text-sm text-charcoal">
          Message sent! I'll be in touch within 24 hours.
        </p>
      )}
      {error && <p className="text-sm text-charcoal/70">{error}</p>}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button type="submit" disabled={isLoading} className="mt-1">
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
        <p className="text-sm text-charcoal">
          Or call me at{' '}
          <a href={`tel:${agent.phone}`} className="font-semibold">
            {agent.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  )
}
