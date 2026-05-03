import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { serverClient } from '@/lib/sanity/client'
import { FEATURED_PROPERTIES_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { FeaturedListingsClient } from '@/components/home/FeaturedListingsClient'

interface SanityImage {
  _key?: string
  asset?: { _ref: string }
  alt?: string
}

interface Property {
  _id: string
  address: string
  slug: { current: string }
  beds: number
  baths: number
  sqft: number
  heroImage?: SanityImage
}

export async function FeaturedListings() {
  let properties: Property[] = []

  try {
    properties = await serverClient.fetch(FEATURED_PROPERTIES_QUERY)
  } catch (error) {
    console.error('Failed to fetch properties:', error)
  }

  // Fallback placeholder
  if (properties.length === 0) {
    properties = [
      {
        _id: '1',
        address: 'Add properties to Sanity Studio to see them here',
        slug: { current: 'placeholder' },
        beds: 3,
        baths: 2,
        sqft: 2100,
      },
      {
        _id: '2',
        address: 'Go to /studio to create properties',
        slug: { current: 'placeholder' },
        beds: 2,
        baths: 2,
        sqft: 1600,
      },
      {
        _id: '3',
        address: 'Featured properties will appear here',
        slug: { current: 'placeholder' },
        beds: 4,
        baths: 3,
        sqft: 3500,
      },
    ]
  }

  return (
    <FeaturedListingsClient properties={properties} />
  )
}
