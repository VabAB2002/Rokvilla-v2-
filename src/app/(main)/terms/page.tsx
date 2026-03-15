import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Review the terms and conditions governing your use of the RokVilla website and our architecture, construction, and interior design services.',
}

export default function TermsPage() {
  return (
    <section className="bg-bone py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 border-b border-obsidian/10 pb-10">
          <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-terracotta">
            Legal
          </p>
          <h1 className="font-heading text-4xl font-light text-obsidian md:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 font-body text-sm text-slate">
            Last updated: March 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <p className="font-body text-base leading-relaxed text-slate">
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the
            RokVilla website at rokvilla.com (the &ldquo;Site&rdquo;) and the services offered by
            RokVilla (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing the
            Site or submitting an inquiry, you agree to be bound by these Terms. If you do not
            agree, please do not use the Site.
          </p>
        </div>

        <div className="space-y-12">

          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              1. Acceptance of Terms
            </h2>
            <p className="font-body text-base leading-relaxed text-slate">
              By using this Site, you confirm that you are at least 18 years of age, have the legal
              capacity to enter into a binding agreement, and accept these Terms in full. We reserve
              the right to update these Terms at any time. The &ldquo;Last updated&rdquo; date at
              the top of this page reflects the most recent revision. Continued use of the Site
              after any changes constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* 2. Our Services */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              2. Our Services
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              RokVilla provides premium architecture, construction, and interior design services
              across Hubballi, Dharwad, and Ballari in Karnataka, India. Our services include but
              are not limited to:
            </p>
            <ul className="space-y-2 pl-5">
              {[
                'Architectural design and planning for residential and commercial projects',
                'End-to-end construction with transparent pricing and project management',
                'Interior design, space planning, and furnishing services',
                'Consultation and feasibility assessments',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-body text-base leading-relaxed text-slate"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-body text-base leading-relaxed text-slate">
              The Site serves as an information and inquiry platform. Formal project agreements,
              timelines, deliverables, and payment terms are established separately through written
              contracts signed by both parties.
            </p>
          </section>

          {/* 3. Consultation Bookings */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              3. Consultation Bookings
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              The consultation form on our website allows you to express interest in our services.
              When you submit the form, you are redirected to WhatsApp to begin a conversation with
              our team. Submitting the form does not constitute a booking confirmation or a binding
              contract.
            </p>
            <p className="font-body text-base leading-relaxed text-slate">
              A consultation is confirmed only when our team explicitly acknowledges it via written
              communication (WhatsApp, email, or otherwise). We reserve the right to decline any
              inquiry at our discretion, without obligation to provide a reason.
            </p>
          </section>

          {/* 4. Intellectual Property */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              4. Intellectual Property
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              All content on this Site — including architectural designs, drawings, renderings,
              photographs, project portfolios, written content, and the RokVilla brand identity —
              is the exclusive property of RokVilla and is protected under applicable Indian
              copyright, trademark, and intellectual property laws.
            </p>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              You may not reproduce, distribute, modify, republish, or commercially exploit any
              content from this Site without our prior written consent. Sharing content for
              personal, non-commercial reference with appropriate attribution is permitted.
            </p>
            <p className="font-body text-base leading-relaxed text-slate">
              Architectural designs and drawings produced under a signed project agreement remain
              the intellectual property of RokVilla until full payment is received, unless
              otherwise specified in the project contract.
            </p>
          </section>

          {/* 5. Accuracy of Information */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              5. Accuracy of Information
            </h2>
            <p className="font-body text-base leading-relaxed text-slate">
              We strive to keep information on the Site accurate and up to date. However, pricing,
              package details, timelines, and availability shown on the Site are indicative only
              and may change. Nothing on the Site constitutes a legally binding offer. All specific
              project details, costs, and commitments are governed exclusively by the written
              contract entered into between you and RokVilla.
            </p>
          </section>

          {/* 6. Limitation of Liability */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              6. Limitation of Liability
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              To the fullest extent permitted by applicable law, RokVilla shall not be liable for
              any indirect, incidental, special, or consequential damages arising from:
            </p>
            <ul className="space-y-2 pl-5">
              {[
                'Your use of, or inability to use, the Site',
                'Reliance on information published on the Site',
                'Unauthorised access to or alteration of your data',
                'Any matter beyond our reasonable control',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-body text-base leading-relaxed text-slate"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-body text-base leading-relaxed text-slate">
              Our total liability for any claim arising from use of the Site, where not excluded by
              law, shall not exceed ₹10,000 (Indian Rupees ten thousand). This limitation does not
              apply to liability that cannot be excluded under applicable law.
            </p>
          </section>

          {/* 7. Third-Party Links */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              7. Third-Party Links &amp; Services
            </h2>
            <p className="font-body text-base leading-relaxed text-slate">
              The Site may contain links to third-party websites or services (such as WhatsApp,
              Instagram, or Mapbox). These links are provided for convenience only. We are not
              responsible for the content, privacy practices, or terms of any third-party service.
              Accessing third-party links is at your own risk.
            </p>
          </section>

          {/* 8. User Conduct */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              8. User Conduct
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              When using this Site, you agree not to:
            </p>
            <ul className="space-y-2 pl-5">
              {[
                'Submit false, misleading, or fraudulent information through any form',
                'Attempt to gain unauthorised access to any part of the Site or its infrastructure',
                'Use automated tools to scrape, copy, or extract content from the Site',
                'Engage in any conduct that disrupts or damages the Site or its users',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-body text-base leading-relaxed text-slate"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 9. Governing Law */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              9. Governing Law &amp; Jurisdiction
            </h2>
            <p className="font-body text-base leading-relaxed text-slate">
              These Terms are governed by and construed in accordance with the laws of India. Any
              disputes arising out of or in connection with these Terms or your use of the Site
              shall be subject to the exclusive jurisdiction of the courts in{' '}
              <strong className="font-medium text-obsidian">
                Hubballi, Karnataka, India
              </strong>
              . By using the Site, you consent to this jurisdiction.
            </p>
          </section>

          {/* 10. Severability */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              10. Severability
            </h2>
            <p className="font-body text-base leading-relaxed text-slate">
              If any provision of these Terms is found to be unlawful, void, or unenforceable under
              applicable law, that provision shall be deemed severable and shall not affect the
              validity and enforceability of the remaining provisions.
            </p>
          </section>

          {/* 11. Contact */}
          <section className="rounded-lg border border-obsidian/10 bg-parchment p-8">
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              11. Contact Us
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              For questions about these Terms or our services, please reach us at:
            </p>
            <address className="not-italic space-y-2">
              <p className="font-body text-base font-medium text-obsidian">RokVilla</p>
              <p className="font-body text-sm text-slate">Hubballi · Dharwad · Ballari, Karnataka, India</p>
              <p className="font-body text-sm text-slate">
                Email:{' '}
                <a
                  href="mailto:home@rokvilla.com"
                  className="text-terracotta underline underline-offset-2 hover:opacity-80"
                >
                  home@rokvilla.com
                </a>
              </p>
              <p className="font-body text-sm text-slate">
                Phone:{' '}
                <a
                  href="tel:+917899232229"
                  className="text-terracotta underline underline-offset-2 hover:opacity-80"
                >
                  +91 78992 32229
                </a>{' '}
                /{' '}
                <a
                  href="tel:+917899242229"
                  className="text-terracotta underline underline-offset-2 hover:opacity-80"
                >
                  +91 78992 42229
                </a>
              </p>
            </address>
          </section>

        </div>
      </div>
    </section>
  )
}
