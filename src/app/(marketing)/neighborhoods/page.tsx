import Link from 'next/link'
import { serverClient } from '@/lib/sanity/client'
import { NEIGHBORHOODS_QUERY } from '@/lib/sanity/queries'

interface Neighborhood {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
}

export const metadata = {
  title: 'LA Neighborhoods - Market Guides',
  description:
    'Explore Los Angeles neighborhoods with market data, lifestyle insights, and real estate investment information.',
}

export default async function NeighborhoodsPage() {
  let neighborhoods: Neighborhood[] = []

  try {
    neighborhoods = await serverClient.fetch(NEIGHBORHOODS_QUERY)
  } catch (error) {
    console.error('Failed to fetch neighborhoods:', error)
  }

  // Fallback placeholder
  if (neighborhoods.length === 0) {
    neighborhoods = [
      {
        _id: '1',
        name: 'Mid City',
        slug: { current: 'mid-city' },
        tagline: "LA's vibrant heart",
      },
      {
        _id: '2',
        name: 'Eagle Rock',
        slug: { current: 'eagle-rock' },
        tagline: 'Character and charm',
      },
      {
        _id: '3',
        name: 'Highland Park',
        slug: { current: 'highland-park' },
        tagline: 'Emerging coolness',
      },
      {
        _id: '4',
        name: 'West Adams',
        slug: { current: 'west-adams' },
        tagline: 'Historic elegance',
      },
      {
        _id: '5',
        name: 'Venice',
        slug: { current: 'venice' },
        tagline: 'Beachside culture',
      },
      {
        _id: '6',
        name: 'Silver Lake',
        slug: { current: 'silver-lake' },
        tagline: 'Artistic haven',
      },
    ]
  }

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-luxury text-dark-green uppercase">
              Neighborhoods
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              Explore LA neighborhoods.
            </h1>
          </div>

          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Each neighborhood has its own character, market dynamics, and investment potential. Explore detailed guides
            with market data, lifestyle insights, and what makes each area special.
          </p>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((neighborhood) => (
              <Link
                key={neighborhood._id}
                href={`/neighborhoods/${neighborhood.slug?.current || neighborhood.name.toLowerCase().replace(' ', '-')}`}
                className="group"
              >
                <div className="relative h-64 bg-gradient-to-br from-dark-green/20 to-crimson/20 rounded-xl overflow-hidden mb-4 flex items-center justify-center hover:shadow-lg transition-shadow">
                  {/* Accent shapes */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-goldenrod rounded-full opacity-30" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-dark-green/10 rounded-full blur-xl" />

                  <p className="text-muted relative z-10">Neighborhood image</p>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-charcoal group-hover:text-crimson transition-colors">
                  {neighborhood.name}
                </h3>
                <p className="text-muted text-sm mt-2">{neighborhood.tagline}</p>

              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl font-semibold text-charcoal">
              Want neighborhood insights?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Each neighborhood guide includes market data, lifestyle highlights, investment potential, and what makes
              the area special. Click any neighborhood above to explore.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
