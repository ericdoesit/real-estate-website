'use client'

import { FormEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

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
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSuccess(true)
      e.currentTarget.reset()
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError('Something went wrong. Please try again or call directly.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Thanks for reaching out! I'll be in touch soon.
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(323) 555-0000"
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your real estate goals..."
          rows={6}
          required
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="font-semibold w-full"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>

      <p className="text-sm text-charcoal text-center">
        Or call me directly at{' '}
        <a href="tel:+13234879865" className="font-semibold hover:transition-colors">
          (323) 487-9865
        </a>
      </p>
    </form>
  )
}
