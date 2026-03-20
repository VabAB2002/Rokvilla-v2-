import type { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { SITE_URL } from '@/lib/seo/constants'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ConsultationPhoto } from '@/components/design/ConsultationPhoto'
import { SectionErrorBoundary } from '@/components/error/SectionErrorBoundary'
import { MapSkeleton, FormSkeleton } from '@/components/ui/Skeleton'

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
}

const LocationsSection = dynamic(
  () => import('@/components/sections/LocationsSection').then(m => m.LocationsSection)
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
        <Suspense fallback={<MapSkeleton />}>
          <LocationsSection />
        </Suspense>
      </SectionErrorBoundary>
      <SectionErrorBoundary name="home-consultation-form">
        <Suspense fallback={<FormSkeleton />}>
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
