import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ImageLightbox } from '@/components/ImageLightbox'
import { serverClient } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { PROPERTY_BY_SLUG_QUERY } from '@/lib/sanity/queries'

interface SanityImage {
  _key?: string
  asset?: { _ref: string }
  alt?: string
}

interface Property {
  _id: string
  address: string
  status: string
  listPrice?: number
  soldPrice?: number
  soldDate?: string
  beds?: number
  baths?: number
  sqft?: number
  propertyType?: string
  heroImage?: SanityImage
  gallery?: SanityImage[]
  description?: Array<{ _type: string; children?: Array<{ text: string }> }>
  features?: string[]
}

async function getProperty(id: string) {
  try {
    const query = `*[_type == "property" && slug.current == "${id}"][0] {
      _id,
      address,
      slug,
      status,
      listPrice,
      soldPrice,
      soldDate,
      beds,
      baths,
      sqft,
      lotSize,
      yearBuilt,
      propertyType,
      heroImage,
      gallery,
      description,
      features,
    }`
    const encodedQuery = encodeURIComponent(query)
    const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodedQuery}`

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.SANITY_API_READ_TOKEN}`,
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Failed to fetch property:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    return {
      title: 'Property Not Found',
      description: 'The property you are looking for does not exist.',
    }
  }

  return {
    title: `${property.address}`,
    description: property.description || `${property.beds} bed, ${property.baths} bath property`,
  }
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-4xl font-semibold text-charcoal mb-4">Property Not Found</h1>
        <p className="text-muted mb-8">The property you're looking for doesn't exist.</p>
        <Link href="/properties" className="text-crimson font-semibold hover:text-crimson/80">
          ← Back to Properties
        </Link>
      </div>
    )
  }

  const isActive = property.status === 'active'
  const price = isActive ? property.listPrice : property.soldPrice

  const galleryImages = property.gallery && property.gallery.length > 0
    ? property.gallery
    : (property.heroImage ? [property.heroImage] : [])

  return (
    <article className="space-y-12">
      {/* Hero Image */}
      <section className="pt-20">
        {property.heroImage ? (
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(property.heroImage).url()}
              alt={property.heroImage.alt || property.address}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="h-96 lg:h-[500px] bg-dark-green/10 rounded-2xl flex items-center justify-center overflow-hidden">
            <p className="text-muted">No property image available</p>
          </div>
        )}
      </section>

      {/* Header */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full tracking-luxury uppercase ${
                  isActive
                    ? 'bg-dark-green/10 text-dark-green'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {property.status === 'active' ? 'Active' : 'Sold'}
              </span>
            </div>

            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              {property.address}
            </h1>

            <p className="text-xl font-serif font-semibold text-dark-green">
              ${price?.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-sm font-semibold text-charcoal uppercase tracking-luxury mb-2">
                Bedrooms
              </p>
              <p className="text-3xl font-serif font-semibold text-charcoal">
                {property.beds}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-charcoal uppercase tracking-luxury mb-2">
                Bathrooms
              </p>
              <p className="text-3xl font-serif font-semibold text-charcoal">
                {property.baths}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-charcoal uppercase tracking-luxury mb-2">
                Square Feet
              </p>
              <p className="text-3xl font-serif font-semibold text-charcoal">
                {property.sqft?.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-charcoal uppercase tracking-luxury mb-2">
                Type
              </p>
              <p className="text-3xl font-serif font-semibold text-charcoal">
                {property.propertyType}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-charcoal mb-4">
              About This Home
            </h2>
            {property.description ? (
              <div className="text-lg text-muted leading-relaxed">
                {Array.isArray(property.description) ? (
                  property.description.map((block: any, idx: number) => (
                    <p key={idx} className="mb-4">
                      {block.children?.map((child: any, cidx: number) => (
                        <span key={cidx}>{child.text}</span>
                      ))}
                    </p>
                  ))
                ) : (
                  <p>{property.description}</p>
                )}
              </div>
            ) : (
              <p className="text-lg text-muted leading-relaxed">No description available.</p>
            )}
          </div>

          {property.features && property.features.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-6">
                Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-dark-green font-bold">✓</span>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-serif text-3xl font-semibold text-charcoal">
                Property Gallery
              </h2>
            </div>
            <ImageLightbox
              images={galleryImages.map((img: SanityImage) => ({
                ...img,
                url: urlFor(img).url(),
              }))}
            />
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-dark-green py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl font-semibold text-white">
              Interested in this property?
            </h2>
            <p className="text-lg text-white/90 max-w-xl mx-auto">
              Let me know if you'd like more information or to schedule a viewing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-goldenrod text-charcoal hover:bg-goldenrod/90 font-semibold px-8 py-3 text-lg">
                Schedule a Showing
              </Button>
            </Link>
            <a href="tel:+13234879865">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-dark-green font-semibold px-8 py-3 text-lg"
              >
                Call (323) 487-9865
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/properties" className="text-crimson font-semibold hover:text-crimson/80 inline-flex items-center gap-2">
            ← Back to Properties
          </Link>
        </div>
      </section>
    </article>
  )
}
