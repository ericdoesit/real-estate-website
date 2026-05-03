import Link from 'next/link'
import Image from 'next/image'
import { serverClient } from '@/lib/sanity/client'
import { NEIGHBORHOODS_QUERY } from '@/lib/sanity/queries'
import { Eyebrow } from '@/components/ui/Eyebrow'

const PHOTOS = [
  '13705488963_76a358d8ac_o.jpg',
  '15060426861_f6d33577bb_k.jpg',
  '15306603569_ba5fff0f60_k.jpg',
  '15873911522_636c4c213a_o.jpg',
  '5609986343_1b278c4750_o.jpg',
  '9595594302_64be79ce3a_o.jpg',
  'alexis-balinoff-2KIDkMzmO-k-unsplash.jpg',
  'hero-1.jpg',
  'hero-2.jpg',
  'hero-3.jpg',
  'ivan-karpov-7oLuzIZ3QIg-unsplash.jpg',
  'pexels-anthony-thomas-733236359-18409401.jpg',
  'pexels-blackmakaw-19964276.jpg',
  'pexels-davidmcelwee-11695725.jpg',
  'pexels-duggiefresch-4329924.jpg',
  'pexels-loquellano-17928132.jpg',
  'pexels-martinpechy-2763964.jpg',
  'pexels-martinpechy-2763967.jpg',
  'pexels-myatezhny39-30151761.jpg',
  'pexels-myatezhny39-30151773.jpg',
  'pexels-rdne-8782693.jpg',
  'pexels-rdne-8783581.jpg',
  'pexels-rdne-8783590.jpg',
  'pexels-rdne-8783844.jpg',
  'pexels-robertkso-34960816.jpg',
  'pexels-rockwell-branding-agency-85164430-9137653.jpg',
  'pexels-rpnickson-2709964.jpg',
  'pexels-sergei-a-1322276-2539437.jpg',
  'pexels-vincent-gerbouin-445991-2263669.jpg',
  'pexels-vlada-karpovich-4449625.jpg',
]

function getRandomPhoto(seed: string) {
  const hash = seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return PHOTOS[hash % PHOTOS.length]
}

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
    <div className="">
      {/* Hero */}
      <section className="pt-10 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <Eyebrow>Neighborhoods</Eyebrow>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              Explore LA neighborhoods.
            </h1>
          </div>

          <p className="text-lg text-charcoal max-w-2xl leading-relaxed">
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
                <div className="relative h-64 bg-gradient-to-br from-dark-green/20 to-dark-green/20 rounded-xl overflow-hidden mb-4 hover:shadow-lg transition-shadow group">
                  <Image
                    src={`/neighborhoods/${getRandomPhoto(neighborhood._id)}`}
                    alt={neighborhood.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-serif text-3xl font-semibold text-charcoal group-hover:transition-colors">
                  {neighborhood.name}
                </h3>
                <p className="text-charcoal text-sm mt-2">{neighborhood.tagline}</p>

              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-cream py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-5xl font-semibold text-charcoal">
              Want neighborhood insights?
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Each neighborhood guide includes market data, lifestyle highlights, investment potential, and what makes
              the area special. Click any neighborhood above to explore.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
