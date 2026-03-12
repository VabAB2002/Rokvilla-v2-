import Link from 'next/link'
import Image from 'next/image'
import { SOCIAL_LINKS } from '@/lib/constants/contact'

const FOOTER_LINKS = {
  company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  services: [
    { label: 'Design', href: '/#services' },
    { label: 'Build Packages', href: '/#services' },
    { label: 'Furnish', href: '/#services' },
  ],
  locations: [
    { label: 'Hubballi', href: '/#locations' },
    { label: 'Dharwad', href: '/#locations' },
    { label: 'Ballari', href: '/#locations' },
  ],
} as const

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void" aria-label="Site footer">
      <div className="relative mx-auto max-w-[1440px] px-6 pt-20 pb-10 md:px-10 lg:px-16">
        {/* Main grid — stacked on mobile, 2-col on sm, 4-col on md+ */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-16">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo/rok-logo-white.png"
                alt="RokVilla"
                width={1024}
                height={576}
                className="-ml-5 h-12 w-auto opacity-90 sm:-ml-[26px] sm:h-16 md:h-18"
              />
              <span className="-ml-4 h-6 w-px bg-bone/20 sm:-ml-5 sm:h-8" />
              <span className="ml-2 font-display text-lg font-light uppercase tracking-[0.12em] text-bone/90 sm:text-xl">
                RokVilla
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-stone">
              Crafting spaces that stand the test of time.
              Premium architecture &amp; construction across Karnataka.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-accent text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center py-2 font-body text-[13px] text-stone transition-colors duration-200 hover:text-brass-light active:text-brass-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-accent text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center py-2 font-body text-[13px] text-stone transition-colors duration-200 hover:text-brass-light active:text-brass-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="mb-4 font-accent text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
              Locations
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.locations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center py-2 font-body text-[13px] text-stone transition-colors duration-200 hover:text-brass-light active:text-brass-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-bone/[0.08]" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-xs text-stone/60">
            &copy; {new Date().getFullYear()} RokVilla. All rights reserved.
          </p>

          {/* Social icons — enlarged tap targets */}
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-stone transition-colors duration-200 hover:text-brass-light active:text-brass-light"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
