import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ConsultationPhoto } from '@/components/design/ConsultationPhoto'
import { SectionErrorBoundary } from '@/components/error/SectionErrorBoundary'

const LocationsSection = dynamic(
  () => import('@/components/sections/LocationsSection').then(m => m.LocationsSection)
)

const HoverGallerySection = dynamic(
  () => import('@/components/sections/HoverGallerySection').then(m => m.HoverGallerySection)
)

const ConsultationForm = dynamic(
  () => import('@/components/shared/ConsultationForm').then(m => m.ConsultationForm)
)

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <SectionErrorBoundary name="locations-map">
        <Suspense fallback={<div className="min-h-[500px]" />}>
          <LocationsSection />
        </Suspense>
      </SectionErrorBoundary>
      <SectionErrorBoundary name="featured-work">
        <Suspense fallback={<div className="min-h-[500px]" />}>
          <HoverGallerySection />
        </Suspense>
      </SectionErrorBoundary>
      <SectionErrorBoundary name="home-consultation-form">
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <ConsultationForm
            layout="split"
            illustration={<ConsultationPhoto />}
            sectionClassName="relative overflow-hidden bg-white py-12 md:py-32 lg:py-36"
          />
        </Suspense>
      </SectionErrorBoundary>
    </>
  )
}
