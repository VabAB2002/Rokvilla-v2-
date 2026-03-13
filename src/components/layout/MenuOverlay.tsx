'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { SOCIAL_LINKS, PHONE_DISPLAY, EMAIL, ADDRESS } from '@/lib/constants/contact'

const MENU_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/#services',
    children: [
      { label: 'Design', href: '/design' },
      { label: 'Build', href: '/build' },
      { label: 'Furnish', href: '/furnish' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Locations', href: '/#locations' },
] as const

const CONTACT = {
  phone: PHONE_DISPLAY,
  email: EMAIL,
  address: ADDRESS,
} as const

interface MenuOverlayProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const reducedMotion = useReducedMotion()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Set inert on all content outside the nav when overlay is open to trap focus
  useEffect(() => {
    if (!isOpen) return
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    const targets = [
      main,
      footer,
      ...Array.from(document.querySelectorAll('[data-bottom-strip], [data-floating-ctas]')),
    ].filter((el): el is Element => el !== null)

    targets.forEach((el) => el.setAttribute('inert', ''))
    return () => {
      targets.forEach((el) => el.removeAttribute('inert'))
    }
  }, [isOpen])

  // Fix 6: Auto-focus first menu link when overlay opens
  useEffect(() => {
    if (!isOpen) return
    // Small delay to let the animation start before stealing focus
    const id = setTimeout(() => {
      firstLinkRef.current?.focus()
    }, 50)
    return () => clearTimeout(id)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="menu-overlay"
          className="fixed inset-0 z-[55] touch-none overflow-hidden overscroll-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.05 : 0.15 }}
        >
          {/* Dark glass background — click to close */}
          <div
            className="absolute inset-0 bg-void/70 backdrop-blur-[16px] backdrop-saturate-150 lg:backdrop-blur-[48px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Content – pointer-events-none so background clicks reach the backdrop */}
          <div className="pointer-events-none relative flex h-full flex-col pt-16 lg:pt-28">
            {/* Main content: links left, contact right */}
            <div className="flex min-h-0 flex-1 flex-col px-8 md:px-12 lg:flex-row lg:px-20">
              {/* Navigation links */}
              <div className="pointer-events-auto flex flex-col justify-center lg:flex-1">
                <nav aria-label="Menu navigation">
                  <ul className="flex flex-col gap-1 lg:gap-2">
                    {MENU_LINKS.map((link, i) => (
                      <motion.li
                        key={link.href}
                        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: reducedMotion ? 0 : 0.1 + i * 0.05,
                          duration: reducedMotion ? 0.1 : 0.5,
                          ease: EASE_OUT_EXPO,
                        }}
                      >
                        <Link
                          ref={i === 0 ? firstLinkRef : undefined}
                          href={link.href}
                          onClick={onClose}
                          className="group inline-flex items-baseline gap-4 py-2 lg:py-3"
                        >
                          <span className="font-body text-[11px] tabular-nums text-bone/25 transition-colors duration-300 group-hover:text-terracotta/60">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="relative font-display text-3xl font-light text-bone/90 transition-colors duration-300 group-hover:text-bone sm:text-4xl lg:text-5xl xl:text-6xl">
                            {link.label}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-500 ease-out group-hover:w-full" />
                          </span>
                        </Link>

                        {/* Sub-links */}
                        {'children' in link && (
                          <ul className="ml-10 mt-1 flex flex-col gap-0.5 lg:ml-12">
                            {link.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="group inline-flex min-h-[44px] items-center gap-3"
                                >
                                  <span className="h-px w-3 bg-bone/20 transition-colors duration-300 group-hover:bg-terracotta/50" aria-hidden="true" />
                                  <span className="font-body text-sm font-light tracking-wide text-bone/50 transition-colors duration-300 group-hover:text-bone/90 lg:text-base">
                                    {child.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Vertical divider — desktop */}
              <motion.div
                className="hidden lg:mx-16 lg:flex lg:items-center"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                <div className="h-64 w-px bg-bone/10" />
              </motion.div>

              {/* Horizontal divider — mobile */}
              <motion.div
                className="my-4 lg:hidden"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.4, ease: EASE_OUT_EXPO }}
                style={{ transformOrigin: 'left' }}
              >
                <div className="h-px bg-bone/10" />
              </motion.div>

              {/* Contact + Social */}
              <motion.div
                className="pointer-events-auto flex flex-col justify-center lg:flex-1"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.25,
                  duration: reducedMotion ? 0.1 : 0.5,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <div className="flex flex-col gap-6 lg:gap-10">
                  {/* Contact info */}
                  <div>
                    <h3 className="font-accent text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
                      Get in Touch
                    </h3>
                    <div className="mt-3 flex flex-col gap-2 lg:mt-5 lg:gap-3">
                      <a
                        href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                        className="font-body text-base text-bone/70 transition-colors duration-300 hover:text-terracotta lg:text-lg"
                      >
                        {CONTACT.phone}
                      </a>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="font-body text-base text-bone/70 transition-colors duration-300 hover:text-terracotta lg:text-lg"
                      >
                        {CONTACT.email}
                      </a>
                      <p className="font-body text-base text-bone/40 lg:text-lg">
                        {CONTACT.address}
                      </p>
                    </div>
                  </div>

                  {/* Social links */}
                  <div>
                    <h3 className="font-accent text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
                      Follow Us
                    </h3>
                    <div className="mt-4 flex items-center gap-5">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-bone/50 transition-colors duration-300 hover:text-terracotta"
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
              </motion.div>
            </div>

            {/* Bottom bar */}
            <motion.div
              className="pointer-events-auto flex items-center justify-between px-8 py-4 md:px-12 lg:px-20 lg:py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <p className="font-body text-xs text-bone/25">
                &copy; {new Date().getFullYear()} RokVilla. All rights reserved.
              </p>
              <span className="font-accent text-xs uppercase tracking-[0.15em] text-bone/15">
                RokVilla
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
