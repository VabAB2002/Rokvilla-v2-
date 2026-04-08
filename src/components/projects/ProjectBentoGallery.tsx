'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import * as m from 'framer-motion/m'
import { AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectLightbox } from '@/components/projects/ProjectLightbox'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_QUART } from '@/lib/motion'
import { BLUR_DATA_URL } from '@/lib/constants/images'

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
    <m.button
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
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
    </m.button>
  )
}

export function ProjectBentoGallery({
  images,
  projectName,
}: ProjectBentoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  const topRowImages = images.slice(0, 2)
  const supportingImages = images.slice(2, 5)
  const remainingImages = images.slice(5)

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

  return (
    <section className="bg-white py-12 md:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection>
          <span className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
            Project Gallery
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          {/* Bento grid — desktop */}
          <div className="mt-8 hidden flex-col gap-2 sm:flex md:gap-3">
            {/* Top row: feature the first two images */}
            {topRowImages.length > 0 && (
              <div
                className={
                  topRowImages.length === 1
                    ? 'aspect-[16/9]'
                    : 'grid aspect-[5/2] grid-cols-5 gap-2 md:gap-3'
                }
              >
                <div className={topRowImages.length === 1 ? 'h-full w-full' : 'col-span-3'}>
                  <BentoImage
                    src={topRowImages[0]}
                    alt={`${projectName} — project view 1`}
                    onClick={() => openLightbox(0)}
                    reducedMotion={reducedMotion}
                  />
                </div>
                {topRowImages[1] && (
                  <div className="col-span-2">
                    <BentoImage
                      src={topRowImages[1]}
                      alt={`${projectName} — project view 2`}
                      onClick={() => openLightbox(1)}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Supporting row: next three images */}
            {supportingImages.length > 0 && (
              <div
                className={
                  supportingImages.length === 1
                    ? 'grid grid-cols-1 gap-2 md:gap-3'
                    : supportingImages.length === 2
                      ? 'grid grid-cols-2 gap-2 md:gap-3'
                      : 'grid grid-cols-3 gap-2 md:gap-3'
                }
              >
                {supportingImages.map((img, i) => (
                  <div key={img} className="aspect-[4/3]">
                    <BentoImage
                      src={img}
                      alt={`${projectName} — project view ${i + 3}`}
                      onClick={() => openLightbox(i + 2)}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Remaining gallery images */}
            {remainingImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 md:gap-3 xl:grid-cols-3">
                {remainingImages.map((img, i) => (
                  <div key={img} className="aspect-[4/3]">
                    <BentoImage
                      src={img}
                      alt={`${projectName} — project view ${i + 6}`}
                      onClick={() => openLightbox(i + 5)}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile vertical stack */}
          <div className="mt-8 flex flex-col gap-3 sm:hidden">
            {images.map((img, i) => (
              <div key={img} className="relative aspect-[4/3] w-full">
                <BentoImage
                  src={img}
                  alt={`${projectName} — project view ${i + 1}`}
                  onClick={() => openLightbox(i)}
                  reducedMotion={reducedMotion}
                />
              </div>
            ))}
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
