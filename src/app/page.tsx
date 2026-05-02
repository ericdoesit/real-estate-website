import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { HeroEditorial } from '@/components/home/HeroEditorial'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { NeighborhoodTeaser } from '@/components/home/NeighborhoodTeaser'
import { Testimonials } from '@/components/home/Testimonials'
import { CTABanner } from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <HeroEditorial />
        <AboutSnippet />
        <NeighborhoodTeaser />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
