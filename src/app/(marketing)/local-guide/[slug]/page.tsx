import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serverClient } from '@/lib/sanity/client'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { NEIGHBORHOOD_BY_SLUG_QUERY, ALL_NEIGHBORHOOD_SLUGS_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { SanityImage } from '@/components/ui/SanityImage'
import { PortableText } from '@portabletext/react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PrevNextNav } from '@/components/ui/PrevNextNav'
import { getNeighborhoodPhoto } from '@/lib/neighborhoods'

interface SanityImage {
  asset?: { _ref: string }
  alt?: string
}

interface Neighborhood {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  heroImage?: SanityImage
  overview: any[]
  lifestyleHighlights: Array<{
    category: string
    name: string
    note: string
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
    noIndex?: boolean
  }
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await paramsPromise
  const neighborhood: Neighborhood | null = await serverClient
    .fetch(NEIGHBORHOOD_BY_SLUG_QUERY, { slug })
    .catch(() => null)

  if (!neighborhood) return {}

  const title =
    neighborhood.seo?.metaTitle ||
    `Living in ${neighborhood.name}, Los Angeles`

  const description =
    neighborhood.seo?.metaDescription ||
    neighborhood.tagline ||
    `Explore homes and lifestyle in ${neighborhood.name}, Los Angeles.`

  return {
    title,
    description,
    robots: neighborhood.seo?.noIndex ? { index: false } : undefined,
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await serverClient.fetch(ALL_NEIGHBORHOOD_SLUGS_QUERY)
    return slugs.map((entry: { slug: string }) => ({ slug: entry.slug }))
  } catch {
    return []
  }
}

export default async function NeighborhoodDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>
}) {
  const params = await paramsPromise
  let neighborhood: Neighborhood | null = null

  const [fetchedNeighborhood, allNeighborhoods] = await Promise.all([
    serverClient.fetch(NEIGHBORHOOD_BY_SLUG_QUERY, { slug: params.slug }).catch(() => null),
    serverClient.fetch(ALL_NEIGHBORHOOD_SLUGS_QUERY).catch(() => []),
  ])
  neighborhood = fetchedNeighborhood

  const currentIdx = allNeighborhoods.findIndex(
    (n: { slug: string }) => n.slug === params.slug
  )
  const prevNeighborhood = currentIdx > 0 ? allNeighborhoods[currentIdx - 1] : null
  const nextNeighborhood =
    currentIdx < allNeighborhoods.length - 1 ? allNeighborhoods[currentIdx + 1] : null

  if (!neighborhood) notFound()

  return (
    <div className="flex flex-col">
      {/* Hero image */}
      <section className="pt-10 pb-4">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            <div className="relative w-full aspect-video overflow-hidden rounded-brand">
              <SanityImage
                src={
                  neighborhood.heroImage?.asset
                    ? urlFor(neighborhood.heroImage).url()
                    : `/hood-photos/${getNeighborhoodPhoto(neighborhood._id)}`
                }
                alt={neighborhood.heroImage?.alt || neighborhood.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1152px) calc(100vw - 96px), 1400px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="pt-10 pb-4">
        <div className="container-site px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Local Guide', href: '/local-guide' },
            { label: neighborhood.name },
          ]} />
          <Eyebrow>Neighborhood Guide</Eyebrow>
          <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal">
            {neighborhood.name}
          </h1>
          <p className="text-xl text-charcoal/80 max-w-2xl">{neighborhood.tagline}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16">
        <div className="container-site px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Overview */}
          {neighborhood.overview && neighborhood.overview.length > 0 && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={neighborhood.overview} />
            </div>
          )}

          {/* Lifestyle Highlights */}
          {neighborhood.lifestyleHighlights &&
            neighborhood.lifestyleHighlights.length > 0 && (
              <div className="space-y-6">
                <h2 className="font-serif text-4xl lg:text-6xl font-semibold capitalize text-charcoal">
                  What to Do Here
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {neighborhood.lifestyleHighlights.map((highlight, i) => (
                    <div key={i} className="border-l-4 border-charcoal/20 pl-6 py-4">
                      <p className="text-sm text-charcoal font-semibold uppercase tracking-luxury mb-1">
                        {highlight.category}
                      </p>
                      <h3 className="font-serif text-3xl font-semibold text-charcoal mb-2">
                        {highlight.name}
                      </h3>
                      <p className="text-charcoal">{highlight.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          <PrevNextNav
            prev={prevNeighborhood ? { label: prevNeighborhood.name, href: `/local-guide/${prevNeighborhood.slug}` } : null}
            next={nextNeighborhood ? { label: nextNeighborhood.name, href: `/local-guide/${nextNeighborhood.slug}` } : null}
          />
        </div>
      </section>
    </div>
  )
}
