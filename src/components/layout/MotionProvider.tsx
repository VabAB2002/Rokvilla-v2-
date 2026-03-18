'use client'

import { type ReactNode } from 'react'
import { LazyMotion, domMax } from 'framer-motion'

export function MotionProvider({ children }: { readonly children: ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>
}
