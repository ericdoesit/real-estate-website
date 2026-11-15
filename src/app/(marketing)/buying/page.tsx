import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTABanner } from '@/components/home/CTABanner'
import { ProcessAccordion } from '@/components/services/ProcessAccordion'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'

export const metadata = {
  title: 'Buying a Home in LA',
  description:
    "Eric's step-by-step guide to buying a home in Los Angeles. Expert guidance from search to close.",
}

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
      "I provide detailed market analysis for neighborhoods you're interested in, including comparable sales, trends, and opportunities.",
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

export default function BuyingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-10 pb-8">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            <StaggerGroup className="space-y-8">
              <StaggerItem className="space-y-3">
                <Eyebrow>Buying</Eyebrow>
                <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal capitalize">
                  The buying process
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="font-sans text-lg text-charcoal leading-relaxed">
                  Buying a home in LA is one of the biggest decisions you'll make. I guide you through every step with
                  transparency, market knowledge, and steady advocacy for your interests.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            <StaggerGroup>
              <StaggerItem>
                <ProcessAccordion steps={buyingSteps} />
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to find your home?"
        description="Let's talk about what you're looking for and where to start."
      />
    </div>
  )
}
