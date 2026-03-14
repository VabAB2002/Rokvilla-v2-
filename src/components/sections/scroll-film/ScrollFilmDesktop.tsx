'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-config'
import Image from 'next/image'
import Link from 'next/link'
import { SCROLL_FILM_CHAPTERS } from './constants'

export function ScrollFilmDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
          const container = containerRef.current
          if (!container) return

          const viewport = container.querySelector<HTMLElement>('.film-viewport')
          if (!viewport) return

          const slides = container.querySelectorAll<HTMLElement>('.film-slide')
          if (slides.length === 0) return

          // Track SplitText instances for cleanup on unmount
          const splits: InstanceType<typeof SplitText>[] = []

          const scrollDistance = () => `+=${window.innerHeight * 4}`

          // Master timeline scrubbed by scroll
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: scrollDistance,
              pin: viewport,
              scrub: 1,
              anticipatePin: 1,
            },
          })

          slides.forEach((slide, i) => {
            const title = slide.querySelector<HTMLElement>('.film-title')
            const overline = slide.querySelector<HTMLElement>('.film-overline')
            const tagline = slide.querySelector<HTMLElement>('.film-tagline')
            const image = slide.querySelector<HTMLElement>('.film-image')
            const cta = slide.querySelector<HTMLElement>('.film-cta')

            // ── Chapter entrance: clip-path wipe from right ──
            if (i > 0) {
              tl.fromTo(
                slide,
                { clipPath: 'inset(0 100% 0 0)' },
                { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power2.inOut' }
              )
            }

            // ── Parallax image drift (subtle upward float) ──
            if (image) {
              tl.fromTo(
                image,
                { scale: 1.15, y: '5%' },
                { scale: 1.0, y: '-3%', duration: 2.5, ease: 'none' },
                i > 0 ? '<' : 0
              )
            }

            // ── Overline fade in ──
            if (overline) {
              tl.from(overline, {
                opacity: 0,
                x: -20,
                duration: 0.4,
              }, i > 0 ? '>-0.8' : 0.1)
            }

            // ── Kinetic title: per-character stagger reveal ──
            if (title) {
              const split = new SplitText(title, { type: 'chars', mask: 'chars' })
              splits.push(split) // track for cleanup
              tl.from(split.chars, {
                y: '100%',
                duration: 0.6,
                stagger: 0.04,
                ease: 'power3.out',
              }, '>-0.3')
            }

            // ── Tagline word-by-word reveal ──
            if (tagline) {
              const splitTagline = new SplitText(tagline, { type: 'words' })
              splits.push(splitTagline) // track for cleanup
              tl.from(splitTagline.words, {
                opacity: 0,
                y: 12,
                duration: 0.4,
                stagger: 0.03,
                ease: 'power2.out',
              }, '>-0.2')
            }

            // ── CTA link fade in ──
            if (cta) {
              tl.from(cta, {
                opacity: 0,
                y: 10,
                duration: 0.3,
              }, '>-0.1')
            }

            // ── Hold on this chapter (dwell time) ──
            if (i < slides.length - 1) {
              tl.to({}, { duration: 0.8 })
            }
          })

          // Progress bar — separate ScrollTrigger tracking the same scroll range
          const progressBar = container.querySelector<HTMLElement>('.film-progress')
          if (progressBar) {
            gsap.to(progressBar, {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: scrollDistance,
                scrub: true,
              },
            })
          }

          // Cleanup: revert SplitText instances on unmount
          // (progress bar ScrollTrigger is cleaned up by mm.revert())
          return () => {
            splits.forEach(s => s.revert())
          }
        }
      )

      // Reduced motion: clear inline clip-paths so all slides are visible
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const container = containerRef.current
        if (!container) return
        container.querySelectorAll<HTMLElement>('.film-slide').forEach((slide) => {
          slide.style.clipPath = ''
        })
      })

      // Also revert matchMedia on full unmount
      return () => {
        mm.revert()
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="hidden md:block">
      <div className="film-viewport relative h-dvh w-full overflow-hidden">
        {SCROLL_FILM_CHAPTERS.map((chapter, i) => (
          <div
            key={chapter.id}
            className={`film-slide absolute inset-0 flex items-center ${
              i > 0 ? 'will-change-[clip-path]' : ''
            }`}
            style={i > 0 ? { clipPath: 'inset(0 100% 0 0)' } : undefined}
          >
            {/* Background image with parallax wrapper */}
            <div className="film-image absolute inset-0 will-change-transform">
              <Image
                src={chapter.image}
                alt={chapter.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </div>

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-void/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-12">
              <span className="film-overline mb-4 block font-accent text-xs uppercase tracking-[0.25em] text-brass-light">
                {chapter.overline}
              </span>

              <h3 className="film-title font-display text-[clamp(4rem,10vw,8rem)] font-light leading-[0.85] text-bone">
                {chapter.title}
              </h3>

              <p className="film-tagline mt-6 max-w-lg font-body text-lg leading-relaxed text-stone">
                {chapter.tagline}
              </p>

              <Link
                href={chapter.href}
                className="film-cta mt-8 inline-flex items-center gap-3 border border-limestone/30 px-6 py-3 font-accent text-[11px] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:border-terracotta hover:text-terracotta"
              >
                Explore {chapter.title}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}

        {/* Scroll progress indicator — bottom thin line */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-limestone/20">
          <div className="film-progress h-full origin-left scale-x-0 bg-terracotta will-change-transform" />
        </div>
      </div>
    </div>
  )
}
