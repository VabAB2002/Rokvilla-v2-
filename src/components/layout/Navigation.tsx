'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'

const LEFT_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
] as const

const RIGHT_LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Locations', href: '/#locations' },
] as const

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]

export function Navigation() {
  const isScrolled = useScrollPosition(60)
  const reducedMotion = useReducedMotion()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  // Body scroll lock when mobile drawer is open (with scrollbar compensation)
  useEffect(() => {
    if (isMobileOpen) {
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
  }, [isMobileOpen])

  const showDarkLogo = isScrolled || isMobileOpen

  const linkClass = `font-body text-[13px] font-normal uppercase tracking-[0.06em] transition-colors duration-200 ${
    isScrolled
      ? 'text-slate hover:text-terracotta'
      : 'text-bone/80 hover:text-bone'
  }`

  const hamburgerDuration = reducedMotion ? 0.01 : undefined

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/92 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-5 md:px-10 lg:px-16">
        {/* Desktop: 3-column centered layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* Left links */}
          <div className="flex items-center justify-end gap-10">
            {LEFT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link href="/" className="relative flex items-center justify-center px-10">
            <Image
              src="/logo/rok-logo-black.png"
              alt="RokVilla"
              width={1024}
              height={576}
              className={`h-10 sm:h-14 lg:h-18 w-auto transition-opacity duration-300 ${showDarkLogo ? 'opacity-100' : 'opacity-0'}`}
              priority
            />
            <Image
              src="/logo/rok-logo-white.png"
              alt=""
              width={1024}
              height={576}
              className={`absolute h-10 sm:h-14 lg:h-18 w-auto transition-opacity duration-300 ${showDarkLogo ? 'opacity-0' : 'opacity-100'}`}
              priority
              aria-hidden="true"
            />
          </Link>

          {/* Right links */}
          <div className="flex items-center justify-start gap-10">
            {RIGHT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile: logo left + hamburger right */}
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" className="relative flex items-center">
            <Image
              src="/logo/rok-logo-black.png"
              alt="RokVilla"
              width={1024}
              height={576}
              className={`h-10 sm:h-14 w-auto transition-opacity duration-300 ${showDarkLogo ? 'opacity-100' : 'opacity-0'}`}
              priority
            />
            <Image
              src="/logo/rok-logo-white.png"
              alt=""
              width={1024}
              height={576}
              className={`absolute h-10 sm:h-14 w-auto transition-opacity duration-300 ${showDarkLogo ? 'opacity-0' : 'opacity-100'}`}
              priority
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            onClick={toggleMobile}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-drawer"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={hamburgerDuration ? { duration: hamburgerDuration } : undefined}
                className={`block h-[1.5px] w-6 origin-center transition-colors duration-300 ${
                  isScrolled || isMobileOpen ? 'bg-obsidian' : 'bg-bone'
                }`}
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={hamburgerDuration ? { duration: hamburgerDuration } : undefined}
                className={`block h-[1.5px] w-6 transition-colors duration-300 ${
                  isScrolled || isMobileOpen ? 'bg-obsidian' : 'bg-bone'
                }`}
              />
              <motion.span
                animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={hamburgerDuration ? { duration: hamburgerDuration } : undefined}
                className={`block h-[1.5px] w-6 origin-center transition-colors duration-300 ${
                  isScrolled || isMobileOpen ? 'bg-obsidian' : 'bg-bone'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: EASE_OUT_EXPO }}
            id="mobile-nav-drawer"
            className="overflow-hidden bg-white/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-8 pt-2">
              {ALL_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : i * 0.06,
                    duration: reducedMotion ? 0.1 : 0.3,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className="block py-4 font-display text-2xl font-light text-obsidian transition-colors hover:text-terracotta active:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
