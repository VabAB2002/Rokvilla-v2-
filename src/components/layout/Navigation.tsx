'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useScrollState } from '@/hooks/useScrollState'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsLowPowerDevice } from '@/hooks/useIsLowPowerDevice'
import { MenuOverlay } from '@/components/layout/MenuOverlay'

/* Routes with light (white) backgrounds — navbar uses dark text */
const LIGHT_BG_ROUTES = ['/design', '/furnish', '/build', '/projects'] as const

const LEFT_LINKS = [
  { label: 'Home', href: '/' },
] as const

const SERVICE_CHILDREN = [
  { label: 'Design', href: '/design' },
  { label: 'Build', href: '/build' },
  { label: 'Furnish', href: '/furnish' },
] as const

const RIGHT_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Locations', href: '/#locations' },
] as const

const LINK_CLASS =
  'font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-bone/80 transition-colors duration-300 hover:text-terracotta'

const DIVIDER = 'h-4 w-px bg-bone/20'

export function Navigation() {
  const pathname = usePathname()
  const isLightBg = LIGHT_BG_ROUTES.some((r) => pathname === r)
  const { direction, isScrolled } = useScrollState()
  const isHidden = direction === 'down' && isScrolled
  const reducedMotion = useReducedMotion()
  const isLowPower = useIsLowPowerDevice()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const servicesBtnRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleServices = useCallback(() => {
    setIsServicesOpen((prev) => !prev)
  }, [])

  const closeServices = useCallback(() => {
    setIsServicesOpen(false)
  }, [])

  // Body + html scroll lock when menu overlay is open (iOS-safe)
  useEffect(() => {
    if (!isMenuOpen) return
    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const html = document.documentElement
    const { body } = document
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    }
    // Lock both html and body — iOS Safari needs both
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }
    return () => {
      html.style.overflow = prev.htmlOverflow
      body.style.overflow = prev.bodyOverflow
      body.style.position = prev.bodyPosition
      body.style.top = prev.bodyTop
      body.style.width = prev.bodyWidth
      body.style.paddingRight = prev.bodyPaddingRight
      window.scrollTo(0, scrollY)
    }
  }, [isMenuOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isMenuOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  // Don't hide nav when menu is open
  const shouldHide = isHidden && !isMenuOpen
  const hamburgerDuration = reducedMotion ? 0.01 : undefined
  // When scrolled, always use dark text on white bg; otherwise use route-based colors
  const useDarkText = (isScrolled && !isMenuOpen) || isLightBg
  // Hamburger lines: always light on dark overlay, otherwise follow useDarkText
  const lineColor = isMenuOpen ? 'bg-bone' : useDarkText ? 'bg-charcoal' : 'bg-bone'
  const linkClass = useDarkText
    ? 'font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal/80 transition-colors duration-300 hover:text-terracotta'
    : LINK_CLASS
  const dividerClass = useDarkText ? 'h-4 w-px bg-charcoal/20' : DIVIDER


  const hamburgerLines = (
    <div className="flex flex-col gap-1.5">
      <motion.span
        animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={hamburgerDuration ? { duration: hamburgerDuration } : undefined}
        className={`block h-[1.5px] w-5 origin-center transition-colors duration-300 ${lineColor}`}
      />
      <motion.span
        animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={hamburgerDuration ? { duration: hamburgerDuration } : undefined}
        className={`block h-[1.5px] w-5 transition-colors duration-300 ${lineColor}`}
      />
      <motion.span
        animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={hamburgerDuration ? { duration: hamburgerDuration } : undefined}
        className={`block h-[1.5px] w-5 origin-center transition-colors duration-300 ${lineColor}`}
      />
    </div>
  )

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-[60] w-full transition-all duration-300 ${
          shouldHide ? '-translate-y-full' : 'translate-y-0'
        } ${isScrolled && !isMenuOpen ? (isLowPower ? 'bg-white shadow-sm' : 'bg-white/95 shadow-sm backdrop-blur-md') : ''}`}
        aria-label="Main navigation"
      >
        {/* Desktop: hamburger left + centered links + spacer right */}
        <div className="hidden lg:flex lg:items-center lg:px-10 lg:py-5">
          {/* Hamburger */}
          <button
            type="button"
            onClick={toggleMenu}
            className="flex h-11 w-11 shrink-0 items-center justify-center"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="menu-overlay"
          >
            {hamburgerLines}
          </button>

          {/* Centered nav links — fade out when overlay is open */}
          <div
            className={`flex flex-1 items-center justify-center transition-opacity duration-300 ${
              isMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex items-center gap-5">
              {LEFT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}

              {/* Services with keyboard-accessible dropdown */}
              <div
                className="relative -mb-2 pb-2"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setIsServicesOpen(false)
                  }
                }}
              >
                <button
                  ref={servicesBtnRef}
                  type="button"
                  aria-expanded={isServicesOpen}
                  onClick={toggleServices}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      closeServices()
                      servicesBtnRef.current?.focus()
                    }
                  }}
                  className={`${linkClass} flex items-center gap-1`}
                >
                  Services
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="absolute left-1/2 top-full">
                    <div className="-translate-x-1/2 pt-2">
                      <div
                        className={`rounded-sm py-2 backdrop-blur-xl ${useDarkText ? 'bg-white/60 ring-1 ring-charcoal/5' : 'bg-void/60 ring-1 ring-white/10'}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            closeServices()
                            servicesBtnRef.current?.focus()
                          }
                        }}
                      >
                        {SERVICE_CHILDREN.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeServices}
                            className={`block whitespace-nowrap px-5 py-2 font-body text-[11px] font-medium uppercase tracking-[0.1em] transition-colors duration-200 hover:text-terracotta ${useDarkText ? 'text-charcoal/70' : 'text-bone/70'}`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <span className={dividerClass} aria-hidden="true" />
              <Link href="/" className="relative flex h-10 w-20 shrink-0 items-center transition-opacity duration-300 hover:opacity-70">
                <Image
                  src={useDarkText ? '/logo/rok-logo-black.png' : '/logo/rok-logo-white.png'}
                  alt="RokVilla"
                  width={1024}
                  height={576}
                  className="h-full w-full scale-[1.7] object-contain"
                  priority
                />
              </Link>
              <span className={dividerClass} aria-hidden="true" />

              {RIGHT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Invisible spacer to balance hamburger */}
          <div className="w-11 shrink-0" aria-hidden="true" />
        </div>

        {/* Mobile: hamburger left + centered wordmark */}
        <div className="relative flex h-14 items-center px-4 lg:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="menu-overlay"
          >
            {hamburgerLines}
          </button>

          <Link
            href="/"
            className="absolute left-1/2 flex h-9 w-[72px] -translate-x-1/2 items-center transition-opacity duration-300"
          >
            <Image
              src={useDarkText ? '/logo/rok-logo-black.png' : '/logo/rok-logo-white.png'}
              alt="RokVilla"
              width={1024}
              height={576}
              className="h-full w-full scale-[1.7] object-contain"
              priority
            />
          </Link>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}
