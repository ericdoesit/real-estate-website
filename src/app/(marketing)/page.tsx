import { HeroEditorial } from '@/components/home/HeroEditorial'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { NeighborhoodTeaser } from '@/components/home/NeighborhoodTeaser'
import { CTABanner } from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroEditorial />
      <FeaturedListings />
      <AboutSnippet />
      <NeighborhoodTeaser />
      <CTABanner />
    </>
  )
}
