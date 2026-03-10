'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { MenuOverlay } from '@/components/layout/MenuOverlay'

const LEFT_LINKS = [
  { label: 'Home', href: '/' },
] as const

const SERVICE_CHILDREN = [
  { label: 'Design', href: '/design' },
  { label: 'Build', href: '/services/build' },
  { label: 'Furnish', href: '/services/furnish' },
] as const

const RIGHT_LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Locations', href: '/#locations' },
] as const

const LINK_CLASS =
  'font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-bone/80 transition-colors duration-300 hover:text-terracotta'

const DIVIDER = 'h-4 w-px bg-bone/20'

export function Navigation() {
  const isHidden = useScrollDirection(80, 10)
  const reducedMotion = useReducedMotion()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Body scroll lock when menu overlay is open (with scrollbar compensation)
  useEffect(() => {
    if (isMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
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
  const lineColor = 'bg-bone'

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
        className={`fixed left-0 top-0 z-[60] w-full transition-transform duration-300 ${
          shouldHide ? '-translate-y-full' : 'translate-y-0'
        }`}
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
            <div className="flex items-baseline gap-5">
              {LEFT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={LINK_CLASS}>
                  {link.label}
                </Link>
              ))}

              {/* Services with dropdown */}
              <div className="group relative">
                <Link href="/#services" className={LINK_CLASS}>
                  Services
                </Link>
                <div className="pointer-events-none absolute left-1/2 top-full pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="-translate-x-1/2 border border-white/10 bg-void/80 py-2 backdrop-blur-md">
                    {SERVICE_CHILDREN.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block whitespace-nowrap px-5 py-2 font-body text-[11px] font-medium uppercase tracking-[0.1em] text-bone/70 transition-colors duration-200 hover:text-terracotta"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <span className={DIVIDER} aria-hidden="true" />
              <Link
                href="/"
                className="font-accent text-[15px] uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:text-terracotta"
              >
                RokVilla
              </Link>
              <span className={DIVIDER} aria-hidden="true" />

              {RIGHT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={LINK_CLASS}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Invisible spacer to balance hamburger */}
          <div className="w-11 shrink-0" aria-hidden="true" />
        </div>

        {/* Mobile: hamburger left + wordmark right */}
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
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
            className="font-accent text-[15px] uppercase tracking-[0.2em] text-bone transition-colors duration-300"
          >
            RokVilla
          </Link>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}
