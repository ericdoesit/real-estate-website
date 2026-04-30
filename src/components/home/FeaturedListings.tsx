import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { serverClient } from '@/lib/sanity/client'
import { FEATURED_PROPERTIES_QUERY } from '@/lib/sanity/queries'

interface Property {
  _id: string
  address: string
  slug: { current: string }
  listPrice: number
  beds: number
  baths: number
  sqft: number
}

export async function FeaturedListings() {
  let properties: Property[] = []

  try {
    properties = await serverClient.fetch(FEATURED_PROPERTIES_QUERY)
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
        listPrice: 2450000,
        beds: 3,
        baths: 2,
        sqft: 2100,
      },
      {
        _id: '2',
        address: 'Go to /studio to create properties',
        slug: { current: 'placeholder' },
        listPrice: 1850000,
        beds: 2,
        baths: 2,
        sqft: 1600,
      },
      {
        _id: '3',
        address: 'Featured properties will appear here',
        slug: { current: 'placeholder' },
        listPrice: 3200000,
        beds: 4,
        baths: 3,
        sqft: 3500,
      },
    ]
  }

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <p className="text-sm font-semibold tracking-luxury text-crimson uppercase">
            Featured Properties
          </p>
          <h2 className="font-serif text-5xl font-semibold text-charcoal max-w-2xl">
            Curated listings. Available now.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map(property => (
            <div key={property._id} className="group">
              {/* Image placeholder */}
              <div className="relative h-64 bg-dark-green/10 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                <div className="absolute top-4 right-4 bg-crimson text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
                <p className="text-muted">Property image</p>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-semibold text-charcoal group-hover:text-coral transition-colors">
                  {property.address}
                </h3>

                <div className="flex gap-6 text-sm text-muted">
                  <span>{property.beds} bed</span>
                  <span>{property.baths} bath</span>
                  <span>{property.sqft?.toLocaleString()} sqft</span>
                </div>

                <p className="text-2xl font-serif font-semibold text-dark-green">
                  ${property.listPrice?.toLocaleString()}
                </p>

                <Link href={`/properties/${property.slug?.current || 'placeholder'}`} className="text-crimson text-sm font-semibold hover:text-crimson/80 inline-flex items-center gap-2">
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/properties">
            <Button className="bg-goldenrod text-charcoal hover:bg-goldenrod/90 font-semibold">
              See All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
