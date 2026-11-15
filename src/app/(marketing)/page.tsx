import { serverClient } from '@/lib/sanity/client'
import { NEIGHBORHOODS_QUERY } from '@/lib/sanity/queries'
import { HeroEditorial } from '@/components/home/HeroEditorial'
import { heroImages } from '@/config/hero'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { StatsSection } from '@/components/home/StatsSection'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { NeighborhoodTeaser } from '@/components/home/NeighborhoodTeaser'
import { Testimonials } from '@/components/home/Testimonials'
import { CTABanner } from '@/components/home/CTABanner'

// Re-render every 6 hours so the hero photo rotates and featured listings stay fresh
export const revalidate = 21600

export default async function HomePage() {
  const neighborhoods = await serverClient.fetch(NEIGHBORHOODS_QUERY).catch(() => [])
  const heroImage = heroImages[Math.floor(Math.random() * heroImages.length)]

  return (
    <>
      <HeroEditorial image={heroImage} />
      <AboutSnippet />
      <StatsSection />
      <FeaturedListings />
      <NeighborhoodTeaser neighborhoods={neighborhoods} />
      <Testimonials />
      <CTABanner />
    </>
  )
}
