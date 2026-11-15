import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serverClient } from '@/lib/sanity/client'
import { BLOG_POST_BY_SLUG_QUERY, ALL_BLOG_SLUGS_QUERY } from '@/lib/sanity/queries'
import { PrevNextNav } from '@/components/ui/PrevNextNav'
import { ArrowRight } from '@/components/ui/ArrowRight'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { urlFor } from '@/lib/sanity/image'
import { SanityImage } from '@/components/ui/SanityImage'


function renderChildren(children: any[], markDefs: any[] = []) {
  return children?.map((child: any, i: number) => {
    let content: React.ReactNode = child.text
    if (!child.marks?.length) return <span key={i}>{content}</span>

    for (const mark of child.marks) {
      if (mark === 'strong') content = <strong key={i}>{content}</strong>
      else if (mark === 'em') content = <em key={i}>{content}</em>
      else {
        const def = markDefs?.find((d: any) => d._key === mark)
        if (def?._type === 'link') {
          // Handle both href (external) and _ref (internal property links)
          const href = def.href || (def._ref ? `/properties/${def._ref}` : '#')
          const isExternal = def.href?.startsWith('http')
          content = (
            <Link
              key={i}
              href={href}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-charcoal underline underline-offset-2 hover:opacity-75 transition-opacity"
            >
              {content}
            </Link>
          )
        }
      }
    }
    return <span key={i}>{content}</span>
  })
}

function BlogBody({ blocks }: { blocks: any[] }) {
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    // Handle image blocks
    if (block._type === 'image') {
      const imageUrl = block.asset ? urlFor(block.asset).url() : null
      if (imageUrl) {
        elements.push(
          <figure key={block._key} className="my-8">
            <div className="relative w-full aspect-video bg-sand rounded-brand overflow-hidden">
              <SanityImage
                src={imageUrl}
                alt={block.alt || 'Blog image'}
                fill
                className="object-cover"
              />
            </div>
            {block.caption && (
              <figcaption className="text-sm text-charcoal/60 mt-2 text-center italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
        )
      }
      i++
      continue
    }

    if (block._type !== 'block') { i++; continue }

    if (block.listItem) {
      const listType = block.listItem
      const Tag = listType === 'number' ? 'ol' : 'ul'
      const items: React.ReactNode[] = []
      while (i < blocks.length && blocks[i].listItem === listType) {
        items.push(
          <li key={blocks[i]._key} className="ml-6">
            {renderChildren(blocks[i].children, blocks[i].markDefs)}
          </li>
        )
        i++
      }
      elements.push(
        <Tag key={`list-${i}`} className={listType === 'number' ? 'list-decimal space-y-2' : 'list-disc space-y-2'}>
          {items}
        </Tag>
      )
      continue
    }

    const children = renderChildren(block.children, block.markDefs)
    if (block.style === 'h2') {
      elements.push(<h2 key={block._key} className="font-serif text-3xl font-semibold text-charcoal mt-4">{children}</h2>)
    } else if (block.style === 'h3') {
      elements.push(<h3 key={block._key} className="font-serif text-2xl font-semibold text-charcoal mt-2">{children}</h3>)
    } else if (block.style === 'blockquote') {
      elements.push(<blockquote key={block._key} className="border-l-4 border-charcoal/20 pl-6 italic text-charcoal/70">{children}</blockquote>)
    } else {
      elements.push(<p key={block._key}>{children}</p>)
    }
    i++
  }

  return <>{elements}</>
}

interface BlogPost {
  title: string
  author: string
  publishedAt: string
  excerpt: string
  body: any[]
}

async function getPost(slug: string) {
  try {
    return await serverClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug })
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([
    getPost(slug),
    serverClient.fetch(ALL_BLOG_SLUGS_QUERY).catch(() => []),
  ])

  const currentIdx = allPosts.findIndex((p: { slug: string }) => p.slug === slug)
  const prevPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null
  const nextPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null

  if (!post) notFound()

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
      <section className="pt-10 pb-12">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site space-y-6">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]} />
            <div className="space-y-3">
              <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal capitalize">
                {post.title}
              </h1>
            </div>

            <p className="font-sans text-lg text-charcoal leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center gap-4 text-sm text-charcoal">
              <span>By {post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>

            {post.coverImage && (
              <div className="relative w-full aspect-video bg-sand rounded-brand overflow-hidden mt-8">
                <SanityImage
                  src={urlFor(post.coverImage).url()}
                  alt={post.coverImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-10">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            {post.body && post.body.length > 0 ? (
              <div className="space-y-5 text-charcoal leading-relaxed text-lg">
                <BlogBody blocks={post.body} />
              </div>
            ) : (
              <p className="text-charcoal">Content coming soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="pt-6 pb-10">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            <PrevNextNav
              prev={prevPost ? { label: prevPost.title, href: `/blog/${prevPost.slug}` } : null}
              next={nextPost ? { label: nextPost.title, href: `/blog/${nextPost.slug}` } : null}
            />
            <div className="text-center mt-2">
              <Link href="/blog" className="text-sm font-semibold tracking-luxury uppercase text-charcoal/70 hover:text-charcoal transition-colors">
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
