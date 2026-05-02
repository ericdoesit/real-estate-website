'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './HeroButton.module.css'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ArrowRight } from '@/components/ui/ArrowRight'

const easeSmooth: [number, number, number, number] = [0.33, 0.66, 0.66, 1]

export function HeroEditorial() {
  return (
    <section className="bg-cream overflow-hidden lg:relative lg:h-[calc(100vh-80px)]">
      {/* Desktop: absolutely positioned image on the right */}
      <motion.div
        className="hidden lg:block absolute right-0 top-20 bottom-20 w-[1260px] rounded-2xl overflow-hidden"
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
          sizes="1260px"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full lg:h-full lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] w-full mx-auto">

            {/* Mobile: image above eyebrow and headline */}
            <motion.div
              className="lg:hidden relative w-full aspect-[4/3] rounded-xl overflow-hidden mt-6 mb-8"
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
                sizes="100vw"
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pb-16 lg:pb-0">
              {/* Text */}
              <div className="lg:rounded-xl lg:p-10 lg:bg-cream/75 lg:backdrop-blur-md">
              <div className="flex flex-col justify-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: easeSmooth, delay: 0 }}
                >
                  <Eyebrow>Los Angeles Real Estate</Eyebrow>
                </motion.div>

                <div className="space-y-2">
                  <motion.h1
                    className="font-serif text-6xl lg:text-8xl font-semibold text-charcoal"
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

                <motion.p
                  className="font-sans text-lg text-charcoal max-w-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: easeSmooth, delay: 0.38 }}
                >
                  I help families and investors find, buy, and sell properties across Los Angeles with honesty, expertise, and genuine care.
                </motion.p>

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
      </div>
    </section>
  )
}
