const { createClient } = require('@sanity/client')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

async function generateUniqueKey() {
  return Math.random().toString(36).substr(2, 9)
}

async function fixLifestyleHighlightKeys() {
  try {
    const neighborhoods = await client.fetch(
      `*[_type == "neighborhoodGuide" && lifestyleHighlights != null]`
    )

    console.log(`Found ${neighborhoods.length} neighborhood guides with lifestyle highlights`)

    for (const neighborhood of neighborhoods) {
      if (!neighborhood.lifestyleHighlights || neighborhood.lifestyleHighlights.length === 0) continue

      const updatedHighlights = await Promise.all(
        neighborhood.lifestyleHighlights.map(async (item) => {
          if (!item._key) {
            item._key = await generateUniqueKey()
            console.log(`  Added key to highlight in ${neighborhood.name}`)
          }
          return item
        })
      )

      await client
        .patch(neighborhood._id)
        .set({ lifestyleHighlights: updatedHighlights })
        .commit()

      console.log(`✓ Fixed lifestyle highlight keys for: ${neighborhood.name}`)
    }

    console.log('\nAll lifestyle highlight keys fixed!')
  } catch (error) {
    console.error('Error fixing lifestyle highlight keys:', error.message)
    process.exit(1)
  }
}

fixLifestyleHighlightKeys()
