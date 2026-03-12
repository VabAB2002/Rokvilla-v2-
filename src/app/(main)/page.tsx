import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'

const LocationsSection = dynamic(
  () => import('@/components/sections/LocationsSection').then(m => m.LocationsSection)
)

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <LocationsSection />
      </Suspense>
    </>
  )
}
