'use client'

import { useMemo } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HoverGallery, type HoverGalleryItem } from '@/components/ui/HoverGallery'
import { SERVICES } from '@/lib/constants/services'

export function ServicesSection() {
  const items: ReadonlyArray<HoverGalleryItem> = useMemo(
    () =>
      SERVICES.map((s) => ({
        id: s.id,
        label: s.title,
        sublabel: s.description,
        image: s.image,
        href: s.href,
      })),
    [],
  )

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="mb-12 md:mb-16">
          <p className="font-accent text-[11px] uppercase tracking-[0.25em] text-terracotta md:text-xs">
            What We Do
          </p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-3xl font-medium uppercase text-obsidian md:text-4xl lg:text-5xl"
          >
            Services
          </h2>
        </AnimatedSection>

        <HoverGallery items={items} mobileCta="Learn More" />
      </div>
    </section>
  )
}
