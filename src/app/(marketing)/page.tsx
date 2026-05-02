import { HeroEditorial } from '@/components/home/HeroEditorial'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { NeighborhoodTeaser } from '@/components/home/NeighborhoodTeaser'
import { CTABanner } from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroEditorial />
      <AboutSnippet />
      <NeighborhoodTeaser />
      <CTABanner />
    </>
  )
}
