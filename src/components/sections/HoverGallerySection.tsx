'use client'

import { useMemo } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HoverGallery, type HoverGalleryItem } from '@/components/ui/HoverGallery'
import { GALLERY_PROJECTS } from '@/lib/constants/gallery'

export function HoverGallerySection() {
  const items: ReadonlyArray<HoverGalleryItem> = useMemo(
    () =>
      GALLERY_PROJECTS.map((p) => ({
        id: p.id,
        label: p.name,
        sublabel: p.subtitle,
        image: p.image,
        href: p.href,
      })),
    [],
  )

  return (
    <section
      id="featured-work"
      aria-labelledby="featured-work-heading"
      className="bg-white py-16 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Section header */}
        <AnimatedSection className="mb-12 md:mb-16">
          <p className="font-accent text-[11px] uppercase tracking-[0.25em] text-terracotta md:text-xs">
            Featured Work
          </p>
          <h2
            id="featured-work-heading"
            className="mt-3 font-display text-3xl font-medium uppercase text-obsidian md:text-4xl lg:text-5xl"
          >
            Built to Endure
          </h2>
        </AnimatedSection>

        <HoverGallery items={items} mobileCta="View Project" />
      </div>
    </section>
  )
}
