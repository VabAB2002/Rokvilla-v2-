'use client'

import { motion } from 'framer-motion'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { ButtonDark } from '@/components/ui/Button'
import { heroContainerVariants, heroItemVariants } from '@/lib/motion'

export function HeroSection() {
  return (
    <section aria-label="Hero" className="relative h-dvh min-h-[600px] overflow-hidden">
      <VideoBackground
        videoSrc="/videos/hero.mp4"
        imageSrc="/images/hero-fallback.jpg"
        imageAlt="RokVilla architecture showcase — Cedar Homestore at dusk"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-24 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Overline */}
            <motion.span
              variants={heroItemVariants}
              className="mb-6 block font-accent text-[13px] uppercase tracking-[0.18em] text-brass-light"
            >
              Architecture &amp; Construction
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={heroItemVariants}
              className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-light leading-[0.9] text-bone whitespace-pre-line"
            >
              {'Built to\nEndure.'}
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={heroItemVariants}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-stone md:text-lg"
            >
              Premium residential, commercial, and interior spaces — crafted with precision across Karnataka.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <ButtonDark variant="primary" href="#services">
                Our Services
              </ButtonDark>
              <ButtonDark variant="secondary" href="#projects">
                View Our Work
              </ButtonDark>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={heroItemVariants}
              className="mt-16 hidden md:block"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-start gap-2"
              >
                <span className="font-accent text-[11px] uppercase tracking-[0.16em] text-stone/60">
                  Scroll to explore
                </span>
                <div className="h-8 w-[1px] bg-stone/30" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
