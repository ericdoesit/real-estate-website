import { serverClient } from '@/lib/sanity/client'
import { NEIGHBORHOOD_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { getNeighborhoodPhoto } from '@/lib/neighborhoods'

interface Neighborhood {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  overview: any[]
  lifestyleHighlights: Array<{
    category: string
    name: string
    note: string
  }>
}

export default async function NeighborhoodDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>
}) {
  const params = await paramsPromise
  let neighborhood: Neighborhood | null = null

  try {
    neighborhood = await serverClient.fetch(NEIGHBORHOOD_BY_SLUG_QUERY, {
      slug: params.slug,
    })
  } catch (error) {
    console.error('Failed to fetch neighborhood:', error)
  }

  if (!neighborhood) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-serif text-4xl font-semibold text-charcoal mb-8">
          Neighborhood not found
        </h1>
        <p className="text-charcoal">
          This neighborhood guide doesn't exist yet. Create it in Sanity Studio.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero section with image */}
      <section className="relative h-96 lg:h-[500px] w-full">
        <Image
          src={`/neighborhoods/${getNeighborhoodPhoto(neighborhood._id)}`}
          alt={neighborhood.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 space-y-4">
            <p className="text-sm font-semibold tracking-luxury text-goldenrod uppercase">
              Neighborhood Guide
            </p>
            <h1 className="font-serif text-6xl font-semibold text-white">
              {neighborhood.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">{neighborhood.tagline}</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
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
                <h2 className="font-serif text-5xl font-semibold text-charcoal">
                  What to Do Here
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {neighborhood.lifestyleHighlights.map((highlight, i) => (
                    <div key={i} className="border-l-4 border-yellow pl-6 py-4">
                      <p className="text-sm text-selection font-semibold uppercase tracking-luxury mb-1">
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
    </div>
  )
}
