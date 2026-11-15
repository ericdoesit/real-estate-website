import Link from 'next/link'
import { serverClient } from '@/lib/sanity/client'
import { NEIGHBORHOODS_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { getNeighborhoodPhoto } from '@/lib/neighborhoods'
import { SanityImage } from '@/components/ui/SanityImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTABanner } from '@/components/home/CTABanner'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'


interface Neighborhood {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  heroImage?: { asset?: { _ref: string }; alt?: string }
}

export const metadata = {
  title: 'LA Neighborhoods - Market Guides',
  description:
    'Explore Los Angeles neighborhoods with market data, lifestyle insights, and real estate investment information.',
}

export default async function NeighborhoodsPage() {
  let neighborhoods: Neighborhood[] = []

  try {
    neighborhoods = await serverClient.fetch(NEIGHBORHOODS_QUERY)
  } catch (error) {
    console.error('Failed to fetch neighborhoods:', error)
  }

  if (neighborhoods.length === 0) {
    neighborhoods = [
      {
        _id: '1',
        name: 'Mid City',
        slug: { current: 'mid-city' },
        tagline: "LA's vibrant heart",
      },
      {
        _id: '2',
        name: 'Eagle Rock',
        slug: { current: 'eagle-rock' },
        tagline: 'Character and charm',
      },
      {
        _id: '3',
        name: 'Highland Park',
        slug: { current: 'highland-park' },
        tagline: 'Emerging coolness',
      },
      {
        _id: '4',
        name: 'West Adams',
        slug: { current: 'west-adams' },
        tagline: 'Historic elegance',
      },
      {
        _id: '5',
        name: 'Venice',
        slug: { current: 'venice' },
        tagline: 'Beachside culture',
      },
      {
        _id: '6',
        name: 'Silver Lake',
        slug: { current: 'silver-lake' },
        tagline: 'Artistic haven',
      },
    ]
  }

  return (
    <div className="">
      <section className="pt-10 pb-8">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            <StaggerGroup className="space-y-8">
              <StaggerItem className="space-y-3">
                <Eyebrow>Neighborhoods</Eyebrow>
                <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal capitalize">
                  Explore LA neighborhoods
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="font-sans text-lg text-charcoal leading-relaxed">
                  Each neighborhood has its own character and market dynamics. Explore detailed guides
                  with market data, lifestyle insights, and what makes each area special.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {neighborhoods.map((neighborhood, i) => {
                const imgSrc = neighborhood.heroImage
                  ? urlFor(neighborhood.heroImage).url()
                  : `/hood-photos/${getNeighborhoodPhoto(neighborhood._id)}`

                return (
                  <StaggerItem key={neighborhood._id}>
                    <Link
                      href={`/local-guide/${neighborhood.slug?.current || neighborhood.name.toLowerCase().replace(' ', '-')}`}
                      className="group block"
                    >
                      <div className="relative h-64 bg-sand rounded-brand overflow-hidden mb-4 hover:shadow-lg transition-shadow group">
                        <SanityImage
                          src={imgSrc}
                          alt={neighborhood.heroImage?.alt || neighborhood.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={i === 0}
                          className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-600 ease-out pointer-events-none" />
                      </div>

                      <h3 className="font-serif text-3xl font-semibold text-charcoal group-hover:transition-colors">
                        {neighborhood.name}
                      </h3>
                      <p className="text-charcoal text-sm mt-2">{neighborhood.tagline}</p>
                    </Link>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Curious about an area?"
        description="Contact me and let's chat about your needs — whether you're looking to buy, sell, or just explore what a neighborhood has to offer."
      />
    </div>
  )
}
