import type { Variants, Transition } from 'framer-motion'

/* ── Shared easing curves ── */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_IN_EXPO = [0.7, 0, 0.84, 0] as const
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const

/* ── Shared transitions ── */
export const TRANSITION_SMOOTH: Transition = {
  duration: 0.7,
  ease: EASE_OUT_EXPO,
}

export const TRANSITION_FAST: Transition = {
  duration: 0.35,
  ease: EASE_OUT_QUART,
}

/* ── Fade up (scroll-triggered sections) ── */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

/* ── Stagger container ── */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

/* ── Questionnaire step transitions ── */
export const questionStepVariants: Variants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
}

export const questionStepTransition: Transition = {
  x: { type: 'tween', duration: 0.45, ease: EASE_OUT_EXPO },
  opacity: { duration: 0.3, ease: EASE_OUT_EXPO },
}

/* ── Hero entrance sequence (staggered) ── */
export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

/* ── Card hover ── */
export const cardHoverScale = {
  scale: 1.04,
  transition: { duration: 0.6, ease: EASE_OUT_QUART },
}

/* ── Glass overlay slide-up (card hover overlays) ── */
export const glassOverlayVariants: Variants = {
  rest: { y: '100%' },
  hover: {
    y: '0%',
    transition: { duration: 0.4, ease: EASE_OUT_QUART },
  },
}

/* ── Glass overlay content fade (staggers after overlay slides in) ── */
export const glassContentVariants: Variants = {
  rest: { opacity: 0, y: 8 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: 0.15, ease: EASE_OUT_QUART },
  },
}

/* ── Float up entrance (for floating CTAs) ── */
export const floatUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
}
