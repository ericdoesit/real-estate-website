import { Eyebrow } from '@/components/ui/Eyebrow'
import { agent, site } from '@/config/agent'

export const metadata = {
  title: `Privacy Policy | ${site.name}`,
  description: `Privacy policy for ${site.name}. Learn how we collect, use, and protect your personal information.`,
}

const EFFECTIVE_DATE = 'May 19, 2026'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-2xl font-semibold text-charcoal">{title}</h2>
      <div className="space-y-3 font-sans text-base text-charcoal/80 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-outside ml-5 space-y-1">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-10 pb-8">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site space-y-3">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-charcoal">
              Privacy Policy
            </h1>
            <p className="font-sans text-sm uppercase tracking-luxury text-charcoal/50">
              Effective Date: {EFFECTIVE_DATE}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12">
        <div className="w-full px-6 lg:px-12">
          <div className="container-site max-w-3xl space-y-12">

            <p className="font-sans text-base text-charcoal/80 leading-relaxed">
              {agent.name} ("I," "me," or "my") respects your privacy. This Privacy Policy explains what information I collect when you visit this website, how I use it, and your rights regarding that information. By using this site, you agree to the practices described below.
            </p>

            <Section title="1. Information I Collect">
              <p><strong>A. Information you provide directly</strong></p>
              <p>When you submit a contact form, property inquiry, or request to be contacted, I may collect:</p>
              <List items={[
                'Full name',
                'Email address',
                'Phone number',
                'Mailing or property address (if provided)',
                'The nature of your inquiry (buying, selling, general question)',
                'Any additional details you include in your message',
              ]} />
              <p className="pt-2"><strong>B. Automatically collected information</strong></p>
              <p>When you visit this site, certain technical information is collected automatically through standard web technologies, including:</p>
              <List items={[
                'IP address and general geographic location',
                'Browser type and version',
                'Device type and operating system',
                'Pages visited and time spent on each page',
                'Referring URL (the page that linked you here)',
              ]} />
            </Section>

            <Section title="2. Property Information and Listings">
              <p>
                Property listings on this site — including addresses, photos, descriptions, pricing, and related details — are shared for real estate marketing purposes only. If you are a seller whose property is listed here, your listing information (address, photos, and public MLS data) is displayed as part of the normal real estate marketing process and is consistent with your listing agreement.
              </p>
              <p>
                I do not publish private details about properties beyond what is standard for public MLS listings. If you have a concern about specific property information displayed on this site, please contact me directly using the information in Section 11.
              </p>
            </Section>

            <Section title="3. Image Usage">
              <p>
                Property photographs displayed on this site are used solely to market listings and represent Los Angeles real estate. Images may be sourced from professional photographers, MLS feeds, or publicly available sources. If you believe an image has been used in error or without appropriate rights, please contact me immediately.
              </p>
              <p>
                Photographs of individuals (including client testimonials, community images, or event photos) are only published with the express consent of the individuals pictured. If you appear in a photo on this site and wish to have it removed, please submit a deletion request as described in Section 7.
              </p>
            </Section>

            <Section title="4. How I Use Your Information">
              <p>Information collected through this site is used to:</p>
              <List items={[
                'Respond to your inquiries, questions, or showing requests',
                'Provide real estate services you have requested',
                'Follow up on property searches, buyer consultations, or listing appointments',
                'Send market updates or property alerts if you have opted in',
                'Improve the performance and content of this website',
                'Comply with applicable laws and regulations',
              ]} />
              <p>I do not use your information for purposes unrelated to real estate services without your explicit consent.</p>
            </Section>

            <Section title="5. Communication and Contact Preferences">
              <p>
                By submitting a form on this site, you consent to being contacted by {agent.name} regarding your inquiry. This contact may occur by email or phone, during normal business hours.
              </p>
              <p>
                If you do not wish to receive further communication, you may opt out at any time by replying to any email with "Unsubscribe" in the subject line, or by contacting me directly. Opt-out requests will be honored promptly and no further marketing contact will be made. Note that transactional communications related to an active real estate transaction may still be necessary until the transaction concludes.
              </p>
              <p>
                I do not send unsolicited bulk email and do not add you to marketing lists without your knowledge.
              </p>
            </Section>

            <Section title="6. How I Share Your Information">
              <p>
                I do not sell, rent, or trade your personal information. Your information may be shared only in the following limited circumstances:
              </p>
              <List items={[
                `With ${agent.brokerage}, as required by my brokerage relationship and in connection with active real estate transactions`,
                'With third-party service providers who operate this website (such as hosting and form processing services), who are contractually obligated to protect your data',
                "With other real estate professionals (buyer's agents, title companies, lenders) when necessary to complete a transaction you are party to",
                'With legal authorities when required by law, court order, or to protect the rights and safety of any individual',
              ]} />
            </Section>

            <Section title="7. Your Rights — Access, Correction, and Deletion">
              <p>You have the right to:</p>
              <List items={[
                'Request a copy of the personal information I hold about you',
                'Correct inaccurate or outdated information',
                'Request that I delete your personal information',
                'Opt out of any marketing communications at any time',
              ]} />
              <p>
                To submit any of these requests, email me at{' '}
                <a href={`mailto:${agent.email}`} className="text-charcoal underline underline-offset-2 hover:text-charcoal/60 transition-colors">
                  {agent.email}
                </a>{' '}
                with the subject line <strong>"Privacy Request."</strong> I will respond within 30 days. Deletion requests will be honored except where retention is required by law (for example, records tied to a completed real estate transaction).
              </p>
            </Section>

            <Section title="8. California Privacy Rights (CCPA)">
              <p>
                As a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information. I do not sell personal information. To exercise any of these rights, contact me as described in Section 7.
              </p>
            </Section>

            <Section title="9. Data Security and Retention">
              <p>
                I take reasonable technical measures to protect the information submitted through this site from unauthorized access or disclosure. However, no method of transmission over the internet is entirely secure, and I cannot guarantee absolute security.
              </p>
              <p>
                Contact form submissions and inquiry data are retained only as long as necessary to fulfill the purpose for which they were submitted, or as required by applicable real estate and tax regulations (typically up to seven years for transaction-related records). Information not tied to a completed transaction is retained for no longer than 24 months unless you have an ongoing relationship with me.
              </p>
            </Section>

            <Section title="10. Children's Privacy">
              <p>
                This website is not directed at children under the age of 13, and I do not knowingly collect personal information from minors. If you believe a child has submitted information through this site, please contact me and I will delete it promptly.
              </p>
            </Section>

            <Section title="11. Updates to This Policy">
              <p>
                I may update this Privacy Policy from time to time to reflect changes in my practices or applicable law. The effective date at the top of this page will always reflect the most recent revision. Continued use of this site after an update constitutes acceptance of the revised policy.
              </p>
            </Section>

            <Section title="12. Contact">
              <p>If you have questions about this Privacy Policy or how your information is handled, please contact me:</p>
              <div className="pt-1 space-y-1">
                <p className="font-semibold">{agent.name}, {agent.title}</p>
                <p>{agent.brokerage}</p>
                <p>{agent.dreLicense}</p>
                <p>{agent.location}</p>
                <p>
                  <a href={`mailto:${agent.email}`} className="text-charcoal underline underline-offset-2 hover:text-charcoal/60 transition-colors">
                    {agent.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${agent.phone}`} className="text-charcoal underline underline-offset-2 hover:text-charcoal/60 transition-colors">
                    {agent.phoneDisplay}
                  </a>
                </p>
              </div>
            </Section>

          </div>
        </div>
      </section>
    </div>
  )
}
