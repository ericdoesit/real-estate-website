import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { serverClient } from '@/lib/sanity/client'
import {
  ALL_NEIGHBORHOOD_SLUGS_QUERY,
  NEIGHBORHOOD_BY_SLUG_QUERY,
} from '@/lib/sanity/queries'
import { PrevNextNav } from '@/components/ui/PrevNextNav'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { getNeighborhoodPhoto } from '@/lib/neighborhoods'
import { urlFor } from '@/lib/sanity/image'

interface Neighborhood {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  heroImage?: { asset?: { _ref: string }; alt?: string }
  overview: any[]
  lifestyleHighlights: Array<{
    category: string
    name: string
    note: string
  }>
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise
  let neighborhood: Neighborhood | null = null

  try {
    neighborhood = await serverClient.fetch(NEIGHBORHOOD_BY_SLUG_QUERY, {
      slug: params.slug,
    })
  } catch (error) {
    console.error('Failed to fetch neighborhood metadata:', error)
  }

  if (!neighborhood) {
    return {
      title: 'Neighborhood Guide Not Found',
      description: 'The neighborhood guide you are looking for does not exist.',
    }
  }

  return {
    title: neighborhood.name,
    description: neighborhood.tagline,
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await serverClient.fetch(ALL_NEIGHBORHOOD_SLUGS_QUERY)
    return slugs.map((entry: { slug: string }) => ({ slug: entry.slug }))
  } catch (error) {
    console.error('Failed to fetch neighborhood slugs:', error)
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
  let allSlugs: Array<{ slug: string; name: string }> = []

  try {
    neighborhood = await serverClient.fetch(NEIGHBORHOOD_BY_SLUG_QUERY, {
      slug: params.slug,
    })
    allSlugs = await serverClient.fetch(ALL_NEIGHBORHOOD_SLUGS_QUERY)
  } catch (error) {
    console.error('Failed to fetch neighborhood:', error)
  }

  if (!neighborhood) {
    return (
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <h1 className="font-serif text-4xl font-semibold text-charcoal mb-8">
          Neighborhood not found
        </h1>
        <p className="text-charcoal">
          This neighborhood guide doesn't exist yet. Create it in Sanity Studio.
        </p>
        <Link href="/local-guide" className="mt-8 inline-flex font-semibold">
          ← Back to Local Guide
        </Link>
      </div>
    )
  }

  const currentIndex = allSlugs.findIndex((entry) => entry.slug === params.slug)
  const prevEntry = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
  const nextEntry = currentIndex >= 0 && currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null
  const prev = prevEntry ? { href: `/local-guide/${prevEntry.slug}`, label: prevEntry.name } : null
  const next = nextEntry ? { href: `/local-guide/${nextEntry.slug}`, label: nextEntry.name } : null
  const heroSrc = neighborhood.heroImage
    ? urlFor(neighborhood.heroImage).width(800).url()
    : `/hood-photos/${getNeighborhoodPhoto(neighborhood._id)}`

  return (
    <div className="flex flex-col">
      <section className="pt-10">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site max-w-3xl space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-brand">
              <Image
                src={heroSrc}
                alt={neighborhood.heroImage?.alt || neighborhood.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            <div className="space-y-4">
              <Eyebrow color="charcoal">Neighborhood Guide</Eyebrow>
              <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
                {neighborhood.name}
              </h1>
              <p className="text-xl text-charcoal/80 max-w-2xl">{neighborhood.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-site max-w-3xl px-6 lg:px-8 space-y-16">
          {neighborhood.overview && neighborhood.overview.length > 0 && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={neighborhood.overview} />
            </div>
          )}

          {neighborhood.lifestyleHighlights &&
            neighborhood.lifestyleHighlights.length > 0 && (
              <div className="space-y-6">
                <h2 className="font-serif text-5xl font-semibold text-charcoal">
                  What to Do Here
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {neighborhood.lifestyleHighlights.map((highlight, i) => (
                    <div key={i} className="border-l-4 border-charcoal/20 pl-6 py-4">
                      <p className="text-sm text-muted font-semibold uppercase tracking-luxury mb-1">
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
        </div>
      </section>

      <section className="w-full px-6 lg:px-12 pb-10">
        <div className="container-site max-w-3xl">
          <PrevNextNav prev={prev} next={next} />
        </div>
      </section>
    </div>
  )
}
