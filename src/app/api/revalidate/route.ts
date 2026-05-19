import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (!secret) {
    return new Response('Missing SANITY_REVALIDATE_SECRET', { status: 500 })
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const body = await request.json()
    const docType = body._type

    if (docType === 'neighborhoodGuide') {
      revalidatePath('/')
      revalidatePath('/local-guide')
      revalidatePath('/local-guide/[slug]', 'page')
    }

    if (docType === 'property') {
      revalidatePath('/properties')
      revalidatePath('/properties/[id]', 'page')
    }

    if (docType === 'blogPost') {
      revalidatePath('/blog')
      revalidatePath('/blog/[slug]', 'page')
    }

    return new Response(JSON.stringify({ revalidated: true }), { status: 200 })
  } catch {
    return new Response('Failed to revalidate', { status: 500 })
  }
}
