import { serverClient } from '@/lib/sanity/client'
import { NEIGHBORHOOD_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import { PortableText } from '@portabletext/react'

interface Neighborhood {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  overview: any[]
  marketStats: {
    medianPrice: number
    avgDaysOnMarket: number
    activeListings: number
    pricePerSqFt: number
    lastUpdated: string
  }
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
        <p className="text-muted">
          This neighborhood guide doesn't exist yet. Create it in Sanity Studio.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero section with tagline */}
      <section className="py-20 bg-gradient-to-br from-blue/10 to-coral/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-sm font-semibold tracking-luxury text-coral uppercase">
            Neighborhood Guide
          </p>
          <h1 className="font-serif text-6xl font-semibold text-charcoal">
            {neighborhood.name}
          </h1>
          <p className="text-xl text-muted max-w-2xl">{neighborhood.tagline}</p>
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

          {/* Market Stats */}
          {neighborhood.marketStats && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-semibold text-charcoal">
                Market Data
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-cream p-8 rounded-xl">
                  <div>
                    <p className="text-sm text-muted uppercase tracking-luxury mb-2">
                      Median Price
                    </p>
                    <p className="text-2xl font-serif font-semibold text-blue">
                      ${neighborhood.marketStats.medianPrice?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted uppercase tracking-luxury mb-2">
                      Avg Days on Market
                    </p>
                    <p className="text-2xl font-serif font-semibold text-blue">
                      {neighborhood.marketStats.avgDaysOnMarket}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted uppercase tracking-luxury mb-2">
                      Active Listings
                    </p>
                    <p className="text-2xl font-serif font-semibold text-blue">
                      {neighborhood.marketStats.activeListings}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted uppercase tracking-luxury mb-2">
                      Price Per Sq Ft
                    </p>
                    <p className="text-2xl font-serif font-semibold text-blue">
                      ${neighborhood.marketStats.pricePerSqFt}
                    </p>
                  </div>
                </div>
                {neighborhood.marketStats.lastUpdated && (
                  <p className="text-xs text-muted">
                    Data as of {new Date(neighborhood.marketStats.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Lifestyle Highlights */}
          {neighborhood.lifestyleHighlights &&
            neighborhood.lifestyleHighlights.length > 0 && (
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-semibold text-charcoal">
                  What to Do Here
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {neighborhood.lifestyleHighlights.map((highlight, i) => (
                    <div key={i} className="border-l-4 border-yellow pl-6 py-4">
                      <p className="text-sm text-coral font-semibold uppercase tracking-luxury mb-1">
                        {highlight.category}
                      </p>
                      <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                        {highlight.name}
                      </h3>
                      <p className="text-muted">{highlight.note}</p>
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
