'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ArrowRight } from '@/components/ui/ArrowRight'
import { easeSmooth } from '@/lib/ease'
import { agent } from '@/config/agent'

export function HeroEditorial() {
  return (
    <section className="bg-charcoal overflow-hidden py-8 lg:py-0 lg:relative lg:h-[calc(100vh-80px)]">
      {/* Desktop: viewport-relative image on the right */}
      <motion.div
        className="hidden lg:block absolute right-[2vw] top-[2vw] bottom-[2vw] w-[42vw] rounded-brand overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: easeSmooth, delay: 0.15 }}
      >
        <Image
          src="/hero-image.jpg"
          alt="Los Angeles luxury homes"
          fill
          className="object-cover"
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
      </motion.div>

      {/* Mobile: image above content */}
      <motion.div
        className="lg:hidden relative aspect-[4/3] rounded-brand overflow-hidden mb-6 mx-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: easeSmooth, delay: 0.15 }}
      >
        <Image
          src="/hero-image.jpg"
          alt="Los Angeles luxury homes"
          fill
          className="object-cover"
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
      </motion.div>

      {/* Content — absolutely positioned on desktop, stacked on mobile */}
      <div className="px-6 lg:px-0 lg:absolute lg:left-[13vw] lg:top-0 lg:bottom-0 lg:flex lg:flex-col lg:justify-center space-y-6 lg:w-[32vw] lg:backdrop-blur-md lg:bg-charcoal/5 lg:rounded-brand">
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeSmooth, delay: 0 }}
          >
            <Eyebrow color="white">Los Angeles</Eyebrow>
          </motion.div>
          <motion.h1
            className="font-serif text-4xl lg:text-7xl 2xl:text-8xl font-semibold text-white capitalize"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeSmooth, delay: 0.1 }}
          >
            The right home changes everything
          </motion.h1>
        </div>

        <motion.p
          className="font-sans text-lg text-white/70"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easeSmooth, delay: 0.28 }}
        >
          Helping Los Angeles buyers and sellers for {agent.yearsExperience} years make smart,
          informed decisions. No pressure, honest guidance.
        </motion.p>

        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easeSmooth, delay: 0.46 }}
        >
          <Link href="/contact">
            <Button
              variant="inverse"
              className="inline-flex items-center gap-3 px-8 py-3 text-base font-medium"
            >
              Start Conversation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
