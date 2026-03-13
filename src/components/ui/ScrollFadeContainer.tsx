'use client'

import { useRef, type ReactNode, type RefObject } from 'react'
import { useScrollFade } from '@/hooks/useScrollFade'

interface ScrollFadeContainerProps {
  readonly children: ReactNode
  readonly scrollClassName: string
  readonly fadeColorClass?: string
  readonly scrollRef?: RefObject<HTMLDivElement | null>
  readonly role?: string
  readonly ariaLabel?: string
}

/**
 * Wraps a horizontally scrollable container with dynamic gradient fade
 * overlays that appear/disappear based on scroll position.
 *
 * The left fade appears once the user scrolls past the start.
 * The right fade disappears when the user reaches the end.
 * When content fits without scrolling (e.g. desktop), no fades show.
 *
 * Pass `scrollRef` to share the scroll element ref with other hooks
 * (e.g. useScrollProgress for ScrollIndicatorDots).
 */
export function ScrollFadeContainer({
  children,
  scrollClassName,
  fadeColorClass = 'from-white',
  scrollRef: externalRef,
  role,
  ariaLabel,
}: ScrollFadeContainerProps) {
  const internalRef = useRef<HTMLDivElement>(null)
  const scrollRef = externalRef ?? internalRef
  const { showLeft, showRight } = useScrollFade(scrollRef)

  return (
    <div className="relative">
      <div
        className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r ${fadeColorClass} to-transparent transition-opacity duration-200 ${showLeft ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l ${fadeColorClass} to-transparent transition-opacity duration-200 ${showRight ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />
      <div
        ref={scrollRef}
        className={scrollClassName}
        role={role}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>
  )
}
