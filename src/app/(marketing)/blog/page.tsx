import Link from 'next/link'
import { serverClient } from '@/lib/sanity/client'
import { BLOG_POSTS_QUERY } from '@/lib/sanity/queries'
import { Eyebrow } from '@/components/ui/Eyebrow'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  author: string
  category: string
}

export const metadata = {
  title: 'Blog - Market Updates & Guides',
  description:
    'Stay informed with market updates, buying guides, and LA real estate insights from Eric Zunkley.',
}

export default async function BlogPage() {
  let posts: BlogPost[] = []

  try {
    posts = await serverClient.fetch(BLOG_POSTS_QUERY)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
  }

  // Fallback placeholder
  if (posts.length === 0) {
    posts = [
      {
        _id: '1',
        title: 'Understanding SB9: A New Opportunity for Homeowners',
        slug: { current: 'sb9-guide' },
        excerpt: 'California SB9 is changing the real estate landscape. Learn how it could benefit your property.',
        publishedAt: '2024-03-15',
        author: 'Eric Zunkley',
        category: 'Legislation',
      },
      {
        _id: '2',
        title: 'Spring 2024 Market Update',
        slug: { current: 'spring-market-update' },
        excerpt: 'The LA real estate market is heating up. Here\'s what buyers and sellers need to know.',
        publishedAt: '2024-03-01',
        author: 'Eric Zunkley',
        category: 'Market Update',
      },
    ]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              Market insights & guides.
            </h1>
          </div>

          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Stay informed with updates on LA real estate market conditions, buying and selling tips, and strategies for
            maximizing your real estate investment.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug?.current || post._id}`}
                  className="group"
                >
                  <div className="space-y-4 h-full flex flex-col">
                    {/* Category badge */}
                    <div className="inline-flex w-fit">
                      <span className="text-xs font-semibold text-dark-green uppercase tracking-luxury bg-dark-green/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-3xl font-semibold text-charcoal group-hover:transition-colors line-clamp-3">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted text-sm flex-1">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-charcoal/10">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>By {post.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted">No blog posts yet. Check back soon for market updates and guides.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
