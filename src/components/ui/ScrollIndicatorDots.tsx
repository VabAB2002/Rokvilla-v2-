'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ScrollIndicatorDotsProps {
  readonly count: number
  readonly activeIndex: number
  readonly onDotClick: (index: number) => void
  readonly className?: string
}

/**
 * Small dot indicators for scroll carousels.
 * Active dot uses terracotta accent; inactive dots use limestone.
 * Each dot is an accessible button.
 * Intended for mobile-only usage — wrap in `md:hidden` at the call site.
 */
export function ScrollIndicatorDots({
  count,
  activeIndex,
  onDotClick,
  className = '',
}: ScrollIndicatorDotsProps) {
  const reducedMotion = useReducedMotion()

  if (count <= 1) return null

  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="group"
      aria-label="Scroll position"
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-current={i === activeIndex ? true : undefined}
          aria-label={`Go to item ${i + 1} of ${count}`}
          onClick={() => onDotClick(i)}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:rounded-full"
        >
          <motion.span
            layout
            className={`block rounded-full transition-colors duration-200 ${
              i === activeIndex
                ? 'h-2 w-4 bg-terracotta'
                : 'h-2 w-2 bg-limestone'
            }`}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 400, damping: 30 }
            }
          />
        </button>
      ))}
    </div>
  )
}
