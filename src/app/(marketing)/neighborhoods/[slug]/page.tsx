import { serverClient } from '@/lib/sanity/client'
import { NEIGHBORHOOD_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

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
          src={`/neighborhoods/${getRandomPhoto(neighborhood._id)}`}
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
                      <p className="text-sm text-coral font-semibold uppercase tracking-luxury mb-1">
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
