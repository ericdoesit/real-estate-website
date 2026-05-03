'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ArrowRight } from '@/components/ui/ArrowRight'
import styles from './AboutSnippet.module.css'

const easeSmooth: [number, number, number, number] = [0.33, 0.66, 0.66, 1]

export function AboutSnippet() {
  return (
    <section className="py-10 bg-wheat">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: easeSmooth }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="space-y-3">
              <Eyebrow>About Eric</Eyebrow>
              <h2 className="font-serif text-5xl font-semibold text-charcoal">
                Real estate rooted in relationships.
              </h2>
            </div>

            <p className="font-sans text-lg text-charcoal" style={{ lineHeight: '1.6' }}>
              I'm a California real estate agent who helps buyers, sellers, and investors navigate LA with honesty, market expertise, and genuine care — whether that's Eagle Rock, Venice, Mid City, or West Adams. Most of my business comes through referrals and repeat clients, which reflects the kind of relationships I build in every transaction.
            </p>

            <div className="pt-4">
              <Link href="/about" className={`${styles.learnMoreLink} font-semibold text-charcoal whitespace-nowrap`}>
                Learn more about my approach
                <ArrowRight className={`w-5 h-5 ${styles.arrow}`} />
              </Link>
            </div>
          </motion.div>

          {/* Image placeholder */}
          <motion.div
            className="relative h-96 lg:h-[450px] bg-dark-green/10 rounded-2xl flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: easeSmooth }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="text-center">
              <p className="text-charcoal">Headshot + bio coming</p>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
