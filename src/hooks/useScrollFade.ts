'use client'

import { useState, useEffect, type RefObject } from 'react'

interface ScrollFadeState {
  readonly showLeft: boolean
  readonly showRight: boolean
}

const THRESHOLD = 2

/**
 * Detects whether a horizontally scrollable container has overflowed
 * content on the left and/or right, enabling dynamic fade indicators.
 */
export function useScrollFade(ref: RefObject<HTMLElement | null>): ScrollFadeState {
  const [state, setState] = useState<ScrollFadeState>({ showLeft: false, showRight: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const check = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      setState({
        showLeft: scrollLeft > THRESHOLD,
        showRight: scrollLeft < scrollWidth - clientWidth - THRESHOLD,
      })
    }

    check()

    el.addEventListener('scroll', check, { passive: true })
    const observer = new ResizeObserver(check)
    observer.observe(el)

    return () => {
      el.removeEventListener('scroll', check)
      observer.disconnect()
    }
  }, [ref])

  return state
}
