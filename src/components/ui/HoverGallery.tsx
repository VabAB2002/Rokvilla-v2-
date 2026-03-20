'use client'

import { useState, useCallback, useMemo, type ReactNode } from 'react'
import * as m from 'framer-motion/m'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeGalleryTransition, EASE_OUT_EXPO } from '@/lib/motion'

/* ── Public types ── */

export interface HoverGalleryItem {
  readonly id: string
  readonly label: string
  readonly sublabel: string
  readonly image: string
  readonly href?: string
}

export interface HoverGalleryProps {
  readonly items: ReadonlyArray<HoverGalleryItem>
  /** Text for the mobile CTA linking to active item. Omit to hide. */
  readonly mobileCta?: string
  /** Flip layout: image on left, labels on right. Default false (labels left, image right). */
  readonly reversed?: boolean
  /** Custom panel renderer. Receives activeId and full items list. Replaces the default image panel. */
  readonly renderPanel?: (activeId: string, items: ReadonlyArray<HoverGalleryItem>) => ReactNode
}

/* ── Internal: Desktop row ── */

function GalleryRow({
  item,
  active,
  onActivate,
}: {
  readonly item: HoverGalleryItem
  readonly active: boolean
  readonly onActivate: () => void
}) {
  const inner = (
    <>
      {/* Active indicator bar */}
      <m.div
        className="absolute bottom-0 left-0 h-[2px] bg-terracotta"
        initial={false}
        animate={{ width: active ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <m.h3
            className="font-display text-xl font-medium uppercase md:text-2xl lg:text-3xl"
            initial={false}
            animate={{ color: active ? '#1C1916' : 'rgba(28,25,22,0.3)' }}
            transition={{ duration: 0.3 }}
          >
            {item.label}
          </m.h3>
          <m.p
            className="mt-1 font-body text-[11px] tracking-wide md:text-xs"
            initial={false}
            animate={{ color: active ? 'rgba(92,82,72,0.9)' : 'rgba(92,82,72,0.4)' }}
            transition={{ duration: 0.3 }}
          >
            {item.sublabel}
          </m.p>
        </div>

        {/* Arrow indicator */}
        <m.span
          className="shrink-0 text-terracotta"
          initial={false}
          animate={{ opacity: active ? 1 : 0, x: active ? 0 : -8 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </m.span>
      </div>
    </>
  )

  const baseClassName =
    'group relative block border-b border-limestone/40 py-4 md:py-5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white'

  if (item.href) {
    return (
      <Link
        href={item.href}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        aria-current={active ? 'page' : undefined}
        className={baseClassName}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onActivate()
      }}
      aria-pressed={active}
      className={baseClassName}
    >
      {inner}
    </div>
  )
}

/* ── Internal: Animated image panel ── */

function GalleryImage({
  item,
  transition,
  reducedMotion,
}: {
  readonly item: HoverGalleryItem
  readonly transition: ReturnType<typeof makeGalleryTransition>
  readonly reducedMotion: boolean
}) {
  return (
    <m.div
      key={item.id}
      className="absolute inset-0"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <Image
        src={item.image}
        alt={item.label}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
        priority={false}
      />
    </m.div>
  )
}

/* ── Main component ── */

export function HoverGallery({ items, mobileCta, reversed = false, renderPanel }: HoverGalleryProps) {
  const [activeId, setActiveId] = useState(items[0].id)
  const reducedMotion = useReducedMotion()
  const transition = useMemo(() => makeGalleryTransition(reducedMotion), [reducedMotion])

  const activeItem = useMemo(
    () => items.find((p) => p.id === activeId) ?? items[0],
    [activeId, items],
  )

  const handleActivate = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  return (
    <>
      {/* Desktop: two-column hover gallery */}
      <div className={`hidden md:flex md:items-stretch md:gap-10 lg:gap-14 ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        {/* Labels column */}
        <div className="flex flex-1 flex-col">
          {items.map((item) => (
            <GalleryRow
              key={item.id}
              item={item}
              active={activeId === item.id}
              onActivate={() => handleActivate(item.id)}
            />
          ))}
        </div>

        {/* Image / custom panel — bleeds toward the nearest edge */}
        <div
          className={`relative w-[50%] shrink-0 overflow-hidden ${
            reversed
              ? '-ml-6 md:-ml-12 xl:-ml-16 rounded-r-sm'
              : '-mr-6 md:-mr-12 xl:-mr-16 rounded-l-sm'
          }`}
        >
          {renderPanel ? (
            renderPanel(activeId, items)
          ) : (
            <AnimatePresence>
              <GalleryImage
                key={activeItem.id}
                item={activeItem}
                transition={transition}
                reducedMotion={reducedMotion}
              />
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Mobile: image on top, tappable labels below */}
      <div className="md:hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
          {renderPanel ? (
            renderPanel(activeId, items)
          ) : (
            <AnimatePresence>
              <GalleryImage
                key={activeItem.id}
                item={activeItem}
                transition={transition}
                reducedMotion={reducedMotion}
              />
            </AnimatePresence>
          )}
        </div>

        <div className="mt-6 flex flex-col">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleActivate(item.id)}
              aria-pressed={activeId === item.id}
              className="group relative border-b border-limestone/40 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50"
            >
              <m.div
                className="absolute bottom-0 left-0 h-[2px] bg-terracotta"
                initial={false}
                animate={{ width: activeId === item.id ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              />
              <m.h3
                className="font-display text-lg font-medium uppercase"
                initial={false}
                animate={{
                  color: activeId === item.id ? '#1C1916' : 'rgba(28,25,22,0.3)',
                }}
                transition={{ duration: 0.3 }}
              >
                {item.label}
              </m.h3>
              <m.p
                className="mt-0.5 font-body text-[11px] tracking-wide"
                initial={false}
                animate={{
                  color: activeId === item.id ? 'rgba(92,82,72,0.9)' : 'rgba(92,82,72,0.4)',
                }}
                transition={{ duration: 0.3 }}
              >
                {item.sublabel}
              </m.p>
            </button>
          ))}
        </div>

        {/* Mobile CTA */}
        {mobileCta && activeItem.href && (
          <div className="mt-8 flex justify-center">
            <Link
              href={activeItem.href}
              className="group inline-flex items-center gap-2 rounded-full border-[1.5px] border-terracotta/30 bg-terracotta/[0.07] px-6 py-2.5 font-accent text-[11px] uppercase tracking-[0.18em] text-terracotta transition-all duration-300 hover:border-terracotta/50 hover:bg-terracotta/[0.12]"
            >
              {mobileCta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
