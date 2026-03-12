'use client'

import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ScrollIndicatorDots } from '@/components/ui/ScrollIndicatorDots'
import { ProjectLightbox } from '@/components/projects/ProjectLightbox'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { EASE_OUT_QUART } from '@/lib/motion'

interface ProjectBentoGalleryProps {
  readonly images: ReadonlyArray<string>
  readonly projectName: string
}

function BentoImage({
  src,
  alt,
  onClick,
  reducedMotion,
}: {
  readonly src: string
  readonly alt: string
  readonly onClick: () => void
  readonly reducedMotion: boolean
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="relative h-full w-full cursor-pointer overflow-hidden rounded-sm"
      whileHover={
        reducedMotion ? undefined : { scale: 1.03, transition: { duration: 0.5, ease: EASE_OUT_QUART } }
      }
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      aria-label={`View ${alt} in gallery`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </motion.button>
  )
}

export function ProjectBentoGallery({
  images,
  projectName,
}: ProjectBentoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const { activeIndex } = useScrollProgress(mobileScrollRef)

  const bentoImages = images.slice(0, 5)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? images.length - 1 : prev - 1,
    )
  }, [images.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === images.length - 1 ? 0 : prev + 1,
    )
  }, [images.length])

  const scrollToIndex = useCallback((index: number) => {
    const container = mobileScrollRef.current
    if (!container) return
    const child = container.children[index] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [])

  return (
    <section className="bg-white py-24 md:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection>
          <span className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
            Project Gallery
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          {/* Bento grid — desktop */}
          <div className="mt-8 hidden flex-col gap-2 sm:flex md:gap-3">
            {/* Top row: 60/40 split, shared row height */}
            <div className="grid aspect-[5/2] grid-cols-5 gap-2 md:gap-3">
              {bentoImages[0] && (
                <div className="col-span-3">
                  <BentoImage
                    src={bentoImages[0]}
                    alt={`${projectName} 1`}
                    onClick={() => openLightbox(0)}
                    reducedMotion={reducedMotion}
                  />
                </div>
              )}
              {bentoImages[1] && (
                <div className="col-span-2">
                  <BentoImage
                    src={bentoImages[1]}
                    alt={`${projectName} 2`}
                    onClick={() => openLightbox(1)}
                    reducedMotion={reducedMotion}
                  />
                </div>
              )}
            </div>

            {/* Bottom row: equal thirds */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {bentoImages.slice(2, 5).map((img, i) => (
                <div key={img} className="aspect-[4/3]">
                  <BentoImage
                    src={img}
                    alt={`${projectName} ${i + 3}`}
                    onClick={() => openLightbox(i + 2)}
                    reducedMotion={reducedMotion}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile horizontal scroll carousel */}
          <div className="mt-8 sm:hidden">
            <div
              ref={mobileScrollRef}
              role="region"
              aria-label={`${projectName} gallery`}
              className="flex snap-x snap-mandatory overflow-x-auto gap-3 no-scrollbar pb-2"
            >
              {bentoImages.map((img, i) => (
                <div
                  key={img}
                  className="relative w-[80vw] shrink-0 snap-start aspect-[4/3]"
                >
                  <BentoImage
                    src={img}
                    alt={`${projectName} ${i + 1}`}
                    onClick={() => openLightbox(i)}
                    reducedMotion={reducedMotion}
                  />
                </div>
              ))}
            </div>
            <ScrollIndicatorDots
              count={bentoImages.length}
              activeIndex={activeIndex}
              onDotClick={scrollToIndex}
              className="mt-4"
            />
          </div>
        </AnimatedSection>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ProjectLightbox
            images={images}
            currentIndex={lightboxIndex}
            projectName={projectName}
            onClose={closeLightbox}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
