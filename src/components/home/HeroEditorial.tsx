import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroEditorial() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-blue/10" />

      {/* Accent shapes */}
      <div className="absolute -right-32 top-20 w-96 h-96 bg-dark-green rounded-full opacity-10 blur-3xl" />
      <div className="absolute -left-32 bottom-0 w-96 h-96 bg-crimson rounded-full opacity-10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-luxury text-crimson uppercase">
                Los Angeles Real Estate
              </p>
              <h1 className="font-serif text-6xl lg:text-7xl font-semibold text-charcoal leading-tight">
                Curated homes for your story.
              </h1>
            </div>

            <p className="text-lg text-muted max-w-lg">
              I help families and investors find, buy, and sell properties across Los Angeles with honesty, expertise, and genuine care.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <p className="text-3xl font-serif font-semibold text-dark-green">150+</p>
                <p className="text-sm text-muted">Transactions</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-semibold text-crimson">$1.2B</p>
                <p className="text-sm text-muted">Portfolio Value</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-semibold text-goldenrod">15+</p>
                <p className="text-sm text-muted">Years Experience</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4 pt-6">
              <Link href="/contact">
                <Button className="bg-crimson hover:bg-crimson/90">
                  Start Conversation
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="outline" className="border-dark-green text-dark-green">
                  View Properties
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual - Dark green accent block with placeholder */}
          <div className="relative h-96 lg:h-[500px]">
            <div className="absolute inset-0 bg-dark-green rounded-2xl opacity-20" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-goldenrod rounded-lg" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-crimson/20 rounded-full blur-2xl" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <p className="text-muted text-center">Hero image or video</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
