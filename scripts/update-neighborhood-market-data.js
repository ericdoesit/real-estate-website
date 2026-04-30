const { createClient } = require('@sanity/client')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

const RENTCAST_API_KEY = process.env.RENTCAST_API_KEY
const RENTCAST_API_BASE = 'https://api.rentcast.io/v1'

if (!RENTCAST_API_KEY) {
  console.error('Error: RENTCAST_API_KEY not found in .env.local')
  console.error('Get your free API key at https://www.rentcast.io/api')
  process.exit(1)
}

// Map of neighborhood names to their approximate zip codes (you may need to adjust these)
const NEIGHBORHOOD_ZIPS = {
  'Atwater Village': '90039',
  'Beverly Grove': '90036',
  'Culver City': '90230',
  'Echo Park': '90026',
  'Glassell Park': '90065',
  'Hancock Park': '90020',
  'Koreatown': '90004',
  'Larchmont': '90004', // Near Koreatown
  'Los Feliz': '90027',
  'Miracle Mile': '90036',
  'Montecito Heights': '90031',
  'Palms': '90034',
  'Picfair Village': '90036',
}

async function getMarketData(zipCode) {
  try {
    const url = `${RENTCAST_API_BASE}/markets?zipCode=${zipCode}`
    const response = await fetch(url, {
      headers: {
        'X-API-Key': RENTCAST_API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error(`RentCast API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Failed to fetch market data for ${zipCode}:`, error.message)
    return null
  }
}


async function updateNeighborhoodMarketData() {
  try {
    console.log('Fetching latest market data from RentCast...\n')

    const neighborhoods = await sanityClient.fetch(
      `*[_type == "neighborhoodGuide"] | order(name)`
    )

    for (const neighborhood of neighborhoods) {
      const zipCode = NEIGHBORHOOD_ZIPS[neighborhood.name]

      if (!zipCode) {
        console.warn(`⚠ No zip code mapping for ${neighborhood.name}, skipping`)
        continue
      }

      const marketData = await getMarketData(zipCode)

      if (!marketData) {
        console.warn(`⚠ Failed to fetch data for ${neighborhood.name}`)
        continue
      }

      // Extract relevant fields from RentCast response
      const updates = {
        marketStats: {
          medianPrice: marketData.medianSalePrice || neighborhood.marketStats?.medianPrice,
          avgDaysOnMarket:
            marketData.averageDaysOnMarket || neighborhood.marketStats?.avgDaysOnMarket,
          activeListings: marketData.totalListings || neighborhood.marketStats?.activeListings,
          pricePerSqFt: marketData.pricePerSquareFoot || neighborhood.marketStats?.pricePerSqFt,
          // For YoY change: compare with previous quarter's data if available
          // This stores the current price for next quarter's calculation
          lastUpdated: new Date().toISOString(),
        },
      }


      // Update in Sanity
      await sanityClient
        .patch(neighborhood._id)
        .set(updates)
        .commit()

      console.log(`✓ Updated ${neighborhood.name}`)
      console.log(
        `  Median: $${updates.marketStats.medianPrice?.toLocaleString() || 'N/A'} | Days on Market: ${updates.marketStats.avgDaysOnMarket || 'N/A'} | Listings: ${updates.marketStats.activeListings || 'N/A'}`
      )
    }

    console.log('\n✓ Market data update complete!')
  } catch (error) {
    console.error('Error updating market data:', error.message)
    process.exit(1)
  }
}

updateNeighborhoodMarketData()
