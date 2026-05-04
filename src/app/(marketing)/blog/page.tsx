import Link from 'next/link'
import { serverClient } from '@/lib/sanity/client'
import { BLOG_POSTS_QUERY } from '@/lib/sanity/queries'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'
import { agent } from '@/config/agent'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  author: string
}

export const metadata = {
  title: 'Blog - Market Updates & Guides',
  description:
    `Stay informed with market updates, buying guides, and LA real estate insights from ${agent.name}.`,
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
        author: agent.name,
      },
      {
        _id: '2',
        title: 'Spring 2024 Market Update',
        slug: { current: 'spring-market-update' },
        excerpt: 'The LA real estate market is heating up. Here\'s what buyers and sellers need to know.',
        publishedAt: '2024-03-01',
        author: agent.name,
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
    <div className="">
      {/* Hero */}
      <section className="pt-10 pb-8">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <StaggerGroup className="space-y-8">
              <StaggerItem>
                <div className="space-y-4">
                  <Eyebrow>Blog</Eyebrow>
                  <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
                    Market insights & guides.
                  </h1>
                </div>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-charcoal leading-relaxed">
                  Stay informed with updates on LA real estate market conditions, buying and selling tips, and strategies for
                  maximizing your real estate investment.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-16">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
          {posts.length > 0 ? (
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <StaggerItem key={post._id}>
                  <Link
                    href={`/blog/${post.slug?.current || post._id}`}
                    className="group block"
                  >
                    <div className="space-y-4 h-full flex flex-col">
                      <h3 className="font-serif text-3xl font-semibold text-charcoal group-hover:transition-colors line-clamp-3">
                        {post.title}
                      </h3>
                      <p className="text-charcoal text-sm flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-charcoal pt-4 border-t border-charcoal/10">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>By {post.author}</span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <div className="text-center py-16">
              <p className="text-charcoal">No blog posts yet. Check back soon for market updates and guides.</p>
            </div>
          )}
          </div>
        </div>
      </section>
    </div>
  )
}
