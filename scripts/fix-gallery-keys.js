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

async function fixGalleryKeys() {
  try {
    // Get all properties with galleries
    const properties = await client.fetch(
      `*[_type == "property" && gallery != null] { _id, address, gallery }`
    )

    console.log(`Found ${properties.length} properties with galleries`)

    for (const property of properties) {
      if (!property.gallery || property.gallery.length === 0) continue

      const updatedGallery = await Promise.all(
        property.gallery.map(async (item) => {
          if (!item._key) {
            item._key = await generateUniqueKey()
            console.log(`  Added key to image in ${property.address}`)
          }
          return item
        })
      )

      await client
        .patch(property._id)
        .set({ gallery: updatedGallery })
        .commit()

      console.log(`✓ Fixed gallery keys for: ${property.address}`)
    }

    console.log('\nAll gallery keys fixed!')
  } catch (error) {
    console.error('Error fixing gallery keys:', error.message)
    process.exit(1)
  }
}

fixGalleryKeys()
