import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-dark-green via-dark-green to-crimson relative overflow-hidden">
      {/* Accent shapes */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-goldenrod/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="font-serif text-5xl lg:text-6xl font-semibold text-white">
            Ready to move?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Whether you're buying, selling, or just exploring, let's talk about your real estate goals.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/contact">
            <Button className="bg-goldenrod text-charcoal hover:bg-goldenrod/90 font-semibold px-8 py-3 text-lg">
              Schedule a Consultation
            </Button>
          </Link>
          <Link href="tel:(323) 487-9865">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-dark-green font-semibold px-8 py-3 text-lg"
            >
              Call (323) 487-9865
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/20">
          <div>
            <p className="text-sm text-white/90 uppercase tracking-luxury mb-2">
              License
            </p>
            <p className="text-white font-semibold">CA DRE #01938067</p>
          </div>
          <div>
            <p className="text-sm text-blue-50 uppercase tracking-luxury mb-2">
              Experience
            </p>
            <p className="text-white font-semibold">15+ Years</p>
          </div>
          <div>
            <p className="text-sm text-blue-50 uppercase tracking-luxury mb-2">
              Brokerage
            </p>
            <p className="text-white font-semibold">eXp Realty</p>
          </div>
        </div>
      </div>
    </section>
  )
}
