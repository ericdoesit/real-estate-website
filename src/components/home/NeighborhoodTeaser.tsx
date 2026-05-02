'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ArrowRight } from '@/components/ui/ArrowRight'
import styles from './NeighborhoodTeaser.module.css'

interface Neighborhood {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  image: string
}

const NEIGHBORHOODS: Neighborhood[] = [
  { _id: '1', name: 'Mid City', slug: { current: 'mid-city' }, tagline: 'LA\'s vibrant heart', image: '' },
  { _id: '2', name: 'Eagle Rock', slug: { current: 'eagle-rock' }, tagline: 'Character and charm', image: '' },
  { _id: '3', name: 'Highland Park', slug: { current: 'highland-park' }, tagline: 'Emerging coolness', image: '' },
  { _id: '4', name: 'West Adams', slug: { current: 'west-adams' }, tagline: 'Historic elegance', image: '' },
  { _id: '5', name: 'Venice', slug: { current: 'venice' }, tagline: 'Beachside culture', image: '' },
  { _id: '6', name: 'Silver Lake', slug: { current: 'silver-lake' }, tagline: 'Artistic haven', image: '' },
]

const PHOTOS = [
  '13705488963_76a358d8ac_o.jpg',
  '15060426861_f6d33577bb_k.jpg',
  '15306603569_ba5fff0f60_k.jpg',
  '15873911522_636c4c213a_o.jpg',
  '5609986343_1b278c4750_o.jpg',
  '9595594302_64be79ce3a_o.jpg',
  'alexis-balinoff-2KIDkMzmO-k-unsplash.jpg',
  'hero-1.jpg',
  'hero-2.jpg',
  'hero-3.jpg',
  'ivan-karpov-7oLuzIZ3QIg-unsplash.jpg',
  'pexels-anthony-thomas-733236359-18409401.jpg',
  'pexels-blackmakaw-19964276.jpg',
  'pexels-davidmcelwee-11695725.jpg',
  'pexels-duggiefresch-4329924.jpg',
  'pexels-loquellano-17928132.jpg',
  'pexels-martinpechy-2763964.jpg',
  'pexels-martinpechy-2763967.jpg',
  'pexels-myatezhny39-30151761.jpg',
  'pexels-myatezhny39-30151773.jpg',
  'pexels-rdne-8782693.jpg',
  'pexels-rdne-8783581.jpg',
  'pexels-rdne-8783590.jpg',
  'pexels-rdne-8783844.jpg',
  'pexels-robertkso-34960816.jpg',
  'pexels-rockwell-branding-agency-85164430-9137653.jpg',
  'pexels-rpnickson-2709964.jpg',
  'pexels-sergei-a-1322276-2539437.jpg',
  'pexels-vincent-gerbouin-445991-2263669.jpg',
  'pexels-vlada-karpovich-4449625.jpg',
]

function getRandomPhoto(seed: string) {
  const hash = seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return PHOTOS[hash % PHOTOS.length]
}

export function NeighborhoodTeaser() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const neighborhoodsWithImages = useMemo(() => {
    return NEIGHBORHOODS.map(n => ({
      ...n,
      image: `/neighborhoods/${getRandomPhoto(n._id)}`
    }))
  }, [])

  const visibleNeighborhoods = neighborhoodsWithImages.slice(currentIndex, currentIndex + 3)
  const hasMore = currentIndex + 3 < neighborhoodsWithImages.length
  const canGoPrev = currentIndex > 0

  const handleNext = () => {
    if (hasMore) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const easeSmooth = [0.33, 0.66, 0.66, 1]

  return (
    <section className="py-20 bg-cream">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 space-y-4 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeSmooth }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Eyebrow>Know Your Neighborhood</Eyebrow>
          <h2 className="font-serif text-5xl font-semibold text-charcoal">
            Explore LA neighborhoods.
          </h2>
        </motion.div>

        {/* Navigation and Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleNeighborhoods.map((neighborhood, index) => (
              <motion.div
                key={neighborhood._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeSmooth, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <Link
                  href={`/neighborhoods/${neighborhood.slug?.current || neighborhood.name.toLowerCase().replace(' ', '-')}`}
                  className="group flex flex-col"
                >
                  <div className="relative h-72 bg-gradient-to-br from-dark-green/20 to-dark-green/20 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-charcoal group-hover:transition-colors">
                    {neighborhood.name}
                  </h3>
                  <p className="font-sans text-base text-charcoal mt-2">{neighborhood.tagline}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="p-3 rounded-full border border-dark-green disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dark-green/10 transition-colors"
              aria-label="Previous neighborhoods"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={!hasMore}
              className="p-3 rounded-full border border-dark-green disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dark-green/10 transition-colors flex items-center justify-center"
              aria-label="Next neighborhoods"
            >
              <ArrowRight className="w-5 h-5 text-dark-green" />
            </button>
          </div>
        </div>

        {/* Full guide CTA */}
        <motion.div
          className="mt-12 p-8 bg-dark-green/5 rounded-xl border border-dark-green/20 text-center space-y-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeSmooth }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h3 className="font-serif text-2xl font-semibold text-charcoal">
            Want deeper neighborhood insights?
          </h3>
          <p className="font-sans text-lg text-charcoal max-w-2xl mx-auto">
            Each neighborhood guide includes market data, school info, lifestyle highlights, and what makes each area special.
          </p>
          <Link
            href="/neighborhoods"
            className={`${styles.browseLink} font-semibold whitespace-nowrap`}
          >
            Browse all neighborhoods
            <ArrowRight className={`w-5 h-5 ${styles.arrow}`} />
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
