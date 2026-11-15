import Link from 'next/link'
import { SanityImage } from '@/components/ui/SanityImage'
import { serverClient } from '@/lib/sanity/client'
import { ALL_PROPERTIES_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTABanner } from '@/components/home/CTABanner'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'
import { agent } from '@/config/agent'

export const revalidate = 86400

interface SanityImage {
  _key?: string
  asset?: { _ref: string }
  alt?: string
}

interface Property {
  _id: string
  address: string
  city?: string
  slug: { current: string }
  status: string
  price?: number
  beds: number
  baths: number
  sqft: number
  heroImage?: SanityImage
}

export const metadata = {
  title: 'Properties - Listings',
  description: 'Browse featured properties and sold listings across Los Angeles from Eric Zunkley, REALTOR®.',
}

export default async function PropertiesPage() {
  let properties: Property[] = []

  try {
    properties = await serverClient.fetch(ALL_PROPERTIES_QUERY)
  } catch (error) {
    // Silent fallback
  }

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

  const activeListings = properties.filter((p) => p.status?.toLowerCase() === 'active')
  const pendingListings = properties.filter((p) => p.status?.toLowerCase() === 'pending')
  const soldListings = properties.filter((p) => p.status?.toLowerCase() === 'sold')

  const PropertyCard = ({ property, priority }: { property: Property; priority?: boolean }) => (
    <Link href={`/properties/${property.slug?.current || 'placeholder'}`} className="group">
      <div className="space-y-4">
        <div className="relative h-64 rounded-brand overflow-hidden group">
          {property.heroImage ? (
            <SanityImage
              src={urlFor(property.heroImage).url()}
              alt={property.heroImage.alt || property.address}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-sand flex items-center justify-center">
              <p className="text-charcoal">No image available</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-600 ease-out pointer-events-none" />
        </div>

        <div className="space-y-2">
          {property.city && <Eyebrow>{property.city}</Eyebrow>}
          <h3 className="font-serif text-3xl font-semibold text-charcoal group-hover:transition-colors line-clamp-2">
            {property.address}
          </h3>

          <div className="flex gap-4 text-sm text-charcoal">
            {property.price && <span>${property.price.toLocaleString()}</span>}
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
          <div className="container-site">
            <StaggerGroup className="space-y-8">
              <StaggerItem className="space-y-3">
                <Eyebrow>Properties</Eyebrow>
                <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal capitalize">
                  Active &amp; Sold
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="font-sans text-lg text-charcoal leading-relaxed">
                  The properties shown represent a selection of recent transactions across Los Angeles over the past {agent.yearsExperience} years. Eric served as the buyer&apos;s agent on some of these sales. Photos and listing information for buyer-represented transactions are provided courtesy of the respective listing agents and MLS, and do not imply that Eric Zunkley held the listing.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Active Listings */}
      {activeListings.length > 0 && (
        <section className="py-20">
          <div className="w-full px-6 lg:px-12">
            <div className="container-site">
              <StaggerGroup>
                <StaggerItem className="mb-10 space-y-3">
                  <Eyebrow>Current</Eyebrow>
                  <h2 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal capitalize">Active Listings</h2>
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

      {/* Pending Listings */}
      {pendingListings.length > 0 && (
        <section className="py-20">
          <div className="w-full px-6 lg:px-12">
            <div className="container-site">
              <StaggerGroup>
                <StaggerItem className="mb-10 space-y-3">
                  <Eyebrow>Under Contract</Eyebrow>
                  <h2 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal capitalize">Pending</h2>
                </StaggerItem>
                <StaggerItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pendingListings.map((property, i) => (
                      <PropertyCard key={property._id} property={property} priority={false} />
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
        <section className="py-20">
          <div className="w-full px-6 lg:px-12">
            <div className="container-site">
              <StaggerGroup>
                <StaggerItem className="mb-10 space-y-3">
                  <Eyebrow>Past Transactions</Eyebrow>
                  <h2 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal capitalize">Sold</h2>
                </StaggerItem>
                <StaggerItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {soldListings.map((property, i) => (
                      <PropertyCard
                        key={property._id}
                        property={property}
                        priority={activeListings.length === 0 && pendingListings.length === 0 && i === 0}
                      />
                    ))}
                  </div>
                </StaggerItem>
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
