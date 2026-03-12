'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { PanInfo } from 'framer-motion'

/* ── Constants ── */
const SNAP_THRESHOLD = 50
const VELOCITY_THRESHOLD = 300

/* ── Responsive visible count ── */

export function useVisibleCount(): number {
  const [count, setCount] = useState(3)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCount(1)
      else if (window.innerWidth < 1024) setCount(2)
      else setCount(3)
    }

    const handleResize = () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(update, 100)
    }

    update()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timerRef.current !== null) clearTimeout(timerRef.current)
    }
  }, [])

  return count
}

/* ── Carousel hook ── */

interface UseCarouselOptions {
  readonly count: number
  readonly visibleCount: number
}

interface UseCarouselReturn {
  readonly currentIndex: number
  readonly canGoPrev: boolean
  readonly canGoNext: boolean
  readonly goTo: (index: number) => void
  readonly goPrev: () => void
  readonly goNext: () => void
  readonly onDragEnd: (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  readonly dotCount: number
}

export function useCarousel({ count, visibleCount }: UseCarouselOptions): UseCarouselReturn {
  const maxIndex = Math.max(0, count - visibleCount)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Clamp index when count or visibleCount changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
    },
    [maxIndex],
  )

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const onDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info

      if (velocity.x < -VELOCITY_THRESHOLD || offset.x < -SNAP_THRESHOLD) {
        goNext()
      } else if (velocity.x > VELOCITY_THRESHOLD || offset.x > SNAP_THRESHOLD) {
        goPrev()
      }
      // else: spring snaps back to current position
    },
    [goNext, goPrev],
  )

  return {
    currentIndex,
    canGoPrev: currentIndex > 0,
    canGoNext: currentIndex < maxIndex,
    goTo,
    goPrev,
    goNext,
    onDragEnd,
    dotCount: maxIndex + 1,
  }
}
