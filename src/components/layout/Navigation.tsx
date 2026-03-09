'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { MenuOverlay } from '@/components/layout/MenuOverlay'

const LEFT_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Design', href: '/design' },
] as const

const RIGHT_LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Locations', href: '/#locations' },
] as const

const GLASS =
  'border-white/20 bg-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-[28px] backdrop-saturate-[1.8]'

const LINK_CLASS =
  'font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-obsidian/90 transition-colors duration-300 hover:text-terracotta'

const DIVIDER = 'h-4 w-px bg-obsidian/20'

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
  const lineColor = isMenuOpen ? 'bg-bone' : 'bg-obsidian'

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
        {/* Desktop: hamburger left + centered glass pill */}
        <div className="hidden lg:flex lg:items-center lg:gap-4 lg:px-10 lg:pt-5">
          {/* Hamburger — glass circle */}
          <div
            className={`shrink-0 rounded-full border transition-all duration-300 ${
              isMenuOpen ? 'border-transparent bg-transparent' : GLASS
            }`}
          >
            <button
              type="button"
              onClick={toggleMenu}
              className="flex h-11 w-11 items-center justify-center"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="menu-overlay"
            >
              {hamburgerLines}
            </button>
          </div>

          {/* Centered pill — fades out when overlay is open */}
          <div className="flex flex-1 justify-center">
            <div
              className={`rounded-full border px-8 py-2.5 transition-all duration-300 ${
                isMenuOpen
                  ? 'pointer-events-none border-transparent opacity-0'
                  : `${GLASS} opacity-100`
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-5">
                  {LEFT_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className={LINK_CLASS}>
                      {link.label}
                    </Link>
                  ))}
                </div>
                <span className={DIVIDER} aria-hidden="true" />
                <Link
                  href="/"
                  className="font-accent text-[15px] uppercase tracking-[0.2em] text-obsidian transition-colors duration-300 hover:text-terracotta"
                >
                  RokVilla
                </Link>
                <span className={DIVIDER} aria-hidden="true" />
                <div className="flex items-center gap-5">
                  {RIGHT_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className={LINK_CLASS}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Invisible spacer to balance hamburger for true centering */}
          <div className="w-11 shrink-0" aria-hidden="true" />
        </div>

        {/* Mobile: hamburger left + wordmark right */}
        <div className="px-4 pt-3 lg:hidden">
          <div
            className={`rounded-2xl border px-3 py-1 transition-all duration-300 ${
              isMenuOpen ? 'border-transparent bg-transparent' : GLASS
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Hamburger on LEFT */}
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

              {/* Wordmark on RIGHT */}
              <Link
                href="/"
                className={`font-accent text-[15px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isMenuOpen ? 'text-bone' : 'text-obsidian'
                }`}
              >
                RokVilla
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}
