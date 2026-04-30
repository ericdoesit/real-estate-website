import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Services - Buying & Selling Guide',
  description:
    'Learn about Eric\'s approach to buying and selling real estate in Los Angeles. Expert guidance every step of the way.',
}

export default function ServicesPage() {
  const buyingSteps = [
    {
      number: '1',
      title: 'Consultation & Goal Setting',
      description:
        'We start by understanding your needs, budget, timeline, and priorities. This foundation guides the entire search process.',
    },
    {
      number: '2',
      title: 'Market Education',
      description:
        'I provide detailed market analysis for neighborhoods you\'re interested in, including comparable sales, trends, and opportunities.',
    },
    {
      number: '3',
      title: 'Property Search',
      description:
        'Using MLS access and market knowledge, I identify properties that match your criteria and lifestyle goals.',
    },
    {
      number: '4',
      title: 'Home Tours & Evaluation',
      description:
        'We tour properties together. I provide honest feedback on strengths, weaknesses, potential, and value.',
    },
    {
      number: '5',
      title: 'Offer & Negotiation',
      description:
        'When you find the right home, I prepare a competitive offer strategy and negotiate terms that protect your interests.',
    },
    {
      number: '6',
      title: 'Inspection & Due Diligence',
      description:
        'I guide you through inspections, appraisals, and title review to ensure there are no surprises.',
    },
    {
      number: '7',
      title: 'Financing & Closing',
      description:
        'I coordinate with lenders and title companies to ensure a smooth closing process.',
    },
  ]

  const sellingSteps = [
    {
      number: '1',
      title: 'Home Evaluation & Strategy',
      description:
        'I conduct a detailed market analysis of your home and develop a pricing and marketing strategy that maximizes value.',
    },
    {
      number: '2',
      title: 'Preparation & Presentation',
      description:
        'Together we prepare your home for market—staging, cleaning, minor repairs—to show it at its best.',
    },
    {
      number: '3',
      title: 'Professional Marketing',
      description:
        'I use professional photography, video, and targeted marketing to reach qualified buyers across MLS and digital platforms.',
    },
    {
      number: '4',
      title: 'Showings & Feedback',
      description:
        'I manage showings and gather feedback from agents and buyers to refine strategy if needed.',
    },
    {
      number: '5',
      title: 'Offer Review & Negotiation',
      description:
        'When offers come in, I provide expert analysis and negotiate terms that maximize your proceeds.',
    },
    {
      number: '6',
      title: 'Inspection & Appraisal',
      description:
        'I help manage the buyer\'s inspection and appraisal processes, addressing issues strategically.',
    },
    {
      number: '7',
      title: 'Closing & Delivery',
      description:
        'I coordinate the final steps, title review, and closing to ensure a smooth transition to the new owner.',
    },
  ]

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-luxury text-crimson uppercase">
              Services
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              Expert guidance. Every step.
            </h1>
          </div>

          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Whether you're buying your first home, selling a property, or making a strategic investment, I guide you
            through every stage of the transaction with transparency and expertise.
          </p>
        </div>
      </section>

      {/* Buying Process */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold tracking-luxury text-dark-green uppercase mb-2">
              Buying
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal">
              The Buying Process
            </h2>
          </div>

          <div className="space-y-6">
            {buyingSteps.map((step) => (
              <div key={step.number} className="flex gap-6 pb-6 border-b border-charcoal/10">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-dark-green text-white font-serif font-semibold text-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selling Process */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold tracking-luxury text-crimson uppercase mb-2">
              Selling
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal">
              The Selling Process
            </h2>
          </div>

          <div className="space-y-6">
            {sellingSteps.map((step) => (
              <div key={step.number} className="flex gap-6 pb-6 border-b border-charcoal/10">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-crimson text-white font-serif font-semibold text-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-semibold text-charcoal mb-12">
            Additional Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                Investment Analysis
              </h3>
              <p className="text-muted">
                Strategic guidance for investors evaluating properties, neighborhoods, and market timing. I help you build
                wealth through real estate with confidence.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                Market Consultation
              </h3>
              <p className="text-muted">
                Get educated about your neighborhood, market conditions, and opportunities. No pressure, just honest
                guidance to help you make informed decisions.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                1031 Exchange Support
              </h3>
              <p className="text-muted">
                Navigating a 1031 exchange requires timing and market knowledge. I guide you through the process to
                maximize your investment.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                Relocation Services
              </h3>
              <p className="text-muted">
                Moving to LA? I help you understand neighborhoods, find the right home, and settle into your new community.
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
              Ready to get started?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Let's discuss your real estate goals and how I can help you achieve them.
            </p>
          </div>

          <Link href="/contact">
            <Button className="bg-crimson hover:bg-crimson/90 font-semibold px-8 py-3 text-lg">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
