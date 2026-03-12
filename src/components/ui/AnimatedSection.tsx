'use client'

import { type ReactNode, useRef, useEffect, useState } from 'react'

interface AnimatedSectionProps {
  readonly children: ReactNode
  readonly className?: string
  readonly delay?: number
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: '-100px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${isVisible ? 'animate-[fadeUp_0.7s_var(--ease-out-expo)_forwards]' : 'opacity-0 translate-y-6'} ${className}`}
      style={delay > 0 ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
