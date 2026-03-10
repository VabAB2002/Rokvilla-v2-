import type { Metadata } from 'next'
import { FurnishHero } from '@/components/furnish/FurnishHero'
import { HowItWorksSection } from '@/components/furnish/HowItWorksSection'
import { ProjectsGallerySection } from '@/components/furnish/ProjectsGallerySection'
import { DesignThemesSection } from '@/components/furnish/DesignThemesSection'
import { KeyFeaturesSection } from '@/components/furnish/KeyFeaturesSection'
import { MaterialFeaturesSection } from '@/components/furnish/MaterialFeaturesSection'
import { ConsultationForm } from '@/components/shared/ConsultationForm'
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
      <ProjectsGallerySection />
      <DesignThemesSection />
      <KeyFeaturesSection />
      <MaterialFeaturesSection />
      <ConsultationForm
        title="You Dream. We Deliver."
        subtitle="Ready to transform your interiors? Schedule a free consultation today and let our experts bring your vision to life."
      />
      <TestimonialsSection testimonials={FURNISH_TESTIMONIALS} />
      <FAQSection
        faqs={FURNISH_FAQS}
        categories={FURNISH_FAQ_CATEGORIES}
        subtitle="Everything you need to know about our furnishing services"
      />
    </>
  )
}
