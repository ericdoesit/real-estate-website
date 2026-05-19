import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { serverClient } from '@/lib/sanity/client'
import { BLOG_POST_BY_SLUG_QUERY, ALL_BLOG_SLUGS_QUERY } from '@/lib/sanity/queries'
import { PrevNextNav } from '@/components/ui/PrevNextNav'
import { ArrowRight } from '@/components/ui/ArrowRight'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { urlFor } from '@/lib/sanity/image'

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

    if (block._type === 'image') {
      const imageUrl = block.asset ? urlFor(block.asset).url() : null
      if (imageUrl) {
        elements.push(
          <figure key={block._key} className="my-8">
            <div className="relative w-full aspect-video bg-gray-100 rounded-brand overflow-hidden">
              <Image
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

async function getPost(slug: string) {
  try {
    return await serverClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return { title: 'Post Not Found', description: 'The blog post you are looking for does not exist.' }

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

  if (!post) {
    return (
      <div className="w-full px-6 lg:px-12 py-16 text-center">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-serif text-4xl font-semibold text-charcoal mb-4">Post Not Found</h1>
          <p className="text-charcoal mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="font-semibold hover:transition-colors inline-flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const coverSrc = post.coverImage ? urlFor(post.coverImage).width(1400).url() : null

  return (
    <article className="space-y-12">
      {/* Hero */}
      <section className="pt-10">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {coverSrc && (
              <div className="relative aspect-video overflow-hidden rounded-brand">
                <Image
                  src={coverSrc}
                  alt={post.coverImage?.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>
            )}
            <div className="space-y-4">
              <Eyebrow>Blog</Eyebrow>
              <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
                {post.title}
              </h1>
              <p className="text-lg text-charcoal/80 max-w-2xl leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-charcoal">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-10">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
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
      <section className="w-full px-6 lg:px-12 pb-10">
        <div className="max-w-3xl mx-auto">
          <PrevNextNav
            prev={prevPost ? { label: prevPost.title, href: `/blog/${prevPost.slug}` } : null}
            next={nextPost ? { label: nextPost.title, href: `/blog/${nextPost.slug}` } : null}
          />
          <div className="text-center mt-2">
            <Link href="/blog" className="text-sm font-semibold tracking-widest uppercase text-charcoal/50 hover:text-charcoal transition-colors">
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
