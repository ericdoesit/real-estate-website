import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PrevNextNav } from '@/components/ui/PrevNextNav'
import { ImageLightbox } from '@/components/ImageLightbox'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { serverClient } from '@/lib/sanity/client'
import { ALL_PROPERTY_SLUGS_QUERY, PROPERTY_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

interface SanityImage {
  _key?: string
  asset?: { _ref: string }
  alt?: string
}

interface Property {
  _id: string
  address: string
  status: string
  soldDate?: string
  price?: number
  city?: string
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
    return await serverClient.fetch(PROPERTY_BY_SLUG_QUERY, { slug: id })
  } catch (error) {
    console.error(`Failed to fetch property with slug "${id}":`, error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await serverClient.fetch(ALL_PROPERTY_SLUGS_QUERY)
    return slugs.map((entry: { slug: string }) => ({ id: entry.slug }))
  } catch (error) {
    console.error('Failed to fetch property slugs:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    return {
      title: 'Property Not Found',
      description: 'The property you are looking for does not exist.',
    }
  }

  return {
    title: `${property.address}`,
    description: `${property.beds ?? ''} bed, ${property.baths ?? ''} bath property`.trim(),
  }
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    return (
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-4xl font-semibold text-charcoal mb-4">Property Not Found</h1>
        <p className="text-charcoal mb-8">The property you're looking for doesn't exist.</p>
        <Link href="/properties" className="font-semibold hover:transition-colors">
          ← Back to Properties
        </Link>
      </div>
    )
  }

  let allSlugs: Array<{ slug: string; address: string }> = []
  try {
    allSlugs = await serverClient.fetch(ALL_PROPERTY_SLUGS_QUERY)
  } catch (error) {
    console.error('Failed to fetch property slugs:', error)
  }

  const galleryImages = property.gallery && property.gallery.length > 0
    ? property.gallery
    : (property.heroImage ? [property.heroImage] : [])

  const currentIndex = allSlugs.findIndex((entry) => entry.slug === id)
  const prevEntry = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
  const nextEntry = currentIndex >= 0 && currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null
  const prev = prevEntry ? { href: `/properties/${prevEntry.slug}`, label: prevEntry.address } : null
  const next = nextEntry ? { href: `/properties/${nextEntry.slug}`, label: nextEntry.address } : null

  return (
    <article className="space-y-12">
      {/* Hero Image */}
      <section className="pt-10">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site px-6 lg:px-12">
            {property.heroImage ? (
              <div className="relative w-full aspect-video overflow-hidden rounded-brand">
                <Image
                  src={urlFor(property.heroImage).url()}
                  alt={property.heroImage.alt || property.address}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-charcoal/10 flex items-center justify-center overflow-hidden rounded-brand">
                <p className="text-charcoal">No property image available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Header */}
      <section>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-6">
          <div className="space-y-4">
            <Eyebrow color="charcoal">
              {property.city || (property.status === 'active' ? 'Active' : 'Sold')}
            </Eyebrow>

            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              {property.address}
            </h1>

            {property.price && (
              <p className="text-2xl font-sans text-muted">
                ${property.price.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-cream py-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
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
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-serif text-5xl font-semibold text-charcoal mb-4">
              About This Home
            </h2>
            {property.description ? (
              <div className="text-lg text-charcoal leading-relaxed">
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
              <p className="text-lg text-charcoal leading-relaxed">No description available.</p>
            )}
          </div>

          {property.features && property.features.length > 0 && (
            <div>
              <h3 className="font-serif text-3xl font-semibold text-charcoal mb-6">
                Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-charcoal font-bold">✓</span>
                    <span className="text-charcoal">{feature}</span>
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
          <div className="container-site px-6 lg:px-12">
            <div className="mb-8">
              <h2 className="font-serif text-5xl font-semibold text-charcoal">
                Property Gallery
              </h2>
            </div>
            <ImageLightbox
              images={galleryImages.map((img: SanityImage) => ({
                ...img,
                url: urlFor(img).url(),
              }))}
            />
            <PrevNextNav prev={prev} next={next} />
          </div>
        </section>
      )}

      {/* Back Link */}
      <section className="pb-10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/properties" className="font-semibold inline-flex items-center gap-2">
            ← Back to Properties
          </Link>
        </div>
      </section>
    </article>
  )
}
