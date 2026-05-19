import { serverClient } from '@/lib/sanity/client'
import { FEATURED_REVIEWS_QUERY } from '@/lib/sanity/queries'

export async function GET() {
  try {
    const reviews = await serverClient.fetch(FEATURED_REVIEWS_QUERY)
    return Response.json(reviews)
  } catch (error) {
    return Response.json([], { status: 500 })
  }
}
