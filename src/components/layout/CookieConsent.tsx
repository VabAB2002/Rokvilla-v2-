'use client'

import Link from 'next/link'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export function CookieConsent() {
  const { hasConsented, accept } = useCookieConsent()

  // null = still loading from localStorage, true = already consented
  if (hasConsented !== false) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[90] border-t border-limestone/20 bg-bone/95 px-6 py-4 shadow-card backdrop-blur-md md:flex md:items-center md:justify-between md:py-3"
    >
      <p className="font-body text-sm leading-relaxed text-slate">
        We use functional cookies from Sentry and Mapbox for error monitoring and
        maps.{' '}
        <Link
          href="/privacy-policy"
          className="font-medium text-terracotta-deep underline underline-offset-2 transition-colors hover:text-terracotta"
        >
          Privacy Policy
        </Link>
      </p>
      <button
        type="button"
        onClick={accept}
        className="mt-3 inline-flex min-h-[44px] items-center rounded-full border border-terracotta/30 bg-terracotta/[0.07] px-6 py-2 font-body text-[13px] font-medium uppercase tracking-[0.08em] text-terracotta transition-all duration-200 hover:border-terracotta/50 hover:bg-terracotta/[0.12] md:mt-0 md:ml-6"
      >
        Got it
      </button>
    </div>
  )
}
