import type { Metadata } from 'next'
import { FurnishHero } from '@/components/furnish/FurnishHero'
import { HowItWorksSection } from '@/components/furnish/HowItWorksSection'
import { FurnishProjectsWrapper } from '@/components/furnish/FurnishProjectsWrapper'
import { InteriorSolutionsSection } from '@/components/furnish/InteriorSolutionsSection'
import { DesignThemesSection } from '@/components/furnish/DesignThemesSection'
import { KeyFeaturesSection } from '@/components/furnish/KeyFeaturesSection'
import { MaterialFeaturesSection } from '@/components/furnish/MaterialFeaturesSection'
import { ConsultationForm } from '@/components/shared/ConsultationForm'
import { ConsultationPhoto } from '@/components/design/ConsultationPhoto'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { FAQSection } from '@/components/shared/FAQSection'
import {
  FURNISH_TESTIMONIALS,
  FURNISH_FAQS,
  FURNISH_FAQ_CATEGORIES,
} from '@/lib/constants/furnish'

export const metadata: Metadata = {
  title: 'Furnish — RokVilla',
  description:
    'End-to-end interior furnishing with premium materials, expert craftsmanship, and a 10-year warranty. Browse projects, explore design themes, and book a free consultation.',
}

export default function FurnishPage() {
  return (
    <>
      <FurnishHero />
      <HowItWorksSection />
      <FurnishProjectsWrapper />
      <InteriorSolutionsSection />
      <DesignThemesSection />
      <KeyFeaturesSection />
      <MaterialFeaturesSection />
      <ConsultationForm
        layout="split"
        illustration={<ConsultationPhoto />}
        sectionClassName="relative overflow-hidden bg-white py-24 md:py-32 lg:py-36"
      />
      <TestimonialsSection testimonials={FURNISH_TESTIMONIALS} />
      <FAQSection
        faqs={FURNISH_FAQS}
        categories={FURNISH_FAQ_CATEGORIES}
        subtitle="Everything you need to know about our furnishing services"
        sectionClassName="bg-white py-24 md:py-32 lg:py-36"
      />
    </>
  )
}
