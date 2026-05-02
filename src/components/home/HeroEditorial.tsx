'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './HeroButton.module.css'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ArrowRight } from '@/components/ui/ArrowRight'

const easeSmooth = [0.33, 0.66, 0.66, 1]

export function HeroEditorial() {
  return (
    <section className="relative h-[calc(100vh-80px)] overflow-hidden bg-cream">
      {/* Full-height hero image - positioned absolutely */}
      <motion.div
        className="absolute right-0 top-20 bottom-20 w-full lg:w-[1260px] rounded-2xl overflow-hidden"
        style={{ transform: 'translateX(-80px)' }}
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
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 640px"
        />
      </motion.div>

      {/* Content Grid - centered with relative positioning */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: easeSmooth, delay: 0 }}
              >
                <Eyebrow>Los Angeles Real Estate</Eyebrow>
              </motion.div>

              {/* Headline */}
              <div className="space-y-2">
                <motion.h1
                  className="font-serif text-7xl lg:text-8xl font-semibold text-charcoal"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: easeSmooth, delay: 0.1 }}
                  >
                    Curated homes
                  </motion.span>
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: easeSmooth, delay: 0.22 }}
                  >
                    for your story.
                  </motion.span>
                </motion.h1>
              </div>

              {/* Description */}
              <motion.p
                className="font-sans text-lg text-charcoal max-w-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: easeSmooth, delay: 0.38 }}
              >
                I help families and investors find, buy, and sell properties across Los Angeles with honesty, expertise, and genuine care.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                className="pt-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: easeSmooth, delay: 0.46 }}
              >
                <Link href="/contact">
                  <button className={`${styles.button} inline-flex items-center gap-2 group`}>
                    Start Conversation
                    <ArrowRight className={`w-5 h-5 ${styles.arrow}`} />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
