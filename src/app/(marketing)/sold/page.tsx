import Link from 'next/link'
import Image from 'next/image'
import { serverClient } from '@/lib/sanity/client'
import { ALL_PROPERTIES_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTABanner } from '@/components/home/CTABanner'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'
import { agent } from '@/config/agent'

interface SanityImage {
  _key?: string
  asset?: { _ref: string }
  alt?: string
}

interface Property {
  _id: string
  address: string
  slug: { current: string }
  status: string
  beds: number
  baths: number
  sqft: number
  heroImage?: SanityImage
}

export const metadata = {
  title: 'Properties - Listings',
  description: 'Browse featured properties and listings in Los Angeles. Current and sold listings with full details.',
}

export default async function PropertiesPage() {
  let properties: Property[] = []

  try {
    properties = await serverClient.fetch(ALL_PROPERTIES_QUERY)
  } catch (error) {
    console.error('Failed to fetch properties:', error)
  }

  // Fallback placeholder
  if (properties.length === 0) {
    properties = [
      {
        _id: '1',
        address: 'Add properties to Sanity Studio to see them here',
        slug: { current: 'placeholder' },
        status: 'sold',
        beds: 3,
        baths: 2,
        sqft: 2100,
      },
      {
        _id: '2',
        address: 'Go to /studio to create properties',
        slug: { current: 'placeholder' },
        status: 'sold',
        beds: 2,
        baths: 2,
        sqft: 1600,
      },
    ]
  }

  const activeListings = properties.filter((p) => p.status === 'active')
  const soldListings = properties.filter((p) => p.status === 'sold')

  const PropertyCard = ({ property, priority }: { property: Property; priority?: boolean }) => (
    <Link
      href={`/sold/${property.slug?.current || 'placeholder'}`}
      className="group"
    >
      <div className="space-y-4">
        {/* Image */}
        <div className="relative h-64 rounded-brand overflow-hidden group">
          {property.heroImage ? (
            <Image
              src={urlFor(property.heroImage).url()}
              alt={property.heroImage.alt || property.address}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-dark-green/10 flex items-center justify-center">
              <p className="text-charcoal">No image available</p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h3 className="font-serif text-3xl font-semibold text-charcoal group-hover:transition-colors line-clamp-2">
            {property.address}
          </h3>

          <div className="flex gap-4 text-sm text-charcoal">
            <span>{property.beds} bed</span>
            <span>{property.baths} bath</span>
            <span>{property.sqft?.toLocaleString()} sqft</span>
          </div>

        </div>
      </div>
    </Link>
  )

  return (
    <div className="">
      {/* Hero */}
      <section className="pt-10 pb-8">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <StaggerGroup className="space-y-8">
              <StaggerItem>
                <div className="space-y-4">
                  <Eyebrow>Past Transactions</Eyebrow>
                  <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
                    Recently Sold.
                  </h1>
                </div>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-charcoal leading-relaxed">
                  A selection of homes I've helped clients buy and sell across Los Angeles —
                  representing both buyers and sellers over {agent.yearsExperience} years in the market.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Active Listings */}
      {activeListings.length > 0 && (
        <section className="py-10">
          <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <StaggerGroup>
              <StaggerItem className="mb-12">
                <p className="text-sm font-semibold tracking-luxury uppercase mb-2">
                  Current
                </p>
                <h2 className="font-serif text-5xl font-semibold text-charcoal">
                  Active Listings
                </h2>
              </StaggerItem>

              <StaggerItem>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeListings.map((property, i) => (
                    <PropertyCard key={property._id} property={property} priority={i === 0} />
                  ))}
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
          </div>
        </section>
      )}

      {/* Sold Properties */}
      {soldListings.length > 0 && (
        <section className="py-10">
          <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {soldListings.map((property, i) => (
                <StaggerItem key={property._id}>
                  <PropertyCard property={property} priority={activeListings.length === 0 && i === 0} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
          </div>
        </section>
      )}

      <CTABanner
        heading="Looking for something specific?"
        description="Contact me for additional properties, market analysis, or to discuss your real estate goals."
      />
    </div>
  )
}
