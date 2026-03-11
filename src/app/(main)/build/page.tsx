import type { Metadata } from 'next'
import { BuildHero } from '@/components/build/BuildHero'
import { BuildHowItWorksSection } from '@/components/build/BuildHowItWorksSection'
import { ConstructionPackagesSection } from '@/components/build/ConstructionPackagesSection'
import { BuildKeyFeaturesSection } from '@/components/build/BuildKeyFeaturesSection'
import { ConsultationForm } from '@/components/shared/ConsultationForm'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { FAQSection } from '@/components/shared/FAQSection'
import { ConstructionCTASection } from '@/components/build/ConstructionCTASection'
import {
  BUILD_TESTIMONIALS,
  BUILD_FAQS,
  BUILD_FAQ_CATEGORIES,
} from '@/lib/constants/build'

export const metadata: Metadata = {
  title: 'Build — RokVilla',
  description:
    'From foundation to finish — construction packages with transparent pricing, daily site updates, and a 10-year warranty. Choose your package and build your dream home.',
}

const BUILD_CONSULTATION_CATEGORIES = [
  { value: 'residential', label: 'Residential Home' },
  { value: 'luxury-villa', label: 'Luxury Villa' },
  { value: 'commercial', label: 'Commercial' },
] as const

export default function BuildPage() {
  return (
    <>
      <BuildHero />
      <BuildHowItWorksSection />
      <ConstructionPackagesSection />
      <BuildKeyFeaturesSection />
      <ConsultationForm
        title="Build Your Dream Home"
        subtitle="Ready to start construction? Schedule a free site visit today and get a personalised cost estimate from our team."
        categories={BUILD_CONSULTATION_CATEGORIES}
        sectionClassName="bg-parchment py-24 md:py-32 lg:py-36"
      />
      <TestimonialsSection testimonials={BUILD_TESTIMONIALS} />
      <ProjectsSection />
      <FAQSection
        faqs={BUILD_FAQS}
        categories={BUILD_FAQ_CATEGORIES}
        subtitle="Everything you need to know about our construction services"
        sectionClassName="bg-parchment py-24 md:py-32 lg:py-36"
      />
      <ConstructionCTASection />
    </>
  )
}
