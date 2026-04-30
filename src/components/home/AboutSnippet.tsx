import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AboutSnippet() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative h-96 lg:h-[450px] bg-dark-green/10 rounded-2xl flex items-center justify-center order-2 lg:order-1">
            <div className="text-center">
              <p className="text-muted">Headshot + bio coming</p>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-luxury text-crimson uppercase">
                About Eric
              </p>
              <h2 className="font-serif text-4xl font-semibold text-charcoal">
                Real estate rooted in relationships.
              </h2>
            </div>

            <p className="text-lg text-muted leading-relaxed">
              I'm a California real estate agent committed to helping my clients achieve their goals through honesty, deep market knowledge, and genuine care. Most of my business comes through referrals and repeat clients—a reflection of the relationships I build with every transaction.
            </p>

            <p className="text-base text-muted">
              Whether you're buying your first home, selling a property, or investing in LA real estate, I bring creative problem-solving and a deep understanding of neighborhoods from Eagle Rock to Venice, Mid City to West Adams.
            </p>

            <div className="pt-4">
              <Link href="/about">
                <Button variant="ghost" className="text-crimson hover:text-crimson/80 p-0">
                  Learn more about my approach →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
