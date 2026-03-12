import type { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { BuildHero } from '@/components/build/BuildHero'
import { BuildHowItWorksSection } from '@/components/build/BuildHowItWorksSection'
import { BuildKeyFeaturesSection } from '@/components/build/BuildKeyFeaturesSection'
import { ConsultationPhoto } from '@/components/design/ConsultationPhoto'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { BuildProjectsWrapper } from '@/components/build/BuildProjectsWrapper'
import {
  BUILD_TESTIMONIALS,
  BUILD_FAQS,
  BUILD_FAQ_CATEGORIES,
} from '@/lib/constants/build'

const ConstructionPackagesSection = dynamic(
  () => import('@/components/build/ConstructionPackagesSection').then(m => m.ConstructionPackagesSection)
)

const ConsultationForm = dynamic(
  () => import('@/components/shared/ConsultationForm').then(m => m.ConsultationForm)
)

const FAQSection = dynamic(
  () => import('@/components/shared/FAQSection').then(m => m.FAQSection)
)

export const metadata: Metadata = {
  title: 'Build — RokVilla',
  description:
    'From foundation to finish — construction packages with transparent pricing, daily site updates, and a 10-year warranty. Choose your package and build your dream home.',
}

export default function BuildPage() {
  return (
    <>
      <BuildHero />
      <BuildHowItWorksSection />
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ConstructionPackagesSection />
      </Suspense>
      <BuildKeyFeaturesSection />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ConsultationForm
          layout="split"
          illustration={<ConsultationPhoto />}
          sectionClassName="relative overflow-hidden bg-white py-24 md:py-32 lg:py-36"
        />
      </Suspense>
      <TestimonialsSection testimonials={BUILD_TESTIMONIALS} />
      <BuildProjectsWrapper />
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <FAQSection
          faqs={BUILD_FAQS}
          categories={BUILD_FAQ_CATEGORIES}
          subtitle="Everything you need to know about our construction services"
          sectionClassName="bg-white py-24 md:py-32 lg:py-36"
        />
      </Suspense>
    </>
  )
}
