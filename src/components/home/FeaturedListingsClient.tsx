'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@/components/ui/ArrowRight'
import { urlFor } from '@/lib/sanity/image'
import styles from './FeaturedListingsClient.module.css'

interface SanityImage {
  _key?: string
  asset?: { _ref: string }
  alt?: string
}

interface Property {
  _id: string
  address: string
  slug: { current: string }
  beds: number
  baths: number
  sqft: number
  heroImage?: SanityImage
}

const easeSmooth: [number, number, number, number] = [0.33, 0.66, 0.66, 1]

export function FeaturedListingsClient({ properties }: { properties: Property[] }) {
  return (
    <section className="py-10 bg-cream">
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
          <p className="text-sm font-semibold tracking-luxury uppercase">
            Featured Properties
          </p>
          <h2 className="font-serif text-5xl font-semibold text-charcoal">
            Curated listings. Available now.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property, index) => (
            <motion.div
              key={property._id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeSmooth, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              {/* Image */}
              <div className="relative h-64 rounded-xl overflow-hidden mb-4 group">
                {property.heroImage ? (
                  <Image
                    src={urlFor(property.heroImage).url()}
                    alt={property.heroImage.alt || property.address}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-green/10 flex items-center justify-center">
                    <p className="text-charcoal">No image available</p>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-goldenrod text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  Featured
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <h3 className="font-serif text-3xl font-semibold text-charcoal group-hover:text-coral transition-colors">
                  {property.address}
                </h3>

                <div className="flex gap-6 text-sm text-charcoal">
                  <span>{property.beds} bed</span>
                  <span>{property.baths} bath</span>
                  <span>{property.sqft?.toLocaleString()} sqft</span>
                </div>

                <Link href={`/properties/${property.slug?.current || 'placeholder'}`} className={`${styles.detailsLink} text-sm font-semibold whitespace-nowrap`}>
                  View details
                  <ArrowRight className={`w-5 h-5 ${styles.arrow}`} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeSmooth }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Link href="/properties">
            <Button className="font-semibold">
              See All Properties
            </Button>
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
