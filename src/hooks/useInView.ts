'use client'

import { useRef, useState, useEffect, type RefObject } from 'react'

interface UseInViewOptions {
  readonly rootMargin?: string
  readonly once?: boolean
}

export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {},
): { readonly ref: RefObject<T | null>; readonly inView: boolean } {
  const { rootMargin = '0px', once = false } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, once])

  return { ref, inView }
}
