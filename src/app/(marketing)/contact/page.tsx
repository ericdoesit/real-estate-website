import { ContactForm } from '@/components/contact/ContactForm'
import { Eyebrow } from '@/components/ui/Eyebrow'

export const metadata = {
  title: 'Contact Eric',
  description: 'Get in touch with Eric Zunkley. Schedule a consultation or ask about real estate opportunities in LA.',
}

export default function ContactPage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <Eyebrow>Get In Touch</Eyebrow>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-charcoal">
              Let's talk about your goals.
            </h1>
          </div>

          <p className="text-lg text-muted max-w-xl leading-relaxed">
            Whether you're buying, selling, or exploring opportunities, I'm here to help. Reach out with any questions—I'll get back to you promptly.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-cream py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-5xl font-semibold text-charcoal mb-2">
                Send a Message
              </h2>
              <p className="text-muted">
                I typically respond within 24 hours during business days.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif text-3xl font-semibold text-charcoal">
                Call Direct
              </h3>
              <div className="space-y-2">
                <p className="text-muted">
                  <a
                    href="tel:+13234879865"
                    className="font-semibold hover:transition-colors"
                  >
                    (323) 487-9865
                  </a>
                </p>
                <p className="text-sm text-muted">Monday - Friday, 9am - 6pm PT</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-3xl font-semibold text-charcoal">
                Email
              </h3>
              <div className="space-y-2">
                <p className="text-muted">
                  <a
                    href="mailto:ezunkleysellsit@gmail.com"
                    className="font-semibold hover:transition-colors"
                  >
                    ezunkleysellsit@gmail.com
                  </a>
                </p>
                <p className="text-sm text-muted">I respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
