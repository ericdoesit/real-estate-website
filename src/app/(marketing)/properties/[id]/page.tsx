import Link from 'next/link'
import { ImageLightbox } from '@/components/ImageLightbox'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PrevNextNav } from '@/components/ui/PrevNextNav'
import { CTABanner } from '@/components/home/CTABanner'
import { notFound } from 'next/navigation'
import { serverClient } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { SanityImage } from '@/components/ui/SanityImage'
import { ALL_PROPERTY_SLUGS_QUERY } from '@/lib/sanity/queries'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { upcomingOpenHouses, formatOpenHouse, type OpenHouse } from '@/lib/openHouse'

/** Serialize Portable Text blocks to a plain string */
function blocksToText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .filter((b: any) => b._type === 'block' && b.children)
    .map((b: any) => b.children.map((c: any) => c.text || '').join(''))
    .join(' ')
    .trim()
}

interface SanityImage {
  _key?: string
  asset?: { _ref: string }
  alt?: string
  caption?: string
}

interface Property {
  _id: string
  address: string
  city?: string
  status: string
  price?: number
  soldDate?: string
  beds?: number
  baths?: number
  sqft?: number
  propertyType?: string
  heroImage?: SanityImage
  gallery?: SanityImage[]
  description?: Array<{ _type: string; children?: Array<{ text: string }> }>
  features?: string[]
  openHouses?: OpenHouse[]
}

async function getProperty(id: string) {
  try {
    const property = await serverClient.fetch(
      `*[_type == "property" && slug.current == $slug][0] {
        _id,
        address,
        city,
        slug,
        status,
        price,
        soldDate,
        beds,
        baths,
        sqft,
        propertyType,
        heroImage,
        gallery,
        description,
        features,
        openHouses,
      }`,
      { slug: id }
    )
    return property
  } catch (error) {
    return null
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

  const description = blocksToText(property.description)
    || `${property.beds} bed, ${property.baths} bath home${property.city ? ` in ${property.city}` : ''}${property.price ? ` listed at $${property.price.toLocaleString()}` : ''}.`
  return {
    title: property.address,
    description,
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await serverClient.fetch(ALL_PROPERTY_SLUGS_QUERY)
    return slugs.map((entry: { slug: string }) => ({ id: entry.slug }))
  } catch {
    return []
  }
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [property, allProperties] = await Promise.all([
    getProperty(id),
    serverClient.fetch(ALL_PROPERTY_SLUGS_QUERY).catch(() => []),
  ])

  const currentIdx = allProperties.findIndex((p: { slug: string }) => p.slug === id)
  const prevProperty = currentIdx > 0 ? allProperties[currentIdx - 1] : null
  const nextProperty = currentIdx < allProperties.length - 1 ? allProperties[currentIdx + 1] : null

  if (!property) notFound()

  const galleryImages = property.gallery && property.gallery.length > 0
    ? property.gallery
    : (property.heroImage ? [property.heroImage] : [])

  return (
    <article className="space-y-12">
      {/* Hero Image */}
      <section className="pt-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {property.heroImage ? (
            <div className="relative w-full aspect-video overflow-hidden rounded-brand">
              <SanityImage
                src={urlFor(property.heroImage).url()}
                alt={property.heroImage.alt || property.address}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) calc(100vw - 96px), 1152px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-sand flex items-center justify-center overflow-hidden rounded-brand">
              <p className="text-charcoal">No property image available</p>
            </div>
          )}
        </div>
      </section>

      {/* Header */}
      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-6">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Properties', href: '/properties' },
            { label: property.address },
          ]} />
          <div className="space-y-4">
            <Eyebrow color="charcoal">
              {property.city ? `${property.city} · ` : ''}{property.status === 'active' ? 'Active' : property.status === 'pending' ? 'Pending' : 'Sold'}{property.status === 'sold' && property.soldDate ? ` · ${new Date(property.soldDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : ''}
            </Eyebrow>

            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              {property.address}
            </h1>

            {property.price && (
              <p className="font-serif text-3xl font-semibold text-charcoal">
                ${property.price.toLocaleString()}
              </p>
            )}

            {property.status === 'active' && upcomingOpenHouses(property.openHouses).map((oh) => (
              <p key={oh._key || oh.start} className="inline-flex items-center gap-2 mr-3 bg-charcoal text-cream text-sm font-semibold px-4 py-2 rounded-full">
                <span className="uppercase tracking-luxury">Open House</span>
                <span>{formatOpenHouse(oh)}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-cream py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-sm font-semibold text-charcoal uppercase tracking-luxury mb-2">Bedrooms</p>
              <p className="text-3xl font-serif font-semibold text-charcoal">{property.beds}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-charcoal uppercase tracking-luxury mb-2">Bathrooms</p>
              <p className="text-3xl font-serif font-semibold text-charcoal">{property.baths}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-charcoal uppercase tracking-luxury mb-2">Square Feet</p>
              <p className="text-3xl font-serif font-semibold text-charcoal">{property.sqft?.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-charcoal uppercase tracking-luxury mb-2">Type</p>
              <p className="text-3xl font-serif font-semibold text-charcoal">{property.propertyType}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-8">
          <div>
            <h2 className="font-serif text-4xl lg:text-6xl font-semibold capitalize text-charcoal mb-4">About This Home</h2>
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
              <h3 className="font-serif text-3xl font-semibold text-charcoal mb-6">Features</h3>
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
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="mb-8">
              <h2 className="font-serif text-4xl lg:text-6xl font-semibold capitalize text-charcoal">Property Gallery</h2>
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

      {/* Prev / Next */}
      <section className="pb-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <PrevNextNav
            prev={prevProperty ? { label: prevProperty.address, href: `/properties/${prevProperty.slug}` } : null}
            next={nextProperty ? { label: nextProperty.address, href: `/properties/${nextProperty.slug}` } : null}
          />
          <div className="text-center mt-2">
            <Link href="/properties" className="text-sm font-semibold tracking-luxury uppercase text-charcoal/70 hover:text-charcoal transition-colors">
              Back to Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <CTABanner
        heading="Interested in this home?"
        description="Great homes don't wait — and neither do I. Reach out and let's talk about making it yours."
      />
    </article>
  )
}
