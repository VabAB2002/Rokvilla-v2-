'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'

export function PhaseConnector() {
  const reduced = useReducedMotion()

  return (
    <div className="py-16 md:py-20">
      <div className="relative flex flex-col items-center">
        {/* Animated horizontal line — grows from center outward */}
        <motion.div
          initial={reduced ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="absolute inset-x-0 top-1/2 origin-center border-t-2 border-terracotta/20"
          aria-hidden="true"
        />

        {/* Decorative terracotta dots along the line */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-[10%] md:px-[20%]"
          aria-hidden="true"
        >
          <div className="h-2 w-2 rounded-full bg-terracotta/30" />
          <div className="h-2 w-2 rounded-full bg-terracotta/30" />
        </motion.div>

        {/* Pill label — pops in with scale */}
        <motion.span
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: reduced ? 0 : 0.3, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="relative z-10 rounded-full border border-terracotta/30 bg-terracotta/[0.06] px-6 py-2 font-accent text-[12px] uppercase tracking-[0.2em] text-terracotta shadow-sm backdrop-blur-sm md:text-[13px]"
        >
          Your Journey Begins Here
        </motion.span>

        {/* Animated vertical tail — draws downward */}
        <motion.div
          initial={reduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: reduced ? 0 : 0.6, duration: 0.5, ease: EASE_OUT_EXPO }}
          className="mt-4 h-10 w-0 origin-top border-l-2 border-dashed border-terracotta/30"
          aria-hidden="true"
        />

        {/* Terminal dot at the bottom */}
        <motion.div
          initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: reduced ? 0 : 0.9, duration: 0.3, ease: EASE_OUT_EXPO }}
          className="h-3 w-3 rounded-full bg-terracotta/40"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
