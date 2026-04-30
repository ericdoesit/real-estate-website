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

async function removeDuplicateNeighborhoods() {
  try {
    const neighborhoods = await client.fetch(
      `*[_type == "neighborhoodGuide"] | order(name)`
    )

    const grouped = {}
    neighborhoods.forEach((ng) => {
      if (!grouped[ng.name]) {
        grouped[ng.name] = []
      }
      grouped[ng.name].push(ng)
    })

    const toDelete = []
    let totalDeleted = 0

    Object.entries(grouped).forEach(([name, docs]) => {
      if (docs.length > 1) {
        console.log(`${name}: Found ${docs.length} copies, keeping first, deleting ${docs.length - 1}`)
        // Keep first, delete rest
        for (let i = 1; i < docs.length; i++) {
          toDelete.push(docs[i]._id)
          totalDeleted++
        }
      }
    })

    if (toDelete.length === 0) {
      console.log('No duplicates to delete')
      return
    }

    console.log(`\nDeleting ${totalDeleted} duplicate documents...`)

    for (const id of toDelete) {
      await client.delete(id)
    }

    console.log(`✓ Deleted ${totalDeleted} duplicate neighborhood guides`)
  } catch (error) {
    console.error('Error removing duplicates:', error.message)
    process.exit(1)
  }
}

removeDuplicateNeighborhoods()
