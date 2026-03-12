'use client'

import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface ProjectLightboxProps {
  readonly images: ReadonlyArray<string>
  readonly currentIndex: number
  readonly projectName: string
  readonly onClose: () => void
  readonly onPrev: () => void
  readonly onNext: () => void
}

export function ProjectLightbox({
  images,
  currentIndex,
  projectName,
  onClose,
  onPrev,
  onNext,
}: ProjectLightboxProps) {
  const reducedMotion = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  // Focus close button on mount
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Body scroll lock
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const duration = reducedMotion ? 0.05 : 0.2

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} gallery`}
    >
      {/* Close button */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-bone/60 transition-colors duration-200 hover:text-bone md:right-8 md:top-8"
        aria-label="Close gallery"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 text-bone/60 backdrop-blur-sm transition-colors duration-200 hover:bg-bone/20 hover:text-bone md:left-6"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 text-bone/60 backdrop-blur-sm transition-colors duration-200 hover:bg-bone/20 hover:text-bone md:right-6"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="relative mx-16 h-[70vh] w-full max-w-5xl md:mx-20"
          initial={
            reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
          }
          animate={{ opacity: 1, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.3, ease: EASE_OUT_EXPO }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[currentIndex]}
            alt={`${projectName} — image ${currentIndex + 1} of ${images.length}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="font-body text-[13px] tabular-nums text-bone/50">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </motion.div>,
    document.body,
  )
}
