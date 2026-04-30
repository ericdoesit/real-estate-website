const fs = require('fs')
const path = require('path')
const { createClient } = require('@sanity/client')

// Load environment variables
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables:')
  console.error(`- NEXT_PUBLIC_SANITY_PROJECT_ID: ${projectId ? '✓' : '✗'}`)
  console.error(`- NEXT_PUBLIC_SANITY_DATASET: ${dataset ? '✓' : '✗'}`)
  console.error(`- SANITY_API_TOKEN: ${token ? '✓' : '✗'}`)
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-01-01',
})

const propertyData = require('../../property-data.json')
const imageBaseDir = path.join(__dirname, '../../property-images')

async function uploadImage(imagePath) {
  try {
    const fullPath = path.join(imageBaseDir, imagePath)
    if (!fs.existsSync(fullPath)) {
      console.warn(`Image not found: ${fullPath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: `Property image - ${imagePath}`,
    }
  } catch (error) {
    console.error(`Failed to upload image ${imagePath}:`, error.message)
    return null
  }
}

async function createProperty(property) {
  try {
    // Upload hero image (first image)
    let heroImage = null
    let gallery = []

    if (property.images && property.images.length > 0) {
      // Upload all images
      for (let i = 0; i < property.images.length; i++) {
        const uploadedImage = await uploadImage(property.images[i])
        if (uploadedImage) {
          if (i === 0) {
            heroImage = uploadedImage
          }
          gallery.push(uploadedImage)
        }
      }
    }

    const doc = {
      _type: 'property',
      address: property.address,
      slug: {
        _type: 'slug',
        current: property.slug,
      },
      status: property.status,
      soldPrice: property.soldPrice,
      soldDate: property.soldDate,
      beds: property.beds,
      baths: property.baths,
      sqft: property.sqft,
      propertyType: property.propertyType,
      description: property.description
        ? [
            {
              _type: 'block',
              _key: 'block-0',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: property.description,
                  marks: [],
                },
              ],
            },
          ]
        : undefined,
      features: property.features,
      isFeatured: property.isFeatured,
      heroImage: heroImage,
      gallery: gallery.length > 0 ? gallery : undefined,
    }

    const created = await client.create(doc)
    console.log(`✓ Created property: ${property.address} (${created._id})`)
    return created
  } catch (error) {
    console.error(`✗ Failed to create property ${property.address}:`, error.message)
    return null
  }
}

async function importProperties() {
  console.log('Starting property import...')
  console.log(`Found ${propertyData.length} properties to import`)

  for (const property of propertyData) {
    await createProperty(property)
    // Small delay between uploads to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  console.log('Import complete!')
}

importProperties().catch(console.error)
