'use client'

import Image from 'next/image'
import { m } from '@/lib/motion'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ButtonLink } from '@/components/ui/button'
import { easeSmooth } from '@/lib/ease'
import { agent } from '@/config/agent'

export function AboutSnippet() {
  return (
    <section className="section-py bg-cream">
      <div className="w-full px-6 lg:px-12">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Text */}
          <m.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeSmooth }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="space-y-3">
              <Eyebrow>About {agent.name}</Eyebrow>
              <h2 className="font-serif text-4xl lg:text-6xl font-semibold capitalize text-charcoal">
                Real estate rooted in relationships
              </h2>
            </div>

            <p className="font-sans text-lg text-charcoal leading-relaxed">
              I'm a California real estate agent who helps buyers, sellers, and investors navigate LA with honesty, market expertise, and genuine care — whether that's Eagle Rock, Venice, Mid City, or West Adams. Most of my business comes through referrals and repeat clients, which reflects the kind of relationships I build in every transaction.
            </p>

            <ButtonLink href="/about" variant="default" withArrow>
              Learn more about my approach
            </ButtonLink>
          </m.div>

          {/* Headshot */}
          <m.div
            className="relative aspect-square rounded-brand overflow-hidden w-full ml-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeSmooth }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <Image
              src={agent.headshot}
              alt={`${agent.name} - Real Estate Agent`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </m.div>
          </div>
        </div>
      </div>
    </section>
  )
}
