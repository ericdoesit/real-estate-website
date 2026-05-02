import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { HeroEditorial } from '@/components/home/HeroEditorial'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { NeighborhoodTeaser } from '@/components/home/NeighborhoodTeaser'
import { CTABanner } from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <HeroEditorial />
        <AboutSnippet />
        <NeighborhoodTeaser />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
