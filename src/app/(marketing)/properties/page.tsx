import Link from 'next/link'
import { serverClient } from '@/lib/sanity/client'
import { ALL_PROPERTIES_QUERY } from '@/lib/sanity/queries'

interface Property {
  _id: string
  address: string
  slug: { current: string }
  status: string
  listPrice?: number
  soldPrice?: number
  beds: number
  baths: number
  sqft: number
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
        soldPrice: 2450000,
        beds: 3,
        baths: 2,
        sqft: 2100,
      },
      {
        _id: '2',
        address: 'Go to /studio to create properties',
        slug: { current: 'placeholder' },
        status: 'sold',
        soldPrice: 1850000,
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
        {/* Image placeholder */}
        <div className="relative h-64 bg-dark-green/10 rounded-xl overflow-hidden flex items-center justify-center">
          <p className="text-muted">Property image</p>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-crimson transition-colors line-clamp-2">
            {property.address}
          </h3>

          <div className="flex gap-4 text-sm text-muted">
            <span>{property.beds} bed</span>
            <span>{property.baths} bath</span>
            <span>{property.sqft?.toLocaleString()} sqft</span>
          </div>

          <p className="text-xl font-serif font-semibold text-dark-green">
            $
            {(property.status === 'sold' ? property.soldPrice : property.listPrice)?.toLocaleString()}
          </p>

          {property.status === 'sold' && (
            <span className="text-xs font-semibold text-crimson uppercase tracking-luxury">Sold</span>
          )}
        </div>
      </div>
    </Link>
  )

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-luxury text-dark-green uppercase">
              Properties
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              Featured listings & portfolio.
            </h1>
          </div>

          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Browse my current active listings and recent sold properties. Each listing represents successful transactions
            that have helped my clients achieve their real estate goals.
          </p>
        </div>
      </section>

      {/* Active Listings */}
      {activeListings.length > 0 && (
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-sm font-semibold tracking-luxury text-crimson uppercase mb-2">
                Current
              </p>
              <h2 className="font-serif text-4xl font-semibold text-charcoal">
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
        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-sm font-semibold tracking-luxury text-dark-green uppercase mb-2">
                Track Record
              </p>
              <h2 className="font-serif text-4xl font-semibold text-charcoal">
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
            <h2 className="font-serif text-4xl font-semibold text-charcoal">
              Looking for something specific?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Contact me for additional properties, market analysis, or to discuss your real estate goals.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
