import Link from 'next/link'
import Image from 'next/image'
import { SOCIAL_LINKS } from '@/lib/constants/contact'

const FOOTER_LINKS = {
  company: [
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/#consultation' },
  ],
  services: [
    { label: 'Design', href: '/design' },
    { label: 'Build Packages', href: '/build' },
    { label: 'Furnish', href: '/furnish' },
  ],
  locations: [
    { label: 'Hubballi', href: '/#locations' },
    { label: 'Dharwad', href: '/#locations' },
    { label: 'Ballari', href: '/#locations' },
  ],
} as const

type LinkGroup = keyof typeof FOOTER_LINKS

const LINK_GROUPS: ReadonlyArray<{ readonly key: LinkGroup; readonly title: string }> = [
  { key: 'company', title: 'Company' },
  { key: 'services', title: 'Services' },
  { key: 'locations', title: 'Locations' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void" aria-label="Site footer">
      <div className="relative mx-auto max-w-[1440px] px-6 pt-12 pb-24 md:px-10 md:pt-20 md:pb-10 lg:px-16">
        {/* ─── Mobile layout ─── */}
        <div className="md:hidden">
          {/* Brand — centered */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="relative h-8 w-14 shrink-0 overflow-hidden">
                <Image
                  src="/logo/rok-logo-white.png"
                  alt=""
                  width={1024}
                  height={576}
                  className="absolute inset-0 h-full w-full scale-[1.6] object-contain opacity-90"
                />
              </div>
              <span className="h-5 w-px bg-bone/20" />
              <span className="font-logo text-[15px] font-semibold uppercase tracking-[0.14em] text-bone/90">
                ROKVILLA
              </span>
            </Link>
            <p className="mt-2.5 max-w-[260px] font-body text-[11px] leading-relaxed text-stone/70">
              Crafting spaces that stand the test of time.
              Premium architecture &amp; construction across Karnataka.
            </p>
          </div>

          {/* Divider */}
          <div className="mx-auto my-6 h-px w-16 bg-bone/[0.08]" />

          {/* Link columns — 3-col centered grid */}
          <div className="grid grid-cols-3">
            {LINK_GROUPS.map((group) => (
              <div key={group.key} className="flex flex-col items-center text-center">
                <h4 className="mb-2 font-accent text-[11px] font-semibold uppercase tracking-[0.14em] text-bone/70">
                  {group.title}
                </h4>
                <ul className="flex flex-col items-center">
                  {FOOTER_LINKS[group.key].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-[44px] items-center font-body text-[12px] text-stone/80 transition-colors duration-200 hover:text-brass-light active:text-brass-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-auto mt-5 mb-4 h-px w-16 bg-bone/[0.08]" />

          {/* Bottom bar */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/[0.06] text-stone/60 transition-colors duration-200 hover:border-brass-light/30 hover:text-brass-light active:text-brass-light"
                >
                  <svg
                    className="h-[18px] w-[18px]"
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
            <p className="mt-1 font-body text-[10px] text-stone/40">
              &copy; {new Date().getFullYear()} ROKVILLA. All rights reserved.
            </p>
          </div>
        </div>

        {/* ─── Desktop layout (md+) ─── */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8 lg:gap-16">
            {/* Brand column */}
            <div>
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/logo/rok-logo-white.png"
                  alt="RokVilla"
                  width={1024}
                  height={576}
                  className="-ml-[26px] h-16 w-auto opacity-90 md:h-18"
                />
                <span className="-ml-5 h-8 w-px bg-bone/20" />
                <span className="ml-2 font-logo text-xl font-semibold uppercase tracking-[0.12em] text-bone/90">
                  ROKVILLA
                </span>
              </Link>
              <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-stone">
                Crafting spaces that stand the test of time.
                Premium architecture &amp; construction across Karnataka.
              </p>
            </div>

            {/* Link columns */}
            {LINK_GROUPS.map((group) => (
              <div key={group.key}>
                <h4 className="mb-4 font-accent text-[11px] font-semibold uppercase tracking-[0.16em] text-bone/70">
                  {group.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {FOOTER_LINKS[group.key].map((link) => (
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
            ))}
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-bone/[0.08]" />

          {/* Bottom bar */}
          <div className="flex items-center justify-between">
            <p className="font-body text-xs text-stone/60">
              &copy; {new Date().getFullYear()} ROKVILLA. All rights reserved.
            </p>
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
      </div>
    </footer>
  )
}
