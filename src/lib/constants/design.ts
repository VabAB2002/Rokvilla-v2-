/* ═══════════════════════════════════════════════
   RokVilla Design Page — Constants & Data
   ═══════════════════════════════════════════════ */

/* ── Process Steps ── */

export interface ProcessStep {
  readonly number: string
  readonly title: string
  readonly description: string
  readonly href: string
}

export const DESIGN_STEPS: ReadonlyArray<ProcessStep> = [
  {
    number: '01',
    title: 'Go Through Our Projects',
    description:
      'Browse our portfolio of residential, commercial, and interior projects to find inspiration for your vision.',
    href: '#design-projects',
  },
  {
    number: '02',
    title: 'Choose Your Design Service',
    description:
      'Select the type of architectural or interior design service that fits your project requirements.',
    href: '#dockets',
  },
  {
    number: '03',
    title: 'Connect With Us',
    description:
      'Schedule a free consultation and let our team turn your dream into a detailed, buildable design.',
    href: '#consultation',
  },
] as const

/* ── Pricing Services (à la carte) ── */

export type PricingUnit = 'sqft' | 'room' | 'unit'

export interface PricingService {
  readonly id: string
  readonly name: string
  readonly shortName: string
  readonly unit: PricingUnit
  readonly iconPath: string
}

export interface PricingCategory {
  readonly id: string
  readonly label: string
  readonly shortLabel: string
}

export const PRICING_CATEGORIES: ReadonlyArray<PricingCategory> = [
  { id: 'small-residential', label: "Residential (up to 30'×50')", shortLabel: 'Small Residential' },
  { id: 'large-residential', label: "Residential (40'×60' & above)", shortLabel: 'Large Residential' },
  { id: 'commercial-small', label: 'Commercial & Hospitality (< 5,000 sqft)', shortLabel: 'Commercial < 5K' },
  { id: 'commercial-large', label: 'Commercial & Hospitality (≥ 5,000 sqft)', shortLabel: 'Commercial ≥ 5K' },
] as const

export const PRICING_SERVICES: ReadonlyArray<PricingService> = [
  {
    id: 'floor-plans',
    name: 'Floor Plans',
    shortName: 'Floor Plans',
    unit: 'sqft',
    iconPath: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z',
  },
  {
    id: '3d-exterior',
    name: '3D Renders — Exterior',
    shortName: '3D Exterior',
    unit: 'sqft',
    iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    id: '3d-basic-interior',
    name: '3D Renders — Basic Interior',
    shortName: '3D Basic Interior',
    unit: 'room',
    iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z',
  },
  {
    id: '3d-luxury-interior',
    name: '3D Renders — Luxury Interior',
    shortName: '3D Luxury Interior',
    unit: 'room',
    iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z',
  },
  {
    id: 'walkthrough-basic',
    name: '3D + Walkthrough — Basic Interior',
    shortName: 'Walkthrough Basic',
    unit: 'sqft',
    iconPath: 'M5 3l14 9-14 9V3z',
  },
  {
    id: 'walkthrough-luxury',
    name: '3D + Walkthrough — Luxury Interior',
    shortName: 'Walkthrough Luxury',
    unit: 'sqft',
    iconPath: 'M19.82 2H4.18A2.18 2.18 0 0 0 2 4.18v15.64A2.18 2.18 0 0 0 4.18 22h15.64A2.18 2.18 0 0 0 22 19.82V4.18A2.18 2.18 0 0 0 19.82 2zM7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5',
  },
  {
    id: 'wall-marking-2d',
    name: 'Wall-Marking Plans & 2D Elevation',
    shortName: 'Wall-Marking & 2D',
    unit: 'sqft',
    iconPath: 'M2 20h20M5 20V10l7-7 7 7v10M9 20v-6h6v6',
  },
  {
    id: 'electrical-plumbing',
    name: 'Electrical & Plumbing Drawings',
    shortName: 'Electrical & Plumbing',
    unit: 'sqft',
    iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  },
  {
    id: 'site-measured',
    name: 'Site & Property Measured Drawings',
    shortName: 'Site Measured Dwgs',
    unit: 'sqft',
    iconPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  },
  {
    id: 'furniture-working',
    name: 'Detailed Furniture Working Drawings',
    shortName: 'Furniture Dwgs',
    unit: 'unit',
    iconPath: 'M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3M3 16h18M5 19v2M19 19v2M3 11a2 2 0 0 0-1 2v3h20v-3a2 2 0 0 0-1-2',
  },
  {
    id: 'boq',
    name: 'Bill of Quantities (BOQ)',
    shortName: 'BOQ',
    unit: 'sqft',
    iconPath: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5h6M9 14h6M9 10h6',
  },
] as const

export type PricingCategoryId = (typeof PRICING_CATEGORIES)[number]['id']
export type PricingServiceId = (typeof PRICING_SERVICES)[number]['id']

type RateMap = Readonly<Record<PricingServiceId, number>>

export const PRICING_RATES: Readonly<Record<PricingCategoryId, RateMap>> = {
  'small-residential': {
    'floor-plans': 5,
    '3d-exterior': 2.5,
    '3d-basic-interior': 20,
    '3d-luxury-interior': 30,
    'walkthrough-basic': 7,
    'walkthrough-luxury': 10,
    'wall-marking-2d': 1.5,
    'electrical-plumbing': 5,
    'site-measured': 0.75,
    'furniture-working': 1000,
    'boq': 4,
  },
  'large-residential': {
    'floor-plans': 7,
    '3d-exterior': 4,
    '3d-basic-interior': 25,
    '3d-luxury-interior': 35,
    'walkthrough-basic': 9,
    'walkthrough-luxury': 12,
    'wall-marking-2d': 2,
    'electrical-plumbing': 7,
    'site-measured': 0.75,
    'furniture-working': 1200,
    'boq': 5,
  },
  'commercial-small': {
    'floor-plans': 4,
    '3d-exterior': 2,
    '3d-basic-interior': 25,
    '3d-luxury-interior': 35,
    'walkthrough-basic': 9,
    'walkthrough-luxury': 12,
    'wall-marking-2d': 2,
    'electrical-plumbing': 7,
    'site-measured': 0.75,
    'furniture-working': 1200,
    'boq': 4,
  },
  'commercial-large': {
    'floor-plans': 2,
    '3d-exterior': 1,
    '3d-basic-interior': 25,
    '3d-luxury-interior': 35,
    'walkthrough-basic': 6,
    'walkthrough-luxury': 8,
    'wall-marking-2d': 1,
    'electrical-plumbing': 3,
    'site-measured': 0.75,
    'furniture-working': 1200,
    'boq': 4,
  },
} as const

/* ── Testimonials ── */

export interface Testimonial {
  readonly id: string
  readonly name: string
  readonly initials: string
  readonly projectType: string
  readonly location: string
  readonly quote: string
  readonly rating: number
}

export const DESIGN_TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    id: 'test-1',
    name: 'Rajesh Kulkarni',
    initials: 'RK',
    projectType: 'Residential',
    location: 'Hubli',
    quote:
      'RokVilla transformed our vague ideas into a stunning home design. Their attention to vastu compliance while keeping the aesthetics modern was impressive.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Priya Deshpande',
    initials: 'PD',
    projectType: 'Interior',
    location: 'Dharwad',
    quote:
      'The interior design for our apartment exceeded all expectations. Every corner feels intentional, from the custom joinery to the lighting plan.',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Mahesh Patil',
    initials: 'MP',
    projectType: 'Commercial',
    location: 'Hubli',
    quote:
      'Our showroom design by RokVilla increased foot traffic by 40%. The spatial planning and facade design completely stand out on the street.',
    rating: 5,
  },
  {
    id: 'test-4',
    name: 'Anita Hegde',
    initials: 'AH',
    projectType: 'Residential',
    location: 'Ballari',
    quote:
      'From the first sketch to final drawings, the team was incredibly responsive. They balanced our budget constraints without compromising the design quality.',
    rating: 5,
  },
  {
    id: 'test-5',
    name: 'Vinay Joshi',
    initials: 'VJ',
    projectType: 'Residential',
    location: 'Dharwad',
    quote:
      'What sets RokVilla apart is their construction-aware design approach. The drawings were so detailed that our contractor had zero ambiguity during execution.',
    rating: 5,
  },
  {
    id: 'test-6',
    name: 'Sneha Naik',
    initials: 'SN',
    projectType: 'Interior',
    location: 'Hubli',
    quote:
      'They designed our café interior with a perfect blend of warmth and modern edge. Customers constantly compliment the space — it speaks for itself.',
    rating: 5,
  },
] as const

/* ── FAQ Items ── */

export type FAQCategory = 'design' | 'process' | 'pricing' | 'timeline'

export interface FAQItem {
  readonly id: string
  readonly category: FAQCategory
  readonly question: string
  readonly answer: string
}

export const FAQ_CATEGORIES: ReadonlyArray<{
  readonly id: FAQCategory
  readonly label: string
}> = [
  { id: 'design', label: 'Design' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'timeline', label: 'Timeline' },
] as const

export const DESIGN_FAQS: ReadonlyArray<FAQItem> = [
  {
    id: 'faq-1',
    category: 'design',
    question: 'What is included in a residential design package?',
    answer:
      'Our residential design packages include site analysis, conceptual design, floor plans, elevations, section drawings, and 3D visualisations. Premium packages also include interior layout, landscape design, and a detailed bill of quantities.',
  },
  {
    id: 'faq-2',
    category: 'design',
    question: 'Do you incorporate Vastu principles in your designs?',
    answer:
      'Yes, we integrate Vastu Shastra principles into our designs upon request. Our architects balance traditional Vastu guidelines with contemporary design aesthetics to create spaces that are both compliant and visually striking.',
  },
  {
    id: 'faq-3',
    category: 'design',
    question: 'Can you design for plots with irregular shapes or constraints?',
    answer:
      'Absolutely. We specialise in maximising potential on challenging plots — narrow frontages, irregular shapes, sloped terrain, and corner sites. Our design approach turns constraints into unique architectural features.',
  },
  {
    id: 'faq-4',
    category: 'process',
    question: 'How does the design consultation process work?',
    answer:
      'It starts with a free initial consultation where we understand your requirements, budget, and vision. We then present a conceptual design within 2 weeks, followed by iterative refinement based on your feedback until you are fully satisfied.',
  },
  {
    id: 'faq-5',
    category: 'process',
    question: 'How many revision rounds are included?',
    answer:
      'The number of revision rounds depends on your chosen docket. Basic includes 2 rounds, Standard includes 4, and Premium offers unlimited revisions. Each round covers changes to layout, elevations, and material specifications.',
  },
  {
    id: 'faq-6',
    category: 'pricing',
    question: 'How is the design fee calculated?',
    answer:
      'Design fees are typically calculated per square foot of built-up area and vary by project complexity. We provide a detailed fee breakdown during the initial consultation so there are no surprises. Fees cover all drawings, renders, and site visits.',
  },
  {
    id: 'faq-7',
    category: 'pricing',
    question: 'Is the consultation fee deducted from the project cost?',
    answer:
      'The initial consultation is completely free with no obligations. If you proceed with our design services, we provide a transparent quotation based on your specific project scope and requirements.',
  },
  {
    id: 'faq-8',
    category: 'timeline',
    question: 'How long does a complete design take?',
    answer:
      'A typical residential design takes 4–8 weeks from the first meeting to final construction drawings. This includes conceptual design (1–2 weeks), client revisions (1–2 weeks), and detailed working drawings (2–4 weeks). Commercial projects may take longer.',
  },
  {
    id: 'faq-9',
    category: 'timeline',
    question: 'Can the design process be expedited for urgent projects?',
    answer:
      'Yes, we offer an expedited design track for time-sensitive projects. With dedicated resources and streamlined review cycles, we can compress timelines by up to 40% while maintaining our quality standards.',
  },
  {
    id: 'faq-10',
    category: 'process',
    question: 'Do you provide construction supervision after design completion?',
    answer:
      'Yes, we offer optional construction supervision services to ensure the built outcome matches the design intent. This includes periodic site visits, material verification, and coordination with contractors throughout the construction phase.',
  },
] as const

/* ── Stats ── */

export interface Stat {
  readonly value: number
  readonly suffix: string
  readonly label: string
}

export const DESIGN_STATS: ReadonlyArray<Stat> = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '%', label: 'Quality Assurance' },
  { value: 0, suffix: '%', label: 'Cost Overrun' },
] as const
