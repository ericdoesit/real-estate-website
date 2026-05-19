import { IntakeForm } from '@/components/contact/IntakeForm'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTABanner } from '@/components/home/CTABanner'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'
import { agent } from '@/config/agent'

export const metadata = {
  title: `Contact ${agent.name}`,
  description: `Get in touch with ${agent.name}. Schedule a consultation or ask about real estate opportunities in LA.`,
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-10 pb-8">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            <StaggerGroup className="space-y-6">
              <StaggerItem className="space-y-3">
                <Eyebrow>Get In Touch</Eyebrow>
                <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-charcoal capitalize">
                  Let's talk about your goals.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="font-sans text-lg text-charcoal leading-relaxed max-w-3xl">
                  Whether you're buying, selling, or exploring opportunities, I'm here to help. Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-cream py-20">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site">
            <StaggerGroup className="max-w-2xl space-y-8">
              <StaggerItem className="space-y-3">
                <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-charcoal capitalize">
                  Send a Message
                </h2>
                <p className="font-sans text-charcoal leading-relaxed">
                  Tell me a bit about what you're looking for — it helps me prepare for our first call.
                </p>
              </StaggerItem>
              <StaggerItem>
                <IntakeForm />
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to get started?"
        description="No pressure, no commitment. Just a conversation about what you're looking for."
      />
    </div>
  )
}
