#!/usr/bin/env node
// Seed script to populate initial Sanity data
// Run with: node scripts/seed-sanity.js

import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const neighborhoods = [
  {
    _type: 'neighborhoodGuide',
    name: 'Mid City',
    slug: { current: 'mid-city' },
    tagline: "LA's vibrant heart",
    overview: 'Mid City is the vibrant center of LA, known for its diverse community, active street life, and excellent walkability. Home to some of LA\'s best restaurants, galleries, and cultural institutions.',
    marketStats: {
      medianPrice: 850000,
      avgDaysOnMarket: 18,
      activeListings: 24,
      pricePerSqFt: 650,
      yoyPriceChange: 3.2,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Dining',
        name: 'World-Class Restaurants',
        note: 'Home to some of LA\'s most acclaimed chefs and diverse culinary scene.',
      },
      {
        category: 'Culture',
        name: 'Arts & Galleries',
        note: 'Thriving art scene with galleries, street art, and creative community.',
      },
      {
        category: 'Community',
        name: 'Active Neighborhoods',
        note: 'Strong community spirit with local events, markets, and social gathering spots.',
      },
    ],
    seo: {
      metaTitle: 'Mid City Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Explore Mid City, LA. Learn about the market, lifestyle, and real estate opportunities in this vibrant LA neighborhood.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Eagle Rock',
    slug: { current: 'eagle-rock' },
    tagline: 'Character and charm',
    overview: 'Eagle Rock is known for its tree-lined streets, charming vintage homes, and welcoming community. The neighborhood has seen significant revitalization while maintaining its character and affordability.',
    marketStats: {
      medianPrice: 720000,
      avgDaysOnMarket: 21,
      activeListings: 18,
      pricePerSqFt: 520,
      yoyPriceChange: 5.1,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Real Estate',
        name: 'Charming Craftsman Homes',
        note: 'Beautiful 1920s-1950s architecture with original details and curb appeal.',
      },
      {
        category: 'Community',
        name: 'Neighborhood Spirit',
        note: 'Strong community bonds, local farmers market, and neighborhood organizations.',
      },
      {
        category: 'Value',
        name: 'Growing Appeal',
        note: 'Appreciating market with strong growth potential and emerging local businesses.',
      },
    ],
    seo: {
      metaTitle: 'Eagle Rock Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Discover Eagle Rock, LA. Find out about homes, market trends, and what makes this charming neighborhood special.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Highland Park',
    slug: { current: 'highland-park' },
    tagline: 'Emerging coolness',
    overview: 'Highland Park is experiencing a renaissance with new boutiques, restaurants, and creative spaces while maintaining its bohemian character. A magnet for artists, entrepreneurs, and young professionals.',
    marketStats: {
      medianPrice: 780000,
      avgDaysOnMarket: 19,
      activeListings: 22,
      pricePerSqFt: 580,
      yoyPriceChange: 6.8,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Culture',
        name: 'Artistic Community',
        note: 'Home to galleries, artist studios, creative collectives, and street art.',
      },
      {
        category: 'Dining',
        name: 'Trendy Restaurants',
        note: 'Rising dining scene with independent cafes, restaurants, and food vendors.',
      },
      {
        category: 'Lifestyle',
        name: 'Young & Dynamic',
        note: 'Popular with young professionals, entrepreneurs, and creative professionals.',
      },
    ],
    seo: {
      metaTitle: 'Highland Park Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Explore Highland Park, LA\'s emerging creative hub. Learn about homes, lifestyle, and real estate opportunities.',
      noIndex: false,
    },
  },
]

const soldProperties = [
  {
    _type: 'property',
    address: '4225 Via Arbolada #500',
    slug: { current: '4225-via-arbolada-500' },
    status: 'sold',
    soldDate: '2024-02-15',
    soldPrice: 1250000,
    beds: 2,
    baths: 2,
    sqft: 1200,
    propertyType: 'Condo',
    description: 'Modern condo in prime location with updated finishes and city views.',
    features: ['Modern Kitchen', 'Hardwood Floors', 'City Views', 'In-Unit Laundry'],
  },
  {
    _type: 'property',
    address: '4528 Don Timoteo Dr',
    slug: { current: '4528-don-timoteo' },
    status: 'sold',
    soldDate: '2023-11-22',
    soldPrice: 2100000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    propertyType: 'House',
    description: 'Beautiful Spanish colonial revival home with original character and updated systems.',
    features: ['Character Details', 'Mature Landscaping', 'Separate Garage', 'Original Woodwork'],
  },
  {
    _type: 'property',
    address: '21838 Grovepark Drive',
    slug: { current: '21838-grovepark' },
    status: 'sold',
    soldDate: '2023-09-08',
    soldPrice: 1850000,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    propertyType: 'House',
    description: 'Mid-century home with potential for updates in sought-after neighborhood.',
    features: ['Large Lot', 'Mature Trees', 'Potential Development', 'Good Bones'],
  },
]

const blogPosts = [
  {
    _type: 'blogPost',
    title: 'Understanding SB9: A New Opportunity for Homeowners',
    slug: { current: 'understanding-sb9' },
    excerpt: 'California SB9 is changing the real estate landscape for homeowners. Learn how it could benefit you.',
    publishedAt: '2024-03-15T10:00:00Z',
    author: 'Eric Zunkley',
    category: 'Legislation',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'SB9, also known as the Housing Crisis Act, allows homeowners to split single-family properties into two separate properties without rezoning.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'SB9 Legislation Guide - Hello LA Home',
      metaDescription: 'Understanding California SB9 and how it could create opportunities for your property.',
      noIndex: false,
    },
  },
  {
    _type: 'blogPost',
    title: 'Spring Market Update 2024',
    slug: { current: 'spring-market-update-2024' },
    excerpt: 'The LA real estate market is heating up this spring. Here\'s what you need to know.',
    publishedAt: '2024-03-01T10:00:00Z',
    author: 'Eric Zunkley',
    category: 'Market Update',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Spring 2024 shows renewed buyer interest in the Los Angeles market. Inventory is moderate, and we\'re seeing solid transaction activity across most neighborhoods.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Spring 2024 LA Real Estate Market Update',
      metaDescription: 'Current trends in the Los Angeles real estate market for spring 2024.',
      noIndex: false,
    },
  },
]

async function seed() {
  try {
    console.log('🌱 Seeding Sanity data...\n')

    // Create neighborhoods
    console.log('Creating neighborhood guides...')
    for (const neighborhood of neighborhoods) {
      const result = await client.create(neighborhood)
      console.log(`✓ Created: ${result.name}`)
    }

    // Create properties
    console.log('\nCreating sold properties...')
    for (const property of soldProperties) {
      const result = await client.create(property)
      console.log(`✓ Created: ${result.address}`)
    }

    // Create blog posts
    console.log('\nCreating blog posts...')
    for (const post of blogPosts) {
      const result = await client.create(post)
      console.log(`✓ Created: ${result.title}`)
    }

    console.log('\n✅ Seeding complete!')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seed()
