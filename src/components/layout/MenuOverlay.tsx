'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'

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
  { label: 'Projects', href: '/#projects' },
  { label: 'Locations', href: '/#locations' },
] as const

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

// REPLACE_ME: Update with actual contact info
const CONTACT = {
  phone: '+91 000 000 0000',
  email: 'hello@rokvilla.com',
  address: 'Hubballi, Karnataka',
} as const

interface MenuOverlayProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="menu-overlay"
          className="fixed inset-0 z-[55] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.05 : 0.15 }}
        >
          {/* Dark glass background — click to close */}
          <div
            className="absolute inset-0 bg-void/70 backdrop-blur-[48px] backdrop-saturate-150"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative flex min-h-full flex-col pt-24 lg:pt-28">
            {/* Main content: links left, contact right */}
            <div className="flex flex-1 flex-col px-8 md:px-12 lg:flex-row lg:px-20">
              {/* Navigation links */}
              <div className="flex flex-col justify-center lg:flex-1">
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
                                  className="group inline-flex items-baseline gap-3 py-1"
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
                className="my-8 lg:hidden"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.4, ease: EASE_OUT_EXPO }}
                style={{ transformOrigin: 'left' }}
              >
                <div className="h-px bg-bone/10" />
              </motion.div>

              {/* Contact + Social */}
              <motion.div
                className="flex flex-col justify-center lg:flex-1"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.25,
                  duration: reducedMotion ? 0.1 : 0.5,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <div className="flex flex-col gap-10">
                  {/* Contact info */}
                  <div>
                    <h3 className="font-accent text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
                      Get in Touch
                    </h3>
                    <div className="mt-5 flex flex-col gap-3">
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
                          className="-m-2 p-2 text-bone/50 transition-colors duration-300 hover:text-terracotta"
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
              className="flex items-center justify-between px-8 py-8 md:px-12 lg:px-20"
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
