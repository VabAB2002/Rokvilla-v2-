import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SectionErrorBoundary } from '@/components/error/SectionErrorBoundary'

const LocationsSection = dynamic(
  () => import('@/components/sections/LocationsSection').then(m => m.LocationsSection)
)

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="cv-auto"><ServicesSection /></div>
      <div className="cv-auto"><ProjectsSection /></div>
      <div className="cv-auto">
        <SectionErrorBoundary name="locations-map">
          <Suspense fallback={<div className="min-h-[500px]" />}>
            <LocationsSection />
          </Suspense>
        </SectionErrorBoundary>
      </div>
    </>
  )
}
