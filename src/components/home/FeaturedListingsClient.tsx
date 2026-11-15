'use client'

import Link from 'next/link'
import Image from 'next/image'
import { m } from '@/lib/motion'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { ButtonLink } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { urlFor, sanityLoader } from '@/lib/sanity/image'
import { easeSmooth } from '@/lib/ease'

interface SanityImage {
  _key?: string
  asset?: { _ref: string }
  alt?: string
}

interface Property {
  _id: string
  address: string
  slug: { current: string }
  price?: number
  beds: number
  baths: number
  sqft: number
  status?: string
  heroImage?: SanityImage
  openHouseLabel?: string
}

export function FeaturedListingsClient({ properties }: { properties: Property[] }) {
  return (
    <section className="section-py bg-cream">
      <div className="w-full px-6 lg:px-12">
        <div className="container-site">
        {/* Header */}
        <SectionHeader eyebrow="Recent Activity" heading="Featured Properties" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property, index) => (
            <m.div
              key={property._id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeSmooth, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              {/* Image */}
              <Link href={`/properties/${property.slug?.current || 'placeholder'}`} className="block relative h-64 rounded-brand overflow-hidden mb-4">
                {property.heroImage ? (
                  <Image
                    loader={sanityLoader}
                    src={urlFor(property.heroImage).url()}
                    alt={property.heroImage.alt || property.address}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-sand flex items-center justify-center">
                    <p className="text-charcoal">No image available</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-600 ease-out pointer-events-none" />
                {property.status && property.status !== 'off-market' && (() => {
                  const statusConfig: Record<string, { label: string; className: string }> = {
                    active:  { label: 'Active',  className: 'bg-[#27ad36] text-white' },
                    pending: { label: 'Pending', className: 'bg-[#c5aa35] text-white' },
                    sold:    { label: 'Sold',    className: 'bg-[#af2525] text-white' },
                  }
                  const cfg = statusConfig[property.status]
                  return cfg ? (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold z-10 ${cfg.className}`}>
                      {cfg.label}
                    </div>
                  ) : null
                })()}
              </Link>

              {/* Info */}
              <div className="space-y-3">
                <h3 className="font-serif text-3xl font-semibold text-charcoal group-hover:text-charcoal transition-colors">
                  {property.address}
                </h3>

                <div className="flex gap-6 text-sm text-charcoal">
                  {property.price && <span>${property.price.toLocaleString()}</span>}
                  <span>{property.beds} bed</span>
                  <span>{property.baths} bath</span>
                  <span>{property.sqft?.toLocaleString()} sqft</span>
                </div>

                {property.openHouseLabel && (
                  <p className="text-sm font-semibold text-charcoal">
                    <span className="uppercase tracking-luxury">Open House</span> · {property.openHouseLabel}
                  </p>
                )}

                <ArrowLink href={`/properties/${property.slug?.current || 'placeholder'}`} className="text-sm font-semibold whitespace-nowrap">
                  View details
                </ArrowLink>
              </div>
            </m.div>
          ))}
        </div>

        {/* CTA */}
        <m.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeSmooth }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <ButtonLink href="/properties" variant="default" withArrow>
            See All Properties
          </ButtonLink>
        </m.div>
        </div>
      </div>
    </section>
  )
}
