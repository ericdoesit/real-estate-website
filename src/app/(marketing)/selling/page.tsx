import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTABanner } from '@/components/home/CTABanner'
import { ProcessAccordion } from '@/components/services/ProcessAccordion'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'

export const metadata = {
  title: 'Selling Your Home in LA',
  description:
    "Eric's step-by-step guide to selling your home in Los Angeles. Strategy, marketing, and expert negotiation.",
}

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
      "I help manage the buyer's inspection and appraisal processes, addressing issues strategically.",
  },
  {
    number: '7',
    title: 'Closing & Delivery',
    description:
      'I coordinate the final steps, title review, and closing to ensure a smooth transition to the new owner.',
  },
]

export default function SellingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-10 pb-8">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            <StaggerGroup className="space-y-8">
              <StaggerItem className="space-y-3">
                <Eyebrow>Selling</Eyebrow>
                <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal capitalize">
                  The selling process
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="font-sans text-lg text-charcoal leading-relaxed">
                  Selling your home is both a financial and emotional decision. I bring market expertise, professional
                  marketing, and steady guidance to help you get the best possible outcome.
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
                <ProcessAccordion steps={sellingSteps} />
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to sell?"
        description="Let's talk about your home, your timeline, and how to get the best result."
      />
    </div>
  )
}
