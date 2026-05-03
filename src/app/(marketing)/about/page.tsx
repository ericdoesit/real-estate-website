import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTABanner } from '@/components/home/CTABanner'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'

export const metadata = {
  title: 'About Eric - Real Estate',
  description: 'Learn about Eric Zunkley, a trusted LA real estate agent dedicated to honest, relationship-based transactions.',
}

export default function AboutPage() {
  return (
    <div className="">
      {/* Hero */}
      <section className="pt-10 pb-8">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <StaggerGroup className="space-y-8">
              <StaggerItem>
                <div className="space-y-4">
                  <Eyebrow>About Eric</Eyebrow>
                  <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
                    Real estate built on trust and communication.
                  </h1>
                </div>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-charcoal max-w-2xl" style={{ lineHeight: '1.6' }}>
                  For 13 years, I've helped buyers, sellers, and investors across Los Angeles achieve their goals — with honesty, deep market knowledge, and genuine care from start to finish.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Headshot */}
      <section className="bg-cream py-10">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <StaggerItem className="relative aspect-square rounded-2xl overflow-hidden order-2 lg:order-1">
                <img
                  src="/headshot.jpg"
                  alt="Eric Zunkley - Real Estate Agent"
                  className="w-full h-full object-cover"
                />
              </StaggerItem>

              <StaggerItem className="space-y-6 order-1 lg:order-2">
                <h2 className="font-serif text-5xl font-semibold text-charcoal">
                  Why I Do This
                </h2>
                <p className="text-charcoal text-lg" style={{ lineHeight: '1.6' }}>
                  Most of my business comes through referrals and repeat clients — that reflects the kind of trust I work to earn with every transaction. I'm not chasing deals. I'm building relationships, and I bring deep LA market knowledge and creative problem-solving to every one.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-cream py-10">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <StaggerGroup className="space-y-8">
              <StaggerItem>
                <h2 className="font-serif text-5xl font-semibold text-charcoal mb-4">
                  My Approach
                </h2>
              </StaggerItem>

              <StaggerItem>
                <div className="border-l-4 border-charcoal pl-6 space-y-2">
                  <h3 className="font-serif text-3xl font-semibold text-charcoal">
                    Honest Guidance
                  </h3>
                  <p className="text-charcoal">
                    I give you my honest opinion, not what I think you want to hear. That's the only way to build trust.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="border-l-4 border-charcoal pl-6 space-y-2">
                  <h3 className="font-serif text-3xl font-semibold text-charcoal">
                    Market Knowledge
                  </h3>
                  <p className="text-charcoal">
                    I know LA real estate deeply—the neighborhoods, the trends, the opportunities. That expertise saves you money and time.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="border-l-4 border-charcoal pl-6 space-y-2">
                  <h3 className="font-serif text-3xl font-semibold text-charcoal">
                    Creative Problem-Solving
                  </h3>
                  <p className="text-charcoal">
                    Real estate is rarely straightforward. I bring creative solutions to complex transactions.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="border-l-4 border-charcoal pl-6 space-y-2">
                  <h3 className="font-serif text-3xl font-semibold text-charcoal">
                    Communication
                  </h3>
                  <p className="text-charcoal">
                    You'll always know what's happening in your transaction. I keep you informed every step of the way.
                  </p>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to work together?"
        description="Let's talk about your real estate goals. I'm here to help."
      />
    </div>
  )
}
