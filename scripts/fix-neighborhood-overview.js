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

function convertStringToBlockArray(text) {
  if (!text) return []
  if (Array.isArray(text)) return text

  return [
    {
      _type: 'block',
      _key: Math.random().toString(36).substr(2, 9),
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: text,
          marks: [],
        },
      ],
    },
  ]
}

async function fixNeighborhoodOverview() {
  try {
    const allNeighborhoods = await client.fetch(
      `*[_type == "neighborhoodGuide"]`
    )

    const neighborhoods = allNeighborhoods.filter(
      (ng) => typeof ng.overview === 'string'
    )

    console.log(
      `Found ${neighborhoods.length} neighborhood guides with string overview fields`
    )

    for (const neighborhood of neighborhoods) {
      const blockArray = convertStringToBlockArray(neighborhood.overview)

      await client
        .patch(neighborhood._id)
        .set({ overview: blockArray })
        .commit()

      console.log(`✓ Fixed overview for: ${neighborhood.name}`)
    }

    console.log('\nAll overview fields fixed!')
  } catch (error) {
    console.error('Error fixing neighborhood overview:', error.message)
    process.exit(1)
  }
}

fixNeighborhoodOverview()
