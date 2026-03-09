import Link from 'next/link'
import Image from 'next/image'

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

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: '#',
    icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4z M12 15a3 3 0 110-6 3 3 0 010 6z M16.5 7.5h.01',
  },
  {
    label: 'Facebook',
    href: '#',
    icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 6a2 2 0 110-4 2 2 0 010 4z',
  },
] as const

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void" aria-label="Site footer">
      {/* Ghosted wordmark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[clamp(56px,12vw,160px)] font-light uppercase tracking-wide text-bone/[0.03] select-none">
          RokVilla
        </span>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 pt-20 pb-10 md:px-10 lg:px-16">
        {/* Main grid — stacked on mobile, 2-col on sm, 4-col on md+ */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-16">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/rok-logo-white.png"
                alt="RokVilla"
                width={1024}
                height={576}
                className="h-12 w-auto opacity-90 sm:h-16 md:h-18"
              />
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
                    className="py-1 font-body text-[13px] text-stone transition-colors duration-200 hover:text-brass-light active:text-brass-light"
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
                    className="py-1 font-body text-[13px] text-stone transition-colors duration-200 hover:text-brass-light active:text-brass-light"
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
                    className="py-1 font-body text-[13px] text-stone transition-colors duration-200 hover:text-brass-light active:text-brass-light"
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
                className="p-2 -m-2 text-stone transition-colors duration-200 hover:text-brass-light active:text-brass-light"
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
