import { serverClient } from '@/lib/sanity/client'
import { NEIGHBORHOODS_QUERY } from '@/lib/sanity/queries'
import { HeroEditorial } from '@/components/home/HeroEditorial'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { StatsSection } from '@/components/home/StatsSection'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { NeighborhoodTeaser } from '@/components/home/NeighborhoodTeaser'
import { Testimonials } from '@/components/home/Testimonials'
import { CTABanner } from '@/components/home/CTABanner'

export default async function HomePage() {
  const neighborhoods = await serverClient.fetch(NEIGHBORHOODS_QUERY).catch(() => [])

  return (
    <>
      <HeroEditorial />
      <AboutSnippet />
      <StatsSection />
      <FeaturedListings />
      <NeighborhoodTeaser neighborhoods={neighborhoods} />
      <Testimonials />
      <CTABanner />
    </>
  )
}
