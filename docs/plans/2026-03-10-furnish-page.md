# Furnish Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dedicated `/furnish` page with full-screen hero, 3-step process, filterable project gallery, design themes grid, key features, material specs, and shared form/testimonials/FAQ sections.

**Architecture:** Mirror the Design page pattern (`src/app/(main)/design/page.tsx`). New furnish-specific components go in `src/components/furnish/`. Shared components (ConsultationForm, TestimonialsSection, FAQSection) are refactored from `src/components/design/` to accept data via props. Constants live in `src/lib/constants/furnish.ts`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS v4, Framer Motion 12

---

### Task 1: Create furnish constants file

**Files:**
- Create: `src/lib/constants/furnish.ts`

**Step 1: Write the constants file**

This file holds all data for the Furnish page: process steps, projects, design themes, key features, material specs, testimonials, and FAQs. Export types from `src/lib/constants/design.ts` where they overlap (Testimonial, FAQItem, FAQCategory).

```typescript
/* ═══════════════════════════════════════════════
   RokVilla Furnish Page — Constants & Data
   ═══════════════════════════════════════════════ */

import type { Testimonial } from './design'

/* ── Process Steps ── */

export interface FurnishStep {
  readonly number: string
  readonly title: string
  readonly description: string
}

export const FURNISH_STEPS: ReadonlyArray<FurnishStep> = [
  {
    number: '01',
    title: 'Go Through Our Designs',
    description:
      'Browse our portfolio of completed interior projects to find the style and quality that resonates with your vision.',
  },
  {
    number: '02',
    title: 'Choose Design Themes You Like',
    description:
      'Select from contemporary, minimalist, traditional, and other curated interior themes tailored to your lifestyle.',
  },
  {
    number: '03',
    title: 'Connect With Us',
    description:
      'Schedule a free consultation and let our interior design team craft your dream space from concept to completion.',
  },
] as const

/* ── Room-type filter categories ── */

export interface RoomCategory {
  readonly id: string
  readonly label: string
  readonly icon: string // SVG path
}

export const ROOM_CATEGORIES: ReadonlyArray<RoomCategory> = [
  {
    id: 'all',
    label: 'All',
    icon: 'M4 6h16M4 12h16M4 18h16',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2h-4v-6H9v6H5a2 2 0 01-2-2V9z',
  },
  {
    id: 'living-room',
    label: 'Living Room',
    icon: 'M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3M4 9h16l1 7H3l1-7zM2 20h20M6 16v4M18 16v4',
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l2-3h14l2 3M7 12h.01M17 12h.01',
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: 'M4 12h16M4 12a8 8 0 0116 0M4 12a8 8 0 000 0M2 12h2M20 12h2M12 2v2M12 20v2',
  },
  {
    id: 'pooja-room',
    label: 'Pooja Room',
    icon: 'M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7l3-7z',
  },
] as const

/* ── Furnish Projects (placeholder) ── */

export interface FurnishProject {
  readonly id: string
  readonly title: string
  readonly location: string
  readonly category: string
  readonly image: string
  readonly rooms: ReadonlyArray<string>
}

export const FURNISH_PROJECTS: ReadonlyArray<FurnishProject> = [
  {
    id: 'fp-1',
    title: 'Lilavati Residence',
    location: 'Hubli',
    category: 'End-to-End Interior',
    image: '/00 FINISHED/01 SRIPRADHA/01_SRIPRADHA_01.jpg',
    rooms: ['kitchen', 'living-room', 'bedroom', 'bathroom'],
  },
  {
    id: 'fp-2',
    title: 'Santhip Residence',
    location: 'Dharwad',
    category: 'End-to-End Interior',
    image: '/00 FINISHED/06 SHIVPRASAD RESIDENCE/06_SHIVPRASAD RESIDENCE_01.jpg',
    rooms: ['kitchen', 'living-room', 'bedroom', 'pooja-room'],
  },
  {
    id: 'fp-3',
    title: 'Brihaaspati Residence',
    location: 'Hubli',
    category: 'End-to-End Interior',
    image: '/00 FINISHED/05 VANITHA RESIDENCE/05_VANITHA RESIDENCE_01.jpg',
    rooms: ['living-room', 'bedroom', 'bathroom'],
  },
  {
    id: 'fp-4',
    title: 'Kaveri Residence',
    location: 'Ballari',
    category: 'Modular Kitchen',
    image: '/00 FINISHED/08 RAJ RESIDENCE/01_RAJ RESIDENCE_01.jpg',
    rooms: ['kitchen'],
  },
  {
    id: 'fp-5',
    title: 'Nandi Residence',
    location: 'Hubli',
    category: 'Living & Bedroom',
    image: '/00 FINISHED/07 PAVAN VJ /07_PAVAN VJ_01.jpg',
    rooms: ['living-room', 'bedroom', 'pooja-room'],
  },
  {
    id: 'fp-6',
    title: 'Cedar Homestore',
    location: 'Hubli',
    category: 'Commercial Interior',
    image: '/00 FINISHED/11 CEDAR HOMESTORE/01_CEDAR HOMESTORE_02.jpg',
    rooms: ['living-room'],
  },
] as const

/* ── Design Themes ── */

export interface DesignTheme {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly image: string
}

export const DESIGN_THEMES: ReadonlyArray<DesignTheme> = [
  {
    id: 'contemporary',
    title: 'Contemporary',
    description: 'Clean lines, neutral palettes, and a focus on open spaces with natural light.',
    image: '/00 FINISHED/01 SRIPRADHA/01_SRIPRADHA_02.jpg',
  },
  {
    id: 'minimalist',
    title: 'Minimalist',
    description: 'Less is more — functional furniture, muted tones, and clutter-free living.',
    image: '/00 FINISHED/03 MIG265/03_MIG265_01.jpg',
  },
  {
    id: 'traditional',
    title: 'Traditional Indian',
    description: 'Rich wood tones, ornate details, and cultural motifs blended with modern comfort.',
    image: '/00 FINISHED/06 SHIVPRASAD RESIDENCE/06_SHIVPRASAD RESIDENCE_02.jpg',
  },
  {
    id: 'industrial',
    title: 'Industrial',
    description: 'Raw textures, exposed elements, and metal accents with warm wood undertones.',
    image: '/00 FINISHED/14 ROKVILLA OFFICE/14_ROKVILLA OFFICE_01.jpg',
  },
  {
    id: 'scandinavian',
    title: 'Scandinavian',
    description: 'Light woods, soft textures, and a cozy atmosphere with functional simplicity.',
    image: '/00 FINISHED/05 VANITHA RESIDENCE/05_VANITHA RESIDENCE_02.jpg',
  },
  {
    id: 'transitional',
    title: 'Transitional',
    description: 'The perfect bridge between classic elegance and contemporary comfort.',
    image: '/00 FINISHED/08 RAJ RESIDENCE/01_RAJ RESIDENCE_02.jpg',
  },
] as const

/* ── Key Features ── */

export interface KeyFeature {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly icon: string // SVG path
}

export const KEY_FEATURES: ReadonlyArray<KeyFeature> = [
  {
    id: 'kf-1',
    title: 'Inhouse Architects, Interior Designers & Project Coordinators',
    description: 'A dedicated team from concept to completion — no outsourcing, no miscommunication.',
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  },
  {
    id: 'kf-2',
    title: 'Free Estimation & Costing',
    description: 'Transparent pricing with no hidden costs. Get a detailed breakdown before you commit.',
    icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
  },
  {
    id: 'kf-3',
    title: 'Vastu Compliant Designing',
    description: 'Interiors designed in harmony with Vastu principles for positive energy and well-being.',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  },
  {
    id: 'kf-4',
    title: 'Free Interior Design & Drawings If Project Contract Signed',
    description: 'Complete interior design and technical drawings at no extra cost when you sign with us.',
    icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  },
  {
    id: 'kf-5',
    title: 'Daily Site Updates',
    description: 'Stay informed with daily progress photos and reports directly from your project site.',
    icon: 'M23 7l-7 5 7 5V7zM14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z',
  },
  {
    id: 'kf-6',
    title: '10 Years Warranty on Woodwork',
    description: 'Quality you can trust — all woodwork comes with a comprehensive 10-year warranty.',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  },
] as const

/* ── Material Features ── */

export interface MaterialFeature {
  readonly id: string
  readonly area: string
  readonly material: string
  readonly brand: string
  readonly description: string
  readonly icon: string // SVG path
}

export const MATERIAL_FEATURES: ReadonlyArray<MaterialFeature> = [
  {
    id: 'mf-1',
    area: 'Wet Areas Material',
    material: 'BWP Plywood',
    brand: 'Century',
    description: 'Boiling Water Proof plywood from Century — built to withstand moisture in kitchens and bathrooms.',
    icon: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z',
  },
  {
    id: 'mf-2',
    area: 'Dry Areas Material',
    material: 'MR Plywood & MDF',
    brand: '',
    description: 'Moisture-Resistant plywood and premium MDF for bedrooms, living areas, and wardrobes.',
    icon: 'M4 15s1-1 4-1 5 0 5-2 8-2 3 0 4 1 4 1V3s-1 1-4 1-5 0-5 2-8 2c-3 0-4-1-4-1v12z',
  },
  {
    id: 'mf-3',
    area: 'Shutter Material',
    material: 'HDHMR',
    brand: 'Action Tesa',
    description: 'High Density High Moisture Resistance boards from Action Tesa for durable, warp-free shutters.',
    icon: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  },
  {
    id: 'mf-4',
    area: 'Hinges',
    material: 'HETTICH Hinges',
    brand: 'Hettich',
    description: 'German-engineered Hettich hinges for smooth, silent, and long-lasting cabinet operation.',
    icon: 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83',
  },
] as const

/* ── Testimonials (furnish-specific) ── */

export const FURNISH_TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    id: 'ft-1',
    name: 'Suresh Kamath',
    initials: 'SK',
    projectType: 'Full Home Interior',
    location: 'Hubli',
    quote:
      'RokVilla transformed our 3BHK into a dream home. The modular kitchen and wardrobe quality is outstanding — everything feels premium yet was delivered within budget.',
    rating: 5,
  },
  {
    id: 'ft-2',
    name: 'Meera Hiremath',
    initials: 'MH',
    projectType: 'Kitchen & Living',
    location: 'Dharwad',
    quote:
      'The Century plywood and Hettich fittings they use make a real difference. Two years in, everything looks and functions like day one. Highly recommend their furnishing services.',
    rating: 5,
  },
  {
    id: 'ft-3',
    name: 'Arun Desai',
    initials: 'AD',
    projectType: 'Full Home Interior',
    location: 'Hubli',
    quote:
      'Daily site updates kept us informed throughout. The design team understood our Vastu requirements and delivered a contemporary look without compromising on any principle.',
    rating: 5,
  },
  {
    id: 'ft-4',
    name: 'Lakshmi Rao',
    initials: 'LR',
    projectType: 'Bedroom & Pooja Room',
    location: 'Ballari',
    quote:
      'The pooja room design was exactly what we envisioned — traditional yet modern. The woodwork warranty gave us confidence in the investment. Beautiful craftsmanship.',
    rating: 5,
  },
  {
    id: 'ft-5',
    name: 'Kiran Patil',
    initials: 'KP',
    projectType: 'Commercial Interior',
    location: 'Hubli',
    quote:
      'Our office interior by RokVilla has received endless compliments. The space planning maximised our floor area, and the material quality is clearly a cut above.',
    rating: 5,
  },
] as const

/* ── FAQ Items (furnish-specific) ── */

export type FurnishFAQCategory = 'materials' | 'process' | 'pricing' | 'customization'

export interface FurnishFAQItem {
  readonly id: string
  readonly category: FurnishFAQCategory
  readonly question: string
  readonly answer: string
}

export const FURNISH_FAQ_CATEGORIES: ReadonlyArray<{
  readonly id: FurnishFAQCategory
  readonly label: string
}> = [
  { id: 'materials', label: 'Materials & Quality' },
  { id: 'process', label: 'Process & Timeline' },
  { id: 'pricing', label: 'Pricing & Warranty' },
  { id: 'customization', label: 'Customization' },
] as const

export const FURNISH_FAQS: ReadonlyArray<FurnishFAQItem> = [
  {
    id: 'ffaq-1',
    category: 'materials',
    question: 'What type of plywood do you use for kitchen and bathroom cabinets?',
    answer:
      'We use BWP (Boiling Water Proof) plywood from Century for all wet areas including kitchens and bathrooms. This ensures your cabinets resist moisture, warping, and termite damage for years to come.',
  },
  {
    id: 'ffaq-2',
    category: 'materials',
    question: 'What is HDHMR and why do you use it for shutters?',
    answer:
      'HDHMR stands for High Density High Moisture Resistance. We source ours from Action Tesa — it offers superior screw-holding strength, does not warp like natural wood, and provides a perfectly smooth finish for lacquer or laminate.',
  },
  {
    id: 'ffaq-3',
    category: 'materials',
    question: 'Why do you specifically use Hettich hardware?',
    answer:
      'Hettich is a German brand known for precision-engineered hinges, drawer systems, and fittings. Their soft-close mechanisms are rated for 200,000+ cycles, ensuring decades of smooth, silent operation. We believe hardware quality directly impacts daily living experience.',
  },
  {
    id: 'ffaq-4',
    category: 'process',
    question: 'How long does a typical furnishing project take?',
    answer:
      'A standard 2–3 BHK full-home furnishing takes 45–60 days from design approval to handover. This includes manufacturing, on-site installation, and final finishing. We provide a detailed timeline during the estimation phase.',
  },
  {
    id: 'ffaq-5',
    category: 'process',
    question: 'How do daily site updates work?',
    answer:
      'Our project coordinator shares photos and progress notes via WhatsApp every working day. You see exactly what was accomplished, what is planned next, and can flag any concerns in real time. No surprises, ever.',
  },
  {
    id: 'ffaq-6',
    category: 'process',
    question: 'Do you handle the entire project or just furniture?',
    answer:
      'We provide end-to-end interior solutions — modular kitchens, wardrobes, TV units, false ceilings, electrical layouts, painting, and finishing touches. Our in-house team manages everything so you have a single point of contact.',
  },
  {
    id: 'ffaq-7',
    category: 'pricing',
    question: 'Is the interior design really free?',
    answer:
      'Yes, when you sign a project contract with us, the entire interior design phase — including 3D renders, working drawings, and material selection — is complimentary. This typically saves clients 8–12% of the overall project cost.',
  },
  {
    id: 'ffaq-8',
    category: 'pricing',
    question: 'What does the 10-year warranty cover?',
    answer:
      'Our warranty covers all woodwork including modular kitchens, wardrobes, TV units, and storage units against manufacturing defects, structural issues, and hardware failure. Normal wear and tear, misuse, and water damage from plumbing leaks are excluded.',
  },
  {
    id: 'ffaq-9',
    category: 'customization',
    question: 'Can I mix different design themes in different rooms?',
    answer:
      'Absolutely! Many of our clients choose a contemporary kitchen, a traditional pooja room, and a minimalist bedroom. Our designers ensure a cohesive flow between rooms while respecting each space\'s unique character.',
  },
  {
    id: 'ffaq-10',
    category: 'customization',
    question: 'Can you work with my existing furniture and layouts?',
    answer:
      'Yes, we regularly integrate existing furniture pieces into new designs. During the consultation, we assess what can be retained, refurbished, or replaced — ensuring your budget is spent where it matters most.',
  },
] as const
```

**Step 2: Verify the file compiles**

Run: `cd /Users/V-Personal/Rokvilla && npx tsc --noEmit src/lib/constants/furnish.ts 2>&1 | head -20`

If type errors occur (e.g., Testimonial import), fix them. The `Testimonial` type is exported from `src/lib/constants/design.ts:96-104`.

**Step 3: Commit**

```bash
git add src/lib/constants/furnish.ts
git commit -m "feat: add furnish page constants and data"
```

---

### Task 2: Refactor shared components (ConsultationForm, TestimonialsSection, FAQSection)

**Files:**
- Create: `src/components/shared/ConsultationForm.tsx`
- Create: `src/components/shared/TestimonialsSection.tsx`
- Create: `src/components/shared/FAQSection.tsx`
- Modify: `src/app/(main)/design/page.tsx` — update imports to use shared versions
- Modify: `src/components/design/ConsultationForm.tsx` — delete (replaced by shared)
- Modify: `src/components/design/TestimonialsSection.tsx` — delete (replaced by shared)
- Modify: `src/components/design/FAQSection.tsx` — delete (replaced by shared)

**Step 1: Create shared ConsultationForm**

Copy `src/components/design/ConsultationForm.tsx` to `src/components/shared/ConsultationForm.tsx` and add props:

```typescript
// Add these props to the component
interface ConsultationFormProps {
  readonly title?: string
  readonly subtitle?: string
  readonly categories?: ReadonlyArray<{ readonly value: string; readonly label: string }>
}

// Default values:
// title = 'You Dream. We Deliver.'
// subtitle = 'Ready to build your dream home?...'
// categories = [{ value: 'residential', label: 'Residential' }, ...]
```

The key changes from the Design version:
- Accept `title`, `subtitle`, and `categories` as optional props with defaults matching the current Design page values
- Everything else stays identical

**Step 2: Create shared TestimonialsSection**

Copy `src/components/design/TestimonialsSection.tsx` to `src/components/shared/TestimonialsSection.tsx` and add props:

```typescript
import type { Testimonial } from '@/lib/constants/design'

interface TestimonialsSectionProps {
  readonly testimonials: ReadonlyArray<Testimonial>
  readonly title?: string
  readonly subtitle?: string
}
```

Key change: Replace `DESIGN_TESTIMONIALS` import with a `testimonials` prop. The `TestimonialCard` component needs its type updated from `(typeof DESIGN_TESTIMONIALS)[number]` to `Testimonial`.

**Step 3: Create shared FAQSection**

Copy `src/components/design/FAQSection.tsx` to `src/components/shared/FAQSection.tsx` and make it generic:

```typescript
interface FAQSectionProps {
  readonly faqs: ReadonlyArray<{
    readonly id: string
    readonly category: string
    readonly question: string
    readonly answer: string
  }>
  readonly categories: ReadonlyArray<{
    readonly id: string
    readonly label: string
  }>
  readonly title?: string
  readonly subtitle?: string
}
```

Key changes:
- Replace `FAQCategory` type with generic `string`
- Replace `DESIGN_FAQS` and `FAQ_CATEGORIES` imports with props
- Default category state to first category from props: `categories[0].id`

**Step 4: Update Design page imports**

Modify `src/app/(main)/design/page.tsx`:
```typescript
import { ConsultationForm } from '@/components/shared/ConsultationForm'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { FAQSection } from '@/components/shared/FAQSection'
import { DESIGN_TESTIMONIALS, DESIGN_FAQS, FAQ_CATEGORIES } from '@/lib/constants/design'
```

And pass data as props in the JSX:
```tsx
<ConsultationForm />
<TestimonialsSection testimonials={DESIGN_TESTIMONIALS} />
<FAQSection
  faqs={DESIGN_FAQS}
  categories={FAQ_CATEGORIES}
  subtitle="Everything you need to know about our design services"
/>
```

Note: Design page becomes a **server component** that passes data to client components. The `ConsultationForm` with no props uses defaults (matching current behavior). `TestimonialsSection` and `FAQSection` need explicit data.

**Step 5: Delete old design-specific versions**

```bash
rm src/components/design/ConsultationForm.tsx
rm src/components/design/TestimonialsSection.tsx
rm src/components/design/FAQSection.tsx
```

**Step 6: Build and verify**

Run: `cd /Users/V-Personal/Rokvilla && npm run build 2>&1 | tail -30`

The Design page should build successfully with the shared components.

**Step 7: Commit**

```bash
git add -A
git commit -m "refactor: extract shared ConsultationForm, TestimonialsSection, FAQSection from design/"
```

---

### Task 3: Create FurnishHero component

**Files:**
- Create: `src/components/furnish/FurnishHero.tsx`

**Step 1: Write the FurnishHero component**

Mirror `src/components/design/DesignHero.tsx` exactly, with furnish-specific content:

```typescript
'use client'

import { motion } from 'framer-motion'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { ButtonDark } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeHeroContainerVariants, makeHeroItemVariants } from '@/lib/motion'

export function FurnishHero() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)

  return (
    <section aria-label="Furnish hero" className="relative h-dvh min-h-[600px] overflow-hidden">
      <VideoBackground
        imageSrc="/00 FINISHED/14 ROKVILLA OFFICE/14_ROKVILLA OFFICE_01.jpg"
        imageAlt="RokVilla interior furnishing — modern living space with premium materials"
      />

      <div className="relative z-10 flex h-full items-end pb-24 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl lg:max-w-3xl"
          >
            <motion.span
              variants={itemVariants}
              className="mb-6 block font-accent text-[13px] uppercase tracking-[0.18em] text-brass-light"
            >
              Furnishing Services
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.9] text-bone whitespace-pre-line"
            >
              {"Let's Furnish\nYour Rok-Villa"}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-stone md:text-lg"
            >
              End-to-end interior furnishing with premium materials, expert
              craftsmanship, and a 10-year warranty on all woodwork.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <ButtonDark variant="primary" href="#furnish-projects" className="w-full sm:w-auto">
                Browse Projects
              </ButtonDark>
              <ButtonDark variant="secondary" href="#consultation" className="w-full sm:w-auto">
                Book Consultation
              </ButtonDark>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.5, duration: reducedMotion ? 0.2 : 0.6 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <motion.svg
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={
            reducedMotion ? undefined : { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
          }
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-bone/70"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
```

Hero image: `/00 FINISHED/14 ROKVILLA OFFICE/14_ROKVILLA OFFICE_01.jpg` — this is an interior shot that fits the furnishing theme. Can be swapped later.

**Step 2: Commit**

```bash
git add src/components/furnish/FurnishHero.tsx
git commit -m "feat: add FurnishHero component"
```

---

### Task 4: Create HowItWorksSection component

**Files:**
- Create: `src/components/furnish/HowItWorksSection.tsx`

**Step 1: Write the HowItWorksSection component**

This is the 3-step process section from the PDF. Horizontal layout on desktop, stacked on mobile, with numbered circles and a connecting line.

```typescript
'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import { FURNISH_STEPS } from '@/lib/constants/furnish'

export function HowItWorksSection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            How Does This Work?
          </h2>
        </AnimatedSection>

        {/* Steps */}
        <AnimatedSection delay={0.15} className="mt-16 md:mt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative grid gap-12 md:grid-cols-3 md:gap-8"
          >
            {/* Connecting line — desktop only */}
            <div
              className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-10 hidden h-px bg-limestone md:block"
              aria-hidden="true"
            />

            {FURNISH_STEPS.map((step) => (
              <motion.div
                key={step.number}
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-terracotta bg-white">
                  <span className="font-display text-2xl font-medium text-terracotta">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-6 font-display text-xl font-medium text-obsidian md:text-2xl">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-slate">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/furnish/HowItWorksSection.tsx
git commit -m "feat: add HowItWorksSection for furnish page"
```

---

### Task 5: Create ProjectsGallerySection component

**Files:**
- Create: `src/components/furnish/ProjectsGallerySection.tsx`

**Step 1: Write the ProjectsGallerySection component**

Filterable gallery with room-type icons at top and project cards below. Uses the existing card pattern (4:3 aspect, gradient overlay).

```typescript
'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_QUART } from '@/lib/motion'
import { ROOM_CATEGORIES, FURNISH_PROJECTS } from '@/lib/constants/furnish'

export function ProjectsGallerySection() {
  const reducedMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? FURNISH_PROJECTS
        : FURNISH_PROJECTS.filter((p) => p.rooms.includes(activeFilter)),
    [activeFilter],
  )

  const handleFilter = useCallback((id: string) => {
    setActiveFilter(id)
  }, [])

  return (
    <section
      id="furnish-projects"
      aria-labelledby="furnish-projects-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="furnish-projects-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Our Projects
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            End-to-End Interior Solutions
          </p>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.15} className="mt-12">
          <div className="flex flex-wrap justify-center gap-3">
            {ROOM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilter(cat.id)}
                className={`inline-flex items-center gap-2 rounded-[2px] border px-4 min-h-[44px] font-body text-[12px] uppercase tracking-[0.08em] transition-all duration-200 ${
                  activeFilter === cat.id
                    ? 'border-terracotta bg-terracotta text-bone'
                    : 'border-limestone text-slate hover:border-obsidian/30 hover:text-obsidian'
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={cat.icon} />
                </svg>
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Project cards — edge-to-edge on mobile */}
      <AnimatedSection delay={0.25} className="mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.25, ease: EASE_OUT_QUART }}
            className="flex gap-3 overflow-x-auto scroll-snap-x no-scrollbar px-3 pb-4 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-4"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative w-[85vw] max-w-[400px] shrink-0 scroll-snap-start overflow-hidden rounded-[4px] md:w-auto md:max-w-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
                    className="h-full w-full"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.category}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 85vw, 33vw"
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent p-5 pt-16">
                    <span className="font-accent text-[11px] uppercase tracking-[0.14em] text-bone/60">
                      {project.category}
                    </span>
                    <h3 className="font-display text-lg font-medium text-bone">
                      {project.title}
                    </h3>
                    <p className="mt-0.5 font-body text-xs text-bone/50">
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </AnimatedSection>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/furnish/ProjectsGallerySection.tsx
git commit -m "feat: add ProjectsGallerySection with room-type filters"
```

---

### Task 6: Create DesignThemesSection component

**Files:**
- Create: `src/components/furnish/DesignThemesSection.tsx`

**Step 1: Write the DesignThemesSection component**

Grid of theme cards with image + title overlay, using the same card pattern.

```typescript
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants, EASE_OUT_QUART } from '@/lib/motion'
import { DESIGN_THEMES } from '@/lib/constants/furnish'

export function DesignThemesSection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section
      aria-labelledby="design-themes-heading"
      className="bg-parchment py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2
            id="design-themes-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Design Themes
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Explore curated interior styles tailored to your lifestyle
          </p>
        </AnimatedSection>
      </div>

      {/* Theme cards — edge-to-edge */}
      <AnimatedSection delay={0.15} className="mt-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex gap-3 overflow-x-auto scroll-snap-x no-scrollbar px-3 pb-4 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-4"
        >
          {DESIGN_THEMES.map((theme) => (
            <motion.div
              key={theme.id}
              variants={{
                hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative w-[85vw] max-w-[400px] shrink-0 scroll-snap-start overflow-hidden rounded-[4px] md:w-auto md:max-w-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
                  className="h-full w-full"
                >
                  <Image
                    src={theme.image}
                    alt={`${theme.title} interior design theme`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 85vw, 33vw"
                  />
                </motion.div>

                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent p-5 pt-16">
                  <h3 className="font-display text-lg font-medium text-bone">
                    {theme.title}
                  </h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-bone/60">
                    {theme.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/furnish/DesignThemesSection.tsx
git commit -m "feat: add DesignThemesSection for furnish page"
```

---

### Task 7: Create KeyFeaturesSection component

**Files:**
- Create: `src/components/furnish/KeyFeaturesSection.tsx`

**Step 1: Write the KeyFeaturesSection component**

6 feature cards in a 2×3 grid (mobile: stacked) with terracotta accent styling matching the PDF's colored cards.

```typescript
'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import { KEY_FEATURES } from '@/lib/constants/furnish'

export function KeyFeaturesSection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section
      aria-labelledby="key-features-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2
            id="key-features-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Key Features
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Why families across Karnataka trust RokVilla with their homes
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mt-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {KEY_FEATURES.map((feature) => (
              <motion.div
                key={feature.id}
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group rounded-[4px] border border-limestone/60 bg-parchment p-6 transition-shadow duration-300 hover:shadow-card-hover md:p-8"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-terracotta"
                    aria-hidden="true"
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-display text-lg font-medium leading-snug text-obsidian">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 font-body text-sm leading-relaxed text-slate">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/furnish/KeyFeaturesSection.tsx
git commit -m "feat: add KeyFeaturesSection for furnish page"
```

---

### Task 8: Create MaterialFeaturesSection component

**Files:**
- Create: `src/components/furnish/MaterialFeaturesSection.tsx`

**Step 1: Write the MaterialFeaturesSection component**

4 material cards showing specs and brand names, display-only.

```typescript
'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import { MATERIAL_FEATURES } from '@/lib/constants/furnish'

export function MaterialFeaturesSection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section
      aria-labelledby="materials-heading"
      className="bg-parchment py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2
            id="materials-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Material Features
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Premium materials for lasting quality and durability
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mt-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {MATERIAL_FEATURES.map((mat) => (
              <motion.div
                key={mat.id}
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="rounded-[4px] border border-limestone/60 bg-white p-6 text-center md:p-8"
              >
                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/10">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-terracotta"
                    aria-hidden="true"
                  >
                    <path d={mat.icon} />
                  </svg>
                </div>

                {/* Area label */}
                <h3 className="mt-5 font-display text-lg font-medium text-obsidian">
                  {mat.area}
                </h3>

                {/* Material name */}
                <p className="mt-1 font-body text-sm font-semibold text-terracotta">
                  {mat.material}
                </p>

                {/* Brand */}
                {mat.brand && (
                  <p className="mt-1 font-accent text-[11px] uppercase tracking-[0.12em] text-stone">
                    from {mat.brand}
                  </p>
                )}

                {/* Description */}
                <p className="mt-3 font-body text-xs leading-relaxed text-slate">
                  {mat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/furnish/MaterialFeaturesSection.tsx
git commit -m "feat: add MaterialFeaturesSection for furnish page"
```

---

### Task 9: Create the Furnish page route and wire everything together

**Files:**
- Create: `src/app/(main)/furnish/page.tsx`

**Step 1: Write the page component**

```typescript
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
    'End-to-end interior furnishing with premium materials, expert craftsmanship, and a 10-year warranty. Browse projects, choose design themes, and connect with us.',
}

const FURNISH_FORM_CATEGORIES = [
  { value: 'full-home', label: 'Full Home Interior' },
  { value: 'kitchen', label: 'Modular Kitchen' },
  { value: 'bedroom', label: 'Bedroom & Wardrobe' },
  { value: 'living', label: 'Living Room' },
  { value: 'commercial', label: 'Commercial Interior' },
] as const

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
        subtitle="Ready to transform your space? Schedule a free consultation today and let our interior design team bring your vision to life."
        categories={FURNISH_FORM_CATEGORIES}
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
```

**Step 2: Commit**

```bash
git add src/app/\(main\)/furnish/page.tsx
git commit -m "feat: add furnish page route with all sections"
```

---

### Task 10: Update navigation and service links

**Files:**
- Modify: `src/components/layout/Navigation.tsx:14-18` — update `SERVICE_CHILDREN`
- Modify: `src/components/layout/MenuOverlay.tsx:8-21` — update `MENU_LINKS`
- Modify: `src/lib/constants/services.ts:28` — update furnish href

**Step 1: Update Navigation.tsx**

Change line 17 in `SERVICE_CHILDREN`:
```typescript
{ label: 'Furnish', href: '/furnish' },
```
(was `/services/furnish`)

**Step 2: Update MenuOverlay.tsx**

Change line 17 in `MENU_LINKS`:
```typescript
{ label: 'Furnish', href: '/furnish' },
```
(was `/services/furnish`)

**Step 3: Update services.ts**

Change line 28:
```typescript
href: '/furnish',
```
(was `/services/furnish`)

**Step 4: Commit**

```bash
git add src/components/layout/Navigation.tsx src/components/layout/MenuOverlay.tsx src/lib/constants/services.ts
git commit -m "feat: update navigation and service links for dedicated furnish page"
```

---

### Task 11: Build verification and final check

**Step 1: Full build**

Run: `cd /Users/V-Personal/Rokvilla && npm run build 2>&1 | tail -40`

Expected: Build succeeds with no errors. Both `/design` and `/furnish` routes compile.

**Step 2: Dev server smoke test**

Run: `cd /Users/V-Personal/Rokvilla && npm run dev`

Manually verify:
- [ ] `/furnish` loads with full-screen hero
- [ ] All sections render in order
- [ ] Room-type filter tabs work on Projects section
- [ ] Consultation form validates and submits
- [ ] Testimonials carousel scrolls horizontally
- [ ] FAQ category tabs switch content
- [ ] Navigation "Furnish" link in Services dropdown goes to `/furnish`
- [ ] Menu overlay "Furnish" link goes to `/furnish`
- [ ] Homepage service cards "Furnish" goes to `/furnish`
- [ ] `/design` still works correctly with shared components

**Step 3: Fix any issues found**

**Step 4: Final commit if any fixes applied**

```bash
git add -A
git commit -m "fix: resolve build/visual issues on furnish page"
```
