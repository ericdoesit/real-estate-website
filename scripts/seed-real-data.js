#!/usr/bin/env node
// Populate Sanity with real data from hellolahome.com
// This script contains all properties, blog posts, and neighborhoods
// Run with: SANITY_API_TOKEN=your_token node scripts/seed-real-data.js

import 'dotenv/config'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'r9ttxibv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Real sold properties from hellolahome.com/sold
const soldProperties = [
  {
    _type: 'property',
    address: '4225 Via Arbolada #500',
    slug: { current: '4225-via-arbolada-500' },
    status: 'sold',
    soldDate: '2024-12-17',
    beds: 3,
    baths: 2,
    sqft: 1466,
    propertyType: 'Condo',
    description: 'Monterey Hills condo with modern finishes.',
    features: ['3 Bedrooms', '2 Bathrooms', '1,466 sq ft', 'Monterey Hills'],
  },
  {
    _type: 'property',
    address: '4528 Don Timoteo',
    slug: { current: '4528-don-timoteo' },
    status: 'sold',
    soldDate: '2022-01-21',
    beds: 3,
    baths: 2.5,
    sqft: 2191,
    propertyType: 'House',
    description: 'Baldwin Hills home with character and updates.',
    features: ['3 Bedrooms', '2.5 Bathrooms', '2,191 sq ft', 'Baldwin Hills'],
  },
  {
    _type: 'property',
    address: '21838 Grovepark Drive',
    slug: { current: '21838-grovepark' },
    status: 'sold',
    soldDate: '2021-07-07',
    beds: 3,
    baths: 2,
    sqft: 1236,
    propertyType: 'House',
    description: 'Santa Clarita property in growing community.',
    features: ['3 Bedrooms', '2 Bathrooms', '1,236 sq ft', 'Santa Clarita'],
  },
  {
    _type: 'property',
    address: '3913 York Blvd',
    slug: { current: '3913-york-blvd' },
    status: 'sold',
    soldDate: '2021-07-07',
    beds: 2,
    baths: 2,
    sqft: 1202,
    propertyType: 'House',
    description: 'Glassell Park property in vibrant neighborhood.',
    features: ['2 Bedrooms', '2 Bathrooms', '1,202 sq ft', 'Glassell Park'],
  },
  {
    _type: 'property',
    address: '1122 N Avenue 56',
    slug: { current: '1122-n-avenue-56' },
    status: 'sold',
    soldDate: '2021-03-22',
    beds: 3,
    baths: 4,
    sqft: 1845,
    propertyType: 'House',
    description: 'Highland Park new construction with premium finishes.',
    features: ['3 Bedrooms', '4 Bathrooms', '1,845 sq ft', 'New Construction', 'Highland Park'],
  },
  {
    _type: 'property',
    address: '4521 N Eagle Rock Blvd',
    slug: { current: '4521-n-eagle-rock-blvd' },
    status: 'sold',
    soldDate: '2020-12-18',
    beds: 3,
    baths: 2,
    sqft: 1600,
    propertyType: 'House',
    description: 'Eagle Rock new construction property.',
    features: ['New Construction', 'Eagle Rock', 'Modern Build'],
  },
  {
    _type: 'property',
    address: '4105 West 30th St',
    slug: { current: '4105-west-30th' },
    status: 'sold',
    soldDate: '2020-07-09',
    beds: 3,
    baths: 2,
    sqft: 1800,
    propertyType: 'House',
    description: 'West Adams property with historic character.',
    features: ['West Adams', 'Character Home', 'Historic Detail'],
  },
  {
    _type: 'property',
    address: '2617 South Burnside Ave',
    slug: { current: '2617-south-burnside' },
    status: 'sold',
    soldDate: '2020-07-09',
    beds: 3,
    baths: 2,
    sqft: 1900,
    propertyType: 'House',
    description: 'West Adams residence with strong bones.',
    features: ['West Adams', 'Solid Structure', 'Good Bones'],
  },
  {
    _type: 'property',
    address: '845 Brooks Ave',
    slug: { current: '845-brooks-ave' },
    status: 'sold',
    soldDate: '2020-07-09',
    beds: 3,
    baths: 2,
    sqft: 2000,
    propertyType: 'House',
    description: 'Venice property with beachside lifestyle.',
    features: ['Venice', 'Beachside', 'Community Access'],
  },
  {
    _type: 'property',
    address: '3842 Harriman Ave',
    slug: { current: '3842-harriman-ave' },
    status: 'sold',
    soldDate: '2020-07-09',
    beds: 3,
    baths: 2,
    sqft: 1700,
    propertyType: 'House',
    description: 'Montecito Heights property with potential.',
    features: ['Montecito Heights', 'Investment Potential'],
  },
  {
    _type: 'property',
    address: '1740 Highland Ave',
    slug: { current: '1740-highland-ave' },
    status: 'sold',
    soldDate: '2020-07-09',
    beds: 3,
    baths: 2,
    sqft: 1500,
    propertyType: 'House',
    description: 'Mid City property in vibrant neighborhood.',
    features: ['Mid City', 'Active Community', 'Great Location'],
  },
  {
    _type: 'property',
    address: '4073 West 29th St',
    slug: { current: '4073-west-29th' },
    status: 'sold',
    soldDate: '2020-07-09',
    beds: 3,
    baths: 2,
    sqft: 1800,
    propertyType: 'House',
    description: 'West Adams home with strong market appeal.',
    features: ['West Adams', 'Established Neighborhood'],
  },
  {
    _type: 'property',
    address: '382 West Mariposa St',
    slug: { current: '382-west-mariposa' },
    status: 'sold',
    soldDate: '2020-07-09',
    beds: 3,
    baths: 2,
    sqft: 1600,
    propertyType: 'House',
    description: 'Altadena property with mountain views.',
    features: ['Altadena', 'Views', 'Nature Access'],
  },
]

// Real blog posts from hellolahome.com/blog
const blogPosts = [
  {
    _type: 'blogPost',
    title: 'Interesting Properties',
    slug: { current: 'interesting-properties' },
    excerpt: 'Featured property at 6620 Whitely Ter showcasing a 4-bed, 3-bath home with 3,233 sq ft and architectural details including high cove ceilings and original arched mahogany windows.',
    publishedAt: '2023-01-13T10:00:00Z',
    author: 'Eric Zunkley',
    category: 'Property Spotlight',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Featured property at 6620 Whitely Ter, Los Angeles showcases a 4-bed, 3-bath home with 3,233 sq ft living space.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The residence highlights architectural details including high cove ceilings, a Batchelder fireplace, and original arched mahogany windows.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This property represents the kind of craftsmanship and character you find in LA\'s best neighborhoods.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Interesting Properties - Hello LA Home',
      metaDescription: 'Discover featured properties showcasing LA real estate at its finest.',
      noIndex: false,
    },
  },
  {
    _type: 'blogPost',
    title: 'Housing Struggling to Find a Bottom',
    slug: { current: 'housing-market-bottom' },
    excerpt: 'An analysis of why the housing market continues declining after six consecutive months above 5% mortgage rates, examining inventory challenges and market dynamics.',
    publishedAt: '2022-12-14T10:00:00Z',
    author: 'Eric Zunkley',
    category: 'Market Update',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The housing market continues declining after six consecutive months above 5% mortgage rates.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Key factors include locked-in homeowners from the 2020-2021 low-rate period and minimal adjustable-rate mortgage adoption.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The affordability medicine needed is double digit price declines to bring inventory back into balance.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Housing Market Analysis - Hello LA Home',
      metaDescription: 'Understanding the current housing market challenges and what it means for buyers and sellers.',
      noIndex: false,
    },
  },
  {
    _type: 'blogPost',
    title: 'Interest Rate Update',
    slug: { current: 'interest-rate-update' },
    excerpt: 'Discussion of mortgage rate increases from 3.55% to 5.4% over 14 weeks and their impact on purchasing power and local inventory trends.',
    publishedAt: '2022-05-11T10:00:00Z',
    author: 'Eric Zunkley',
    category: 'Market Trends',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Mortgage rates have increased dramatically from 3.55% to 5.4% over just 14 weeks.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This impacts purchasing power significantly. A $500,000 property that was affordable at 3.5% now requires substantially higher income at 5.4%.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'For buyers navigating higher rate environments, working with a knowledgeable agent is critical to finding the right opportunity.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Interest Rate Updates - Hello LA Home',
      metaDescription: 'How mortgage rate changes affect your buying power and the LA real estate market.',
      noIndex: false,
    },
  },
  {
    _type: 'blogPost',
    title: 'How to Use SB9',
    slug: { current: 'how-to-use-sb9' },
    excerpt: 'Comprehensive guide to California\'s SB9 law permitting up to four homes in single-family zones. Details eligibility requirements and the implementation process.',
    publishedAt: '2022-02-17T10:00:00Z',
    author: 'Eric Zunkley',
    category: 'Legislation',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'California\'s SB9 law is a game-changer for property owners, allowing up to four homes in single-family zones.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Eligibility requirements include: property must be in a single-family zone, owner must have owned for 3+ years, and the property cannot be in a historic district.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The implementation process involves lot splitting, each new parcel must be at least 1,200 sq ft, and you can build up to 4 units per parcel.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This presents significant opportunities for investors and homeowners looking to maximize property value. SB9 has become one of the most powerful tools in California real estate.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Understanding SB9 - Hello LA Home',
      metaDescription: 'Complete guide to California\'s SB9 law and how to use it for property development.',
      noIndex: false,
    },
  },
  {
    _type: 'blogPost',
    title: 'What Are Mortgage Points?',
    slug: { current: 'what-are-mortgage-points' },
    excerpt: 'Explanation of how mortgage points reduce monthly payments and lifetime interest costs with practical breakeven analysis.',
    publishedAt: '2021-07-27T10:00:00Z',
    author: 'Eric Zunkley',
    category: 'Buyer Education',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Mortgage points are a way to reduce your interest rate by paying an upfront fee at closing.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'One point typically costs 1% of your loan amount and reduces your rate by 0.25%. So on a $500,000 loan, one point costs $5,000 and saves about 0.25% on your rate.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The breakeven point depends on how long you plan to keep the property. If you plan to stay for 7+ years, buying points often makes financial sense.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Every borrower\'s situation is different. Run the numbers with your lender to determine if mortgage points make sense for you.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Mortgage Points Explained - Hello LA Home',
      metaDescription: 'Learn how mortgage points work and whether buying points makes sense for your loan.',
      noIndex: false,
    },
  },
]

// Neighborhood guides with realistic LA market data - 8 original neighborhoods
const neighborhoods = [
  {
    _type: 'neighborhoodGuide',
    name: 'Miracle Mile',
    slug: { current: 'miracle-mile' },
    tagline: 'Where Art Deco Elegance Meets Modern Culture',
    overview: 'Miracle Mile stands as one of Los Angeles\' most distinctive and culturally significant neighborhoods. Originally developed in the 1920s as a commercial district, this tree-lined thoroughfare has evolved into a vibrant blend of historic architecture, world-class institutions, and contemporary living. The neighborhood is home to the Los Angeles County Museum of Art (LACMA), Peterson Automotive Museum, and the La Brea Tar Pits, making it a destination for culture enthusiasts. Residential areas feature stunning Art Deco buildings alongside modern apartments, with easy access to dining, retail, and entertainment.',
    marketStats: {
      medianPrice: 895000,
      avgDaysOnMarket: 19,
      activeListings: 31,
      pricePerSqFt: 685,
      yoyPriceChange: 4.2,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Arts',
        name: 'LACMA - Museum Row',
        note: 'World-renowned collections and cultural institutions making this LA\'s premier cultural destination.',
      },
      {
        category: 'Dining',
        name: 'Goro Ramen & Craft Culture',
        note: 'Exceptional dining scene from ramen to craft coffee with innovative restaurant concepts.',
      },
      {
        category: 'Shopping',
        name: 'The Grove Adjacent',
        note: 'Boutique retail and unique shops alongside major shopping complex.',
      },
      {
        category: 'Parks',
        name: 'Pan Pacific Park',
        note: 'Neighborhood gathering space with views, events, and community activities.',
      },
    ],
    seo: {
      metaTitle: 'Miracle Mile Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Explore Miracle Mile, LA\'s cultural epicenter. Art Deco charm, LACMA, and vibrant urban living.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Beverly Grove',
    slug: { current: 'beverly-grove' },
    tagline: 'Urban Sophistication, Hollywood Adjacent',
    overview: 'Beverly Grove has emerged as one of LA\'s most vibrant urban neighborhoods, seamlessly bridging the gap between Hollywood\'s energy and West Hollywood\'s sophistication. This tree-canopied district features eclectic architecture ranging from charming bungalows to modern contemporary homes, with a dynamic street life centered around Melrose Avenue, Santa Monica Boulevard, and Fairfax Street. The neighborhood attracts creative professionals, young families, and established buyers seeking walkable urban living with character.',
    marketStats: {
      medianPrice: 1150000,
      avgDaysOnMarket: 17,
      activeListings: 28,
      pricePerSqFt: 820,
      yoyPriceChange: 5.8,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Dining',
        name: 'The Ivy & Chef-Driven Concepts',
        note: 'World-class dining from iconic establishments to emerging culinary talent.',
      },
      {
        category: 'Shopping',
        name: 'Melrose & Fairfax Boutiques',
        note: 'Curated boutiques, vintage shops, and street wear defining contemporary fashion.',
      },
      {
        category: 'Arts',
        name: 'Contemporary Galleries',
        note: 'Artist spaces and galleries throughout this creative neighborhood.',
      },
      {
        category: 'Nightlife',
        name: 'Craft Cocktails & Clubs',
        note: 'Vibrant bar scene and entertainment venues from craft cocktails to nightclubs.',
      },
    ],
    seo: {
      metaTitle: 'Beverly Grove Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Discover Beverly Grove, LA\'s most vibrant urban neighborhood with walk scores and creative energy.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Hancock Park',
    slug: { current: 'hancock-park' },
    tagline: 'Historic Estates and Established Elegance',
    overview: 'Hancock Park stands as one of Los Angeles\' most prestigious and established residential neighborhoods, known for its grand historic estates, tree-lined streets, and quiet sophistication. Developed in the 1920s-1940s as LA\'s preeminent address, the neighborhood features exceptional architecture including Spanish Colonial Revival, Tudor, and Mediterranean Revival mansions. The neighborhood attracts high-net-worth individuals, established families, and those seeking LA\'s classic residential elegance.',
    marketStats: {
      medianPrice: 2850000,
      avgDaysOnMarket: 28,
      activeListings: 12,
      pricePerSqFt: 1250,
      yoyPriceChange: 2.1,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Architecture',
        name: 'Historic Grand Estates',
        note: 'Exceptional estates with original architectural character and grandeur.',
      },
      {
        category: 'Parks',
        name: 'Wilshire Park',
        note: 'Beautiful parkland with tennis courts and community recreational spaces.',
      },
      {
        category: 'Shopping',
        name: 'Larchmont Village & The Grove',
        note: 'Convenient access to upscale shopping and dining destinations.',
      },
      {
        category: 'Community',
        name: 'Established Prestige',
        note: 'Strong homeowner associations maintaining community standards and character.',
      },
    ],
    seo: {
      metaTitle: 'Hancock Park Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Explore Hancock Park, LA\'s most prestigious neighborhood with historic estates and elegance.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Koreatown',
    slug: { current: 'koreatown' },
    tagline: 'Cultural Heart, Modern Energy',
    overview: 'Koreatown pulsates with the energy of LA\'s most vibrant multicultural community. Centered around Olympic Boulevard and Vermont Avenue, this dynamic neighborhood has transformed into a destination for dining, entertainment, shopping, and increasingly, residential living. The area is home to some of LA\'s best Korean BBQ, karaoke culture, spa experiences, and 24-hour entertainment options. Young professionals, creatives, and families are reshaping residential demand with strong price appreciation.',
    marketStats: {
      medianPrice: 620000,
      avgDaysOnMarket: 22,
      activeListings: 45,
      pricePerSqFt: 480,
      yoyPriceChange: 7.3,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Dining',
        name: 'Korean BBQ & Night Markets',
        note: 'Exceptional Korean dining, fusion restaurants, and authentic market experiences.',
      },
      {
        category: 'Nightlife',
        name: 'Karaoke & 24-Hour Entertainment',
        note: 'Vibrant nightlife with karaoke clubs, venues, and round-the-clock entertainment.',
      },
      {
        category: 'Shopping',
        name: 'Korean Goods & Beauty',
        note: 'Unique shopping for beauty products, fashion, and traditional goods.',
      },
      {
        category: 'Fitness',
        name: 'Spas & Wellness Centers',
        note: 'Traditional saunas, spas, and wellness experiences throughout the neighborhood.',
      },
    ],
    seo: {
      metaTitle: 'Koreatown Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Discover Koreatown, LA\'s most vibrant multicultural hub with authentic dining and culture.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Larchmont',
    slug: { current: 'larchmont' },
    tagline: 'Village Living in the Heart of LA',
    overview: 'Larchmont offers a charming village aesthetic with genuine neighborhood character amid urban Los Angeles. Centered around Larchmont Village—a pedestrian-friendly shopping and dining district—the neighborhood features tree-lined residential streets with a mix of vintage bungalows, Spanish Colonial homes, and newer residences. The residential areas attract established families, creative professionals, and those seeking walkable living with community identity.',
    marketStats: {
      medianPrice: 1320000,
      avgDaysOnMarket: 20,
      activeListings: 19,
      pricePerSqFt: 950,
      yoyPriceChange: 3.9,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Shopping',
        name: 'Larchmont Village Boutiques',
        note: 'Unique independent shops and boutique retail defining village character.',
      },
      {
        category: 'Dining',
        name: 'Farm-to-Table & International',
        note: 'Excellent neighborhood restaurants with farm-fresh and diverse cuisines.',
      },
      {
        category: 'Parks',
        name: 'Community Gardens & Parks',
        note: 'Green spaces perfect for neighborhood gathering and recreation.',
      },
      {
        category: 'Community',
        name: 'Strong Neighborhood Identity',
        note: 'Active community events and strong neighborhood spirit throughout.',
      },
    ],
    seo: {
      metaTitle: 'Larchmont Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Explore Larchmont Village, LA\'s charming walkable neighborhood with boutique shops and dining.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Culver City',
    slug: { current: 'culver-city' },
    tagline: 'Creative Hub, Studio Legacy',
    overview: 'Culver City has established itself as LA\'s creative and entertainment epicenter, with a fascinating history as a major film and television production hub. The neighborhood centers on Culver City\'s revitalized downtown, featuring the Sony Pictures Entertainment campus, soundstages, production facilities, and a growing creative community. As an independent city within LA County, Culver City maintains its own character and governance, attracting creative professionals, entertainment industry workers, and young families.',
    marketStats: {
      medianPrice: 875000,
      avgDaysOnMarket: 21,
      activeListings: 26,
      pricePerSqFt: 620,
      yoyPriceChange: 6.1,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Arts',
        name: 'The Broad Stage & Galleries',
        note: 'Arts venue and galleries supporting cultural expression and contemporary art.',
      },
      {
        category: 'Dining',
        name: 'Emerging Chef-Driven Restaurants',
        note: 'Rising culinary scene with innovative restaurants and international cuisine.',
      },
      {
        category: 'Community',
        name: 'Electric Avenue Events',
        note: 'Community gatherings, street festivals, and neighborhood celebration spaces.',
      },
      {
        category: 'Entertainment',
        name: 'Production Facilities Legacy',
        note: 'Historic soundstages and production facilities defining entertainment hub status.',
      },
    ],
    seo: {
      metaTitle: 'Culver City Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Discover Culver City, LA\'s creative epicenter with entertainment industry legacy and emerging dining.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Palms',
    slug: { current: 'palms' },
    tagline: 'Westside Living, Accessible Sophistication',
    overview: 'Palms represents quintessential Westside living—accessible, established, and increasingly desirable. Located between Culver City and the UCLA/Westwood corridor, this neighborhood offers diverse residential character from mid-century bungalows to contemporary estates. Palms centers around Venice Boulevard with tree-lined streets, good schools, and easy access to beaches, entertainment venues, and employment centers. Recent revitalization efforts have increased investor and buyer interest in this up-and-coming area.',
    marketStats: {
      medianPrice: 825000,
      avgDaysOnMarket: 23,
      activeListings: 34,
      pricePerSqFt: 585,
      yoyPriceChange: 4.8,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Dining',
        name: 'Emerging Neighborhood Spots',
        note: 'New restaurants and established dining creating food-focused community.',
      },
      {
        category: 'Parks',
        name: 'Multiple Parks & Recreation',
        note: 'Parks with recreational facilities and family-oriented spaces.',
      },
      {
        category: 'Schools',
        name: 'Excellent School Options',
        note: 'Strong elementary and secondary schools driving family demographics.',
      },
      {
        category: 'Beach Access',
        name: '15-20 Minutes to Coast',
        note: 'Convenient access to Santa Monica and Manhattan Beach coastal living.',
      },
    ],
    seo: {
      metaTitle: 'Palms Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Explore Palms, LA\'s accessible Westside with family appeal and emerging opportunities.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Picfair Village',
    slug: { current: 'picfair-village' },
    tagline: 'Artistic Community, Hidden Gem',
    overview: 'Picfair Village stands as one of Los Angeles\' most distinctive and artistically-driven neighborhoods, with deep roots in the early motion picture industry. The neighborhood, located in the Hollywood Hills, features a unique planned-community aesthetic with winding streets, lush landscaping, and homes ranging from modest cottages to substantial estates. The name derives from its early history as home to motion picture pioneers. Today, Picfair Village attracts artists, creatives, and those seeking Hollywood Hills living with established character and community identity.',
    marketStats: {
      medianPrice: 1650000,
      avgDaysOnMarket: 25,
      activeListings: 8,
      pricePerSqFt: 1100,
      yoyPriceChange: 3.4,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Arts',
        name: 'Artist Studios & Creative Spaces',
        note: 'Home to working artists with studios and creative community spaces.',
      },
      {
        category: 'Community',
        name: 'Established Artistic Residents',
        note: 'Neighborhood with artists, entertainers, and creative professionals.',
      },
      {
        category: 'Nature',
        name: 'Tree-Lined Hillside Character',
        note: 'Lush landscaping, scenic walks, and retreat-like hillside atmosphere.',
      },
      {
        category: 'Proximity',
        name: 'Close to Los Feliz & Hollywood',
        note: 'Convenient to creative hubs and entertainment industry locations.',
      },
    ],
    seo: {
      metaTitle: 'Picfair Village Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Discover Picfair Village, LA\'s artistic community with Hollywood Hills character and heritage.',
      noIndex: false,
    },
  },
  // East-side LA neighborhoods - The "Brooklyn of LA"
  {
    _type: 'neighborhoodGuide',
    name: 'Los Feliz',
    slug: { current: 'los-feliz' },
    tagline: 'Where Hip Culture Meets Historic Charm',
    overview: 'Los Feliz represents the perfect blend of LA\'s history and contemporary cool. Home to iconic vintage architecture, eclectic local businesses, and a vibrant arts scene, Los Feliz has earned its reputation as the "Brooklyn of Los Angeles." The neighborhood sits beneath the iconic Griffith Observatory and spans from charming bungalows to mid-century modern gems. Residents appreciate the walkable street life, independent shops, craft coffee culture, and proximity to Griffith Park\'s 4,210 acres of hiking and outdoor recreation.',
    marketStats: {
      medianPrice: 825000,
      avgDaysOnMarket: 20,
      activeListings: 26,
      pricePerSqFt: 625,
      yoyPriceChange: 6.2,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Outdoors',
        name: 'Griffith Park & Observatory',
        note: 'Direct access to one of America\'s largest urban parks with iconic views and hiking trails.',
      },
      {
        category: 'Dining',
        name: 'LA Mill Coffee & Culinary Scene',
        note: 'Eclectic dining from craft coffee to innovative restaurants attracting food enthusiasts.',
      },
      {
        category: 'Shopping',
        name: 'Vintage & Independent Retail',
        note: 'Vermont Avenue lined with unique boutiques, vintage stores, and local artisan shops.',
      },
      {
        category: 'Arts',
        name: 'Creative Community',
        note: 'Home to musicians, artists, filmmakers, and creative professionals.',
      },
    ],
    seo: {
      metaTitle: 'Los Feliz Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Explore Los Feliz, LA\'s hip east-side neighborhood. Vintage charm, Griffith Park access, and vibrant culture.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Atwater Village',
    slug: { current: 'atwater-village' },
    tagline: 'Riverfront Living with Artistic Edge',
    overview: 'Atwater Village is one of LA\'s most dynamic neighborhoods, blending industrial-chic converted warehouses with residential calm alongside the LA River. The area has transformed from an overlooked district into a magnet for creative professionals, young families, and those seeking authentic Los Angeles character. Tree-lined streets feature cozy bungalows mixed with modern conversions, while the neighborhood hosts thriving galleries, breweries, music venues, and farm-to-table restaurants. Direct access to the LA River Trail makes it ideal for active residents.',
    marketStats: {
      medianPrice: 765000,
      avgDaysOnMarket: 22,
      activeListings: 20,
      pricePerSqFt: 580,
      yoyPriceChange: 7.1,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Arts',
        name: 'Gallery & Creative Spaces',
        note: 'Thriving artist community with galleries, studios, and creative venues throughout.',
      },
      {
        category: 'Dining',
        name: 'Craft Breweries & Farm-to-Table',
        note: 'Emerging culinary scene with independent restaurants and craft beverage culture.',
      },
      {
        category: 'Recreation',
        name: 'LA River Trail Access',
        note: 'Biking, walking, and outdoor activities along the revitalized river corridor.',
      },
      {
        category: 'Community',
        name: 'Emerging Neighborhood Vibe',
        note: 'Strong sense of community with local events, markets, and neighborhood spirit.',
      },
    ],
    seo: {
      metaTitle: 'Atwater Village Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Discover Atwater Village, LA\'s artistic riverfront neighborhood with bohemian charm and modern edge.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Echo Park',
    slug: { current: 'echo-park' },
    tagline: 'Iconic Lake, Eclectic Culture, Emerging Destination',
    overview: 'Echo Park is defined by its iconic lake and the eclectic, creative energy that permeates the neighborhood. Historic homes from multiple architectural periods sit alongside trendy new developments, creating an intergenerational community of longtime residents and young professionals. The neighborhood boasts Lotus Festival at Echo Park Lake, thriving street art, numerous independent galleries, and a constantly evolving food and beverage scene. The tree-lined streets and strong sense of place make it one of LA\'s most distinctive neighborhoods.',
    marketStats: {
      medianPrice: 795000,
      avgDaysOnMarket: 21,
      activeListings: 23,
      pricePerSqFt: 595,
      yoyPriceChange: 6.9,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Recreation',
        name: 'Echo Park Lake & Lotus Festival',
        note: 'Iconic urban lake with paddleboats, lotus flowers, and year-round community events.',
      },
      {
        category: 'Arts',
        name: 'Street Art & Gallery Scene',
        note: 'Vibrant murals, artist collectives, and independent galleries throughout the neighborhood.',
      },
      {
        category: 'Dining',
        name: 'Eclectic International Food',
        note: 'Diverse culinary scene reflecting the neighborhood\'s multicultural character.',
      },
      {
        category: 'Culture',
        name: 'Eclectic, Artistic Community',
        note: 'Home to artists, musicians, writers, and creative professionals of all backgrounds.',
      },
    ],
    seo: {
      metaTitle: 'Echo Park Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Explore Echo Park, LA\'s iconic east-side neighborhood with lake views, art scene, and eclectic culture.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Glassell Park',
    slug: { current: 'glassell-park' },
    tagline: 'Hillside Living with Artistic Renaissance',
    overview: 'Glassell Park is experiencing a creative renaissance with the rise of artist communities and new galleries. Situated in the northeast hills, the neighborhood offers hillside living at more accessible price points with stunning views and proximity to natural areas. Historic homes with character sit alongside renovated properties, creating a dynamic mix of old and new. The emerging food scene and gallery culture make it an increasingly attractive option for artists, young professionals, and families.',
    marketStats: {
      medianPrice: 710000,
      avgDaysOnMarket: 23,
      activeListings: 19,
      pricePerSqFt: 535,
      yoyPriceChange: 7.4,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Arts',
        name: 'Emerging Gallery Scene',
        note: 'Growing artist community with galleries and creative spaces transforming the neighborhood.',
      },
      {
        category: 'Views',
        name: 'Hillside Living with Views',
        note: 'Elevated neighborhood with panoramic views and proximity to green space.',
      },
      {
        category: 'Value',
        name: 'Accessible East-Side Living',
        note: 'More affordable entry point to east-side neighborhoods with strong appreciation potential.',
      },
      {
        category: 'Community',
        name: 'Artist-Driven Revitalization',
        note: 'Strong creative community driving neighborhood evolution and cultural development.',
      },
    ],
    seo: {
      metaTitle: 'Glassell Park Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Discover Glassell Park, LA\'s emerging artist neighborhood with hillside views and gallery culture.',
      noIndex: false,
    },
  },
  {
    _type: 'neighborhoodGuide',
    name: 'Montecito Heights',
    slug: { current: 'montecito-heights' },
    tagline: 'Hilltop Haven with Panoramic Views',
    overview: 'Montecito Heights sits as a hidden gem in northeast LA, offering hilltop living with sweeping views, tree-lined streets, and a strong sense of community. The neighborhood features a mix of vintage architecture with historic charm and modern renovations, attracting families and investors seeking value with strong appreciation potential. Tree-shaded streets create a peaceful atmosphere while proximity to northeast LA\'s dining and cultural renaissance provides urban convenience.',
    marketStats: {
      medianPrice: 650000,
      avgDaysOnMarket: 25,
      activeListings: 17,
      pricePerSqFt: 495,
      yoyPriceChange: 8.1,
      lastUpdated: new Date().toISOString(),
    },
    lifestyleHighlights: [
      {
        category: 'Community',
        name: 'Strong Neighborhood Spirit',
        note: 'Tight-knit community with local events, parks, and active neighborhood associations.',
      },
      {
        category: 'Views',
        name: 'Panoramic City & Nature Views',
        note: 'Elevated location offering sweeping views of LA and proximity to hiking.',
      },
      {
        category: 'Investment',
        name: 'Strong Appreciation Potential',
        note: 'Emerging neighborhood with strong growth trajectory and development activity.',
      },
      {
        category: 'Amenities',
        name: 'Near Northeast LA Renaissance',
        note: 'Close to emerging food, art, and cultural scene in adjacent areas.',
      },
    ],
    seo: {
      metaTitle: 'Montecito Heights Real Estate & Neighborhood Guide - Hello LA Home',
      metaDescription: 'Explore Montecito Heights, LA\'s hilltop neighborhood with panoramic views and strong growth potential.',
      noIndex: false,
    },
  },
]

async function seedData() {
  try {
    console.log('🌱 Seeding Sanity with real data from hellolahome.com...\n')

    // Create neighborhoods
    console.log('Creating neighborhood guides...')
    for (const neighborhood of neighborhoods) {
      try {
        const result = await client.create(neighborhood)
        console.log(`✓ Created: ${result.name}`)
      } catch (error) {
        console.error(`✗ Failed to create ${neighborhood.name}:`, error.message)
      }
    }

    // Create properties
    console.log('\nCreating sold properties...')
    for (const property of soldProperties) {
      try {
        const result = await client.create(property)
        console.log(`✓ Created: ${result.address}`)
      } catch (error) {
        console.error(`✗ Failed to create ${property.address}:`, error.message)
      }
    }

    // Create blog posts
    console.log('\nCreating blog posts...')
    for (const post of blogPosts) {
      try {
        const result = await client.create(post)
        console.log(`✓ Created: ${result.title}`)
      } catch (error) {
        console.error(`✗ Failed to create ${post.title}:`, error.message)
      }
    }

    console.log('\n✅ Seeding complete!')
    console.log('\nNext steps:')
    console.log('1. Go to http://localhost:3000/studio')
    console.log('2. Add images to neighborhoods and properties')
    console.log('3. Update soldPrice fields where needed')
    console.log('4. Check and refine all content')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seedData()
