import Link from 'next/link'
import { serverClient } from '@/lib/sanity/client'
import { BLOG_POST_BY_SLUG_QUERY } from '@/lib/sanity/queries'

interface BlogPost {
  title: string
  author: string
  publishedAt: string
  category: string
  excerpt: string
  body: any[]
}

async function getPost(slug: string) {
  try {
    return await serverClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    }
  }

  return {
    title: `${post.title}`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-4xl font-semibold text-charcoal mb-4">Post Not Found</h1>
        <p className="text-muted mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog" className="text-crimson font-semibold hover:text-crimson/80">
          ← Back to Blog
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="space-y-12">
      {/* Hero */}
      <section className="pt-20 pb-12 border-b border-charcoal/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-dark-green uppercase tracking-luxury bg-dark-green/10 px-3 py-1 rounded-full inline-block">
              {post.category}
            </span>

            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              {post.title}
            </h1>
          </div>

          <p className="text-lg text-muted max-w-2xl leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center gap-4 text-sm text-muted">
            <span>By {post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          {post.body && post.body.length > 0 ? (
            <div className="space-y-6 text-muted leading-relaxed">
              {post.body.map((block: any, i: number) => {
                if (block._type === 'block') {
                  return (
                    <p key={i}>
                      {block.children?.map((child: any) => child.text).join('')}
                    </p>
                  )
                }
                return null
              })}
            </div>
          ) : (
            <p className="text-muted">Content coming soon.</p>
          )}
        </div>
      </section>

      {/* Back Link */}
      <section className="border-t border-charcoal/10 pt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-crimson font-semibold hover:text-crimson/80 inline-flex items-center gap-2">
            ← Back to Blog
          </Link>
        </div>
      </section>
    </article>
  )
}
