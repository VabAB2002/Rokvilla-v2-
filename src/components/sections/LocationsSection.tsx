'use client'

import { useRef, useCallback } from 'react'
import * as m from 'framer-motion/m'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap-config'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HoverGallery, type HoverGalleryItem } from '@/components/ui/HoverGallery'
import { LocationMiniMap } from '@/components/ui/LocationMiniMap'
import { LOCATIONS } from '@/lib/constants/locations'

const LOCATION_ITEMS: ReadonlyArray<HoverGalleryItem> = LOCATIONS.map((loc) => ({
  id: loc.id,
  label: loc.city,
  sublabel: loc.address,
  image: '',
}))

export function LocationsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.locations-heading', {
        y: 30,
      }, {
        y: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.locations-heading',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => mm.revert()
  }, { scope: sectionRef })

  const renderMapPanel = useCallback((activeId: string) => (
    <>
      {LOCATIONS.map((loc) => (
        <m.div
          key={loc.id}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: activeId === loc.id ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <LocationMiniMap location={loc} />
        </m.div>
      ))}
    </>
  ), [])

  return (
    <section
      ref={sectionRef}
      id="locations"
      aria-labelledby="locations-heading"
      className="bg-white py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <div className="locations-heading">
          <AnimatedSection className="mb-12 md:mb-16">
            <p className="font-accent text-[11px] uppercase tracking-[0.25em] text-terracotta md:text-xs">
              Our Offices
            </p>
            <h2
              id="locations-heading"
              className="mt-3 font-display text-3xl font-medium uppercase text-obsidian md:text-4xl lg:text-5xl"
            >
              Locations
            </h2>
          </AnimatedSection>
        </div>

        <HoverGallery items={LOCATION_ITEMS} reversed renderPanel={renderMapPanel} />
      </div>
    </section>
  )
}
