import type { Metadata } from 'next'
import { EMAIL, PHONE_NUMBER, PHONE_NUMBER_2, PHONE_DISPLAY, PHONE_DISPLAY_2 } from '@/lib/constants/contact'
import { SITE_URL } from '@/lib/seo/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how RokVilla collects, uses, and protects your personal information in accordance with the Digital Personal Data Protection Act 2023.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
}

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-bone py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 border-b border-obsidian/10 pb-10">
          <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-terracotta">
            Legal
          </p>
          <h1 className="font-heading text-4xl font-light text-obsidian md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 font-body text-sm text-slate">
            Last updated: March 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <p className="font-body text-base leading-relaxed text-slate">
            RokVilla (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is a premium
            architecture, construction and interior design company based in Karnataka, India. This
            Privacy Policy explains what information we collect when you use our website
            (rokvilla.com), how we use it, and your rights under the{' '}
            <strong className="font-medium text-obsidian">
              Digital Personal Data Protection Act, 2023 (DPDP Act)
            </strong>
            .
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-slate">
            By using our website, you agree to the practices described in this policy.
          </p>
        </div>

        <div className="space-y-12">

          {/* 1. Information We Collect */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              1. Information We Collect
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              We collect information only when you choose to contact us through our consultation
              form. This may include:
            </p>
            <ul className="space-y-2 pl-5">
              {[
                'Full name',
                'Email address',
                'Phone number',
                'Project category (residential, commercial, or interior)',
                'Preferred consultation type (in-person or virtual)',
                'Project location (city or area)',
                'A brief message describing your project',
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
              We do not use first-party cookies or track you across other websites.
              Our third-party services (Sentry for error monitoring, Mapbox for interactive maps) may
              set functional cookies on your device. These are used solely for technical performance
              and error detection, not for tracking or advertising.
            </p>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              2. How We Use Your Information
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              When you submit the consultation form, your details are formatted into a message and
              you are redirected to WhatsApp to initiate a conversation with our team directly.{' '}
              <strong className="font-medium text-obsidian">
                We do not store form data on our servers.
              </strong>{' '}
              No database or backend service receives or retains your personal information through
              this process.
            </p>
            <p className="font-body text-base leading-relaxed text-slate">
              Any subsequent communication happens over WhatsApp, which is governed by Meta&rsquo;s
              own privacy policy.
            </p>
          </section>

          {/* 3. Third-Party Services */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              3. Third-Party Services
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              Our website uses the following third-party services, each with its own data practices:
            </p>

            <div className="space-y-6">
              <div className="rounded-lg border border-obsidian/10 bg-parchment p-6">
                <h3 className="mb-2 font-heading text-lg font-light text-obsidian">
                  Vercel Analytics
                </h3>
                <p className="font-body text-sm leading-relaxed text-slate">
                  We use Vercel Analytics to understand how visitors use our website (page views,
                  referrers, and device types). Vercel Analytics is{' '}
                  <strong className="font-medium text-obsidian">cookie-free</strong> and does not
                  track individuals across sessions or sites. No personally identifiable information
                  is collected. See{' '}
                  <a
                    href="https://vercel.com/docs/analytics/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta underline underline-offset-2 hover:opacity-80"
                  >
                    Vercel&rsquo;s privacy documentation
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-lg border border-obsidian/10 bg-parchment p-6">
                <h3 className="mb-2 font-heading text-lg font-light text-obsidian">
                  Sentry
                </h3>
                <p className="font-body text-sm leading-relaxed text-slate">
                  We use Sentry for error monitoring to detect and fix technical issues on the site.
                  Sentry may capture session replays to help diagnose errors. All replays are
                  configured to{' '}
                  <strong className="font-medium text-obsidian">
                    mask text and block media
                  </strong>
                  , meaning form inputs and personal content are never recorded. Sentry collects
                  technical data such as browser type, error stack traces, and anonymised IP-based
                  location. See{' '}
                  <a
                    href="https://sentry.io/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta underline underline-offset-2 hover:opacity-80"
                  >
                    Sentry&rsquo;s privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-lg border border-obsidian/10 bg-parchment p-6">
                <h3 className="mb-2 font-heading text-lg font-light text-obsidian">
                  Mapbox
                </h3>
                <p className="font-body text-sm leading-relaxed text-slate">
                  We use Mapbox to display interactive maps showing our office locations. When the
                  map loads, your browser makes a request to Mapbox servers, which may log your IP
                  address as part of standard server logging. We do not use Mapbox to collect or
                  store any personal data beyond what Mapbox logs in its own systems. See{' '}
                  <a
                    href="https://www.mapbox.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta underline underline-offset-2 hover:opacity-80"
                  >
                    Mapbox&rsquo;s privacy policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* 4. Data Retention */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              4. Data Retention
            </h2>
            <p className="font-body text-base leading-relaxed text-slate">
              Because consultation form data is not stored on our servers, there is no server-side
              retention period for that information. Any data exchanged over WhatsApp is subject to
              Meta&rsquo;s retention policies. Technical logs held by Sentry and Vercel are subject
              to their respective data retention policies (typically 30–90 days).
            </p>
          </section>

          {/* 5. Your Rights under DPDP Act 2023 */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              5. Your Rights under the DPDP Act 2023
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              Under India&rsquo;s Digital Personal Data Protection Act, 2023, you have the
              following rights regarding personal data we process:
            </p>
            <ul className="space-y-3 pl-5">
              {[
                {
                  right: 'Right to access',
                  desc: 'Request a summary of the personal data we hold about you.',
                },
                {
                  right: 'Right to correction',
                  desc: 'Request correction of inaccurate or incomplete personal data.',
                },
                {
                  right: 'Right to erasure',
                  desc: 'Request deletion of your personal data where we are no longer required to retain it.',
                },
                {
                  right: 'Right to withdraw consent',
                  desc: 'Withdraw consent for processing at any time, without affecting the lawfulness of prior processing.',
                },
                {
                  right: 'Right to grievance redressal',
                  desc: 'Raise a grievance with us, which we will address within a reasonable time.',
                },
              ].map(({ right, desc }) => (
                <li
                  key={right}
                  className="flex items-start gap-2 font-body text-base leading-relaxed text-slate"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                  <span>
                    <strong className="font-medium text-obsidian">{right}:</strong> {desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-body text-base leading-relaxed text-slate">
              To exercise any of these rights, contact us at the details below.
            </p>
          </section>

          {/* 6. Data Security */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              6. Data Security
            </h2>
            <p className="font-body text-base leading-relaxed text-slate">
              Our website is served over HTTPS. Since we do not maintain a backend database of
              personal information, the risk of a data breach involving your consultation details is
              minimal. We rely on Vercel&rsquo;s infrastructure, which maintains enterprise-grade
              security standards, to host our website.
            </p>
          </section>

          {/* 7. Children's Privacy */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              7. Children&rsquo;s Privacy
            </h2>
            <p className="font-body text-base leading-relaxed text-slate">
              Our website and services are not directed at children under the age of 18. We do not
              knowingly collect personal data from minors. If you believe a minor has submitted
              personal data to us, please contact us and we will take appropriate steps.
            </p>
          </section>

          {/* 8. Changes to This Policy */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              8. Changes to This Policy
            </h2>
            <p className="font-body text-base leading-relaxed text-slate">
              We may update this Privacy Policy from time to time. When we do, we will revise the
              &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review
              this policy periodically. Continued use of the website after changes constitutes
              acceptance of the revised policy.
            </p>
          </section>

          {/* 9. Contact Us */}
          <section className="rounded-lg border border-obsidian/10 bg-parchment p-8">
            <h2 className="mb-4 font-heading text-2xl font-light text-obsidian md:text-3xl">
              9. Contact Us
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-slate">
              For any privacy-related questions, data requests, or grievances, please reach us at:
            </p>
            <address className="not-italic space-y-2">
              <p className="font-body text-base font-medium text-obsidian">RokVilla</p>
              <p className="font-body text-sm text-slate">Hubballi · Dharwad · Ballari, Karnataka, India</p>
              <p className="font-body text-sm text-slate">
                Email:{' '}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-terracotta underline underline-offset-2 hover:opacity-80"
                >
                  {EMAIL}
                </a>
              </p>
              <p className="font-body text-sm text-slate">
                Phone:{' '}
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="text-terracotta underline underline-offset-2 hover:opacity-80"
                >
                  {PHONE_DISPLAY}
                </a>{' '}
                /{' '}
                <a
                  href={`tel:${PHONE_NUMBER_2}`}
                  className="text-terracotta underline underline-offset-2 hover:opacity-80"
                >
                  {PHONE_DISPLAY_2}
                </a>
              </p>
            </address>
          </section>

        </div>
      </div>
    </section>
  )
}
