'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import { m } from '@/lib/motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/button'
import { easeSmooth } from '@/lib/ease'
import { urlFor, sanityLoader } from '@/lib/sanity/image'
import { getNeighborhoodPhoto } from '@/lib/neighborhoods'

interface SanityNeighborhood {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  heroImage?: { asset?: { _ref: string }; alt?: string }
}

interface Props {
  neighborhoods?: SanityNeighborhood[]
}

export function NeighborhoodTeaser({ neighborhoods = [] }: Props) {
  const visibleNeighborhoods = neighborhoods.slice(0, 6)

  return (
    <section className="section-py bg-cream">
      <div className="w-full px-6 lg:px-12">
        <div className="container-site">
          {/* Header */}
          <SectionHeader
            eyebrow="Know Your Neighborhood"
            heading="Explore LA neighborhoods"
            body="Each guide highlights the character, culture, and details that make each neighborhood worth exploring."
            className="max-w-[1050px]"
          />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {visibleNeighborhoods.map((neighborhood, index) => (
              <m.div
                key={neighborhood._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeSmooth, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <Link
                  href={`/local-guide/${neighborhood.slug?.current || neighborhood.name.toLowerCase().replace(' ', '-')}`}
                  className="group flex flex-col"
                >
                  <div className="min-h-[5.5rem]">
                    <h3 className="font-serif text-2xl font-semibold text-charcoal">
                      {neighborhood.name}
                    </h3>
                    <p className="font-sans text-base text-charcoal mt-2 mb-4">{neighborhood.tagline}</p>
                  </div>

                  <div className="relative h-72 bg-sand rounded-brand overflow-hidden">
                    <NextImage
                      loader={sanityLoader}
                      src={
                        neighborhood.heroImage?.asset
                          ? urlFor(neighborhood.heroImage).url()
                          : `/hood-photos/${getNeighborhoodPhoto(neighborhood._id)}`
                      }
                      alt={neighborhood.heroImage?.alt || neighborhood.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-600 ease-out pointer-events-none" />
                  </div>
                </Link>
              </m.div>
            ))}
          </div>

          {/* Browse all */}
          <m.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeSmooth }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <ButtonLink href="/local-guide" variant="default" withArrow>
              Browse All Neighborhoods
            </ButtonLink>
          </m.div>
        </div>
      </div>
    </section>
  )
}
