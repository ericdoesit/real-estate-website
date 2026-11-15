'use client'

import { m } from '@/lib/motion'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ContactForm } from '@/components/contact/ContactForm'
import { easeSmooth } from '@/lib/ease'

export function CTABanner({
  heading = 'Get in touch',
  description = "Whether you're buying, selling, or investing in LA real estate, I'm here to help. Reach out anytime.",
  eyebrow = 'Contact',
  submitLabel = 'Send Message',
  messagePlaceholder = 'Tell me about your real estate needs...',
}: {
  heading?: string
  description?: string
  eyebrow?: string
  submitLabel?: string
  messagePlaceholder?: string
} = {}) {
  return (
    <section className="section-py bg-charcoal">
      <div className="w-full px-6 lg:px-12">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Copy */}
            <m.div
              className="flex flex-col justify-center space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeSmooth }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Eyebrow color="white">{eyebrow}</Eyebrow>
              <h2 className="font-serif text-4xl lg:text-6xl font-semibold text-white capitalize">
                {heading}
              </h2>
              <p className="font-sans text-lg text-white/70 leading-relaxed">
                {description}
              </p>
            </m.div>

            {/* Right: Form */}
            <m.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeSmooth }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <ContactForm dark submitLabel={submitLabel} messagePlaceholder={messagePlaceholder} />
            </m.div>

          </div>
        </div>
      </div>
    </section>
  )
}
