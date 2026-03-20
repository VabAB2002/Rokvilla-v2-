'use client'

import * as m from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SCROLL_FILM_CHAPTERS } from './constants'

export function ScrollFilmMobile() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="flex flex-col gap-16 px-6 md:hidden">
      {SCROLL_FILM_CHAPTERS.map((chapter, index) => (
        <m.article
          key={chapter.id}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 48 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: reducedMotion ? 0 : index * 0.05,
          }}
          className="group"
        >
          {/* Overline */}
          <span className="mb-3 block font-accent text-[11px] uppercase tracking-[0.25em] text-brass-light">
            {chapter.overline}
          </span>

          {/* Image */}
          <Link href={chapter.href} className="block" aria-hidden="true" tabIndex={-1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={chapter.image}
                alt={chapter.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-void/20 to-transparent" />

              {/* Title over image */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-[clamp(2.5rem,12vw,4rem)] font-light leading-[0.9] text-bone">
                  {chapter.title}
                </h3>
              </div>
            </div>
          </Link>

          {/* Tagline */}
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-slate">
            {chapter.tagline}
          </p>

          {/* CTA link */}
          <Link
            href={chapter.href}
            className="mt-3 inline-flex items-center gap-2 font-accent text-[11px] uppercase tracking-[0.2em] text-terracotta transition-colors hover:text-terracotta-deep"
          >
            Explore {chapter.title}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </m.article>
      ))}
    </div>
  )
}
