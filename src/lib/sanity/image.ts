import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'
import type { ImageLoaderProps } from 'next/image'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Routes Sanity images through Sanity's own CDN transformations instead of
// Vercel's image optimizer, avoiding the monthly transformation quota entirely.
// Non-Sanity URLs (public fallback photos) pass through to Vercel's optimizer.
export function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.startsWith('https://cdn.sanity.io')) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`
  }
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality ?? 75))
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  return url.toString()
}
