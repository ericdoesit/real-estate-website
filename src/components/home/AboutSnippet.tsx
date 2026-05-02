'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ArrowRight } from '@/components/ui/ArrowRight'
import styles from './AboutSnippet.module.css'

const easeSmooth: [number, number, number, number] = [0.33, 0.66, 0.66, 1]

export function AboutSnippet() {
  return (
    <section className="py-20 bg-wheat">
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

            <p className="font-sans text-lg text-charcoal leading-relaxed">
              I'm a California real estate agent committed to helping my clients achieve their goals through honesty, deep market knowledge, and genuine care. Most of my business comes through referrals and repeat clients—a reflection of the relationships I build with every transaction.
            </p>

            <p className="font-sans text-base text-charcoal">
              Whether you're buying your first home, selling a property, or investing in LA real estate, I bring creative problem-solving and a deep understanding of neighborhoods from Eagle Rock to Venice, Mid City to West Adams.
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
