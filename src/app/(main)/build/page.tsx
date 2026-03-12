import type { Metadata } from 'next'
import { BuildHero } from '@/components/build/BuildHero'
import { BuildHowItWorksSection } from '@/components/build/BuildHowItWorksSection'
import { ConstructionPackagesSection } from '@/components/build/ConstructionPackagesSection'
import { BuildKeyFeaturesSection } from '@/components/build/BuildKeyFeaturesSection'
import { ConsultationForm } from '@/components/shared/ConsultationForm'
import { ConsultationPhoto } from '@/components/design/ConsultationPhoto'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { BuildProjectsWrapper } from '@/components/build/BuildProjectsWrapper'
import { FAQSection } from '@/components/shared/FAQSection'
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

export default function BuildPage() {
  return (
    <>
      <BuildHero />
      <BuildHowItWorksSection />
      <ConstructionPackagesSection />
      <BuildKeyFeaturesSection />
      <ConsultationForm
        layout="split"
        illustration={<ConsultationPhoto />}
        sectionClassName="relative overflow-hidden bg-white py-24 md:py-32 lg:py-36"
      />
      <TestimonialsSection testimonials={BUILD_TESTIMONIALS} />
      <BuildProjectsWrapper />
      <FAQSection
        faqs={BUILD_FAQS}
        categories={BUILD_FAQ_CATEGORIES}
        subtitle="Everything you need to know about our construction services"
        sectionClassName="bg-white py-24 md:py-32 lg:py-36"
      />
    </>
  )
}
