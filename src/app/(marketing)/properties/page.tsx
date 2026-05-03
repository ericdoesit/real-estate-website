import Link from 'next/link'
import Image from 'next/image'
import { serverClient } from '@/lib/sanity/client'
import { ALL_PROPERTIES_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

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

  const PropertyCard = ({ property }: { property: Property }) => (
    <Link
      href={`/properties/${property.slug?.current || 'placeholder'}`}
      className="group"
    >
      <div className="space-y-4">
        {/* Image */}
        <div className="relative h-64 rounded-xl overflow-hidden group">
          {property.heroImage ? (
            <Image
              src={urlFor(property.heroImage).url()}
              alt={property.heroImage.alt || property.address}
              fill
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

          {property.status === 'sold' && (
            <span className="text-xs font-semibold uppercase tracking-luxury">Sold</span>
          )}
        </div>
      </div>
    </Link>
  )

  return (
    <div className="">
      {/* Hero */}
      <section className="pt-10 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-luxury text-dark-green uppercase">
              Properties
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              Past transactions.
            </h1>
          </div>

          <p className="text-lg text-charcoal max-w-2xl" style={{ lineHeight: '1.6' }}>
            A look at some of the properties I've helped clients buy and sell across Los Angeles.
          </p>
        </div>
      </section>

      {/* Active Listings */}
      {activeListings.length > 0 && (
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-sm font-semibold tracking-luxury uppercase mb-2">
                Current
              </p>
              <h2 className="font-serif text-5xl font-semibold text-charcoal">
                Active Listings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeListings.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sold Properties */}
      {soldListings.length > 0 && (
        <section className="bg-cream py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-sm font-semibold tracking-luxury text-dark-green uppercase mb-2">
                Track Record
              </p>
              <h2 className="font-serif text-5xl font-semibold text-charcoal">
                Recently Sold
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {soldListings.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More Info */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-5xl font-semibold text-charcoal">
              Looking for something specific?
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Contact me for additional properties, market analysis, or to discuss your real estate goals.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
