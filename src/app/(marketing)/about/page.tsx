import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'About Eric - Real Estate',
  description: 'Learn about Eric Zunkley, a trusted LA real estate agent dedicated to honest, relationship-based transactions.',
}

export default function AboutPage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-luxury text-crimson uppercase">
              About Eric
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              Real estate built on trust and communication.
            </h1>
          </div>

          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            I believe the relationship between a real estate agent and their clients must be based on trust, communication, and honesty. For over 15 years, I've helped families and investors achieve their goals through a simple philosophy: your success is my success.
          </p>
        </div>
      </section>

      {/* Headshot placeholder */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <img
                src="/headshot.jpg"
                alt="Eric Zunkley - Real Estate Agent"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="font-serif text-4xl font-semibold text-charcoal">
                Why I Do This
              </h2>

              <div className="space-y-4 text-muted">
                <p>
                  My reason for being in real estate is simple: I want to help my clients achieve their goals. Whether you're buying your first home, selling a property you've loved, or making a strategic investment, I'm committed to providing you with the expertise, honesty, and support you deserve.
                </p>

                <p>
                  The vast majority of my business comes from referrals and repeat clients. That tells you something important—I prioritize relationships over transactions.
                </p>

                <p>
                  I know the Los Angeles real estate market deeply. I understand the neighborhoods, the market dynamics, the opportunities. I have the creative talent to showcase your home. And I bring problem-solving skills to every transaction, no matter how complex.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-green/5 rounded-2xl border border-dark-green/20 p-12 space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-charcoal mb-8">
                Credentials
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-dark-green uppercase tracking-luxury">
                  License
                </p>
                <p className="text-2xl font-serif font-semibold text-charcoal">
                  CA DRE #01938067
                </p>
                <p className="text-muted">California Department of Real Estate</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-dark-green uppercase tracking-luxury">
                  Brokerage
                </p>
                <p className="text-2xl font-serif font-semibold text-charcoal">
                  eXp Realty
                </p>
                <p className="text-muted">eXp Realty of California Inc.</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-dark-green uppercase tracking-luxury">
                  Experience
                </p>
                <p className="text-2xl font-serif font-semibold text-charcoal">
                  15+ Years
                </p>
                <p className="text-muted">Los Angeles Real Estate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-semibold text-charcoal mb-12">
            My Approach
          </h2>

          <div className="space-y-8">
            <div className="border-l-4 border-crimson pl-6 space-y-2">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                Honest Guidance
              </h3>
              <p className="text-muted">
                I give you my honest opinion, not what I think you want to hear. That's the only way to build trust.
              </p>
            </div>

            <div className="border-l-4 border-crimson pl-6 space-y-2">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                Market Knowledge
              </h3>
              <p className="text-muted">
                I know LA real estate deeply—the neighborhoods, the trends, the opportunities. That expertise saves you money and time.
              </p>
            </div>

            <div className="border-l-4 border-crimson pl-6 space-y-2">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                Creative Problem-Solving
              </h3>
              <p className="text-muted">
                Real estate is rarely straightforward. I bring creative solutions to complex transactions.
              </p>
            </div>

            <div className="border-l-4 border-crimson pl-6 space-y-2">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                Communication
              </h3>
              <p className="text-muted">
                You'll always know what's happening in your transaction. I keep you informed every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl font-semibold text-charcoal">
              Ready to work together?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Let's talk about your real estate goals. I'm here to help.
            </p>
          </div>

          <Link href="/contact">
            <Button className="bg-crimson hover:bg-crimson/90 font-semibold px-8 py-3 text-lg">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
