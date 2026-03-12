'use client'

import { type ReactNode } from 'react'
import { LazyMotion } from 'framer-motion'

const loadFeatures = () =>
  import('framer-motion').then((mod) => mod.domAnimation)

export function MotionProvider({ children }: { readonly children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>
}
