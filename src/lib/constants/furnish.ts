/* ═══════════════════════════════════════════════
   RokVilla Furnish Page — Constants & Data
   ═══════════════════════════════════════════════ */

import type { Testimonial } from './design'

/* ── Furnish Steps ── */

export interface FurnishStep {
  readonly number: string
  readonly title: string
  readonly description: string
  readonly href: string
}

export const FURNISH_STEPS: ReadonlyArray<FurnishStep> = [
  {
    number: '01',
    title: 'Go Through Our Designs',
    description:
      'Explore our portfolio of furnished interiors across kitchens, living rooms, bedrooms, and more to spark your vision.',
    href: '#furnish-projects',
  },
  {
    number: '02',
    title: 'Choose Design Themes You Like',
    description:
      'Pick the aesthetic direction that resonates — from contemporary minimalism to rich traditional Indian styles.',
    href: '#design-themes',
  },
  {
    number: '03',
    title: 'Connect With Us',
    description:
      'Book a free consultation and let our in-house designers craft a personalised furnishing plan for your home.',
    href: '#consultation',
  },
] as const

/* ── Room Categories ── */

export interface RoomCategory {
  readonly id: string
  readonly label: string
  readonly icon: string
}

export const ROOM_CATEGORIES: ReadonlyArray<RoomCategory> = [
  {
    id: 'all',
    label: 'All',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
  {
    id: 'living-room',
    label: 'Living Room',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    icon: 'M3 12v3m0 0v3m0-3h3m-3 0H0m21 0v3m0-3v3m0-3h-3m3 0h3M12 3H9a6 6 0 00-6 6v6h18V9a6 6 0 00-6-6h-3',
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: 'M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
  },
  {
    id: 'pooja-room',
    label: 'Pooja Room',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  },
] as const

/* ── Furnish Projects ── */

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
    id: 'proj-sripradha',
    title: 'Sripradha Residence',
    location: 'Hubli',
    category: 'Residential Interior',
    image: '/00 FINISHED/01 SRIPRADHA/01_SRIPRADHA_01.jpg',
    rooms: ['living-room', 'bedroom', 'kitchen'],
  },
  {
    id: 'proj-mig265',
    title: 'MIG 265',
    location: 'Dharwad',
    category: 'Full Home Interior',
    image: '/00 FINISHED/03 MIG265/03_MIG265_01.jpg',
    rooms: ['living-room', 'bedroom', 'kitchen', 'bathroom'],
  },
  {
    id: 'proj-vanitha',
    title: 'Vanitha Residence',
    location: 'Hubli',
    category: 'Residential Interior',
    image: '/00 FINISHED/05 VANITHA RESIDENCE/05_VANITHA RESIDENCE_01.jpg',
    rooms: ['living-room', 'kitchen', 'pooja-room'],
  },
  {
    id: 'proj-shivprasad',
    title: 'Shivprasad Residence',
    location: 'Dharwad',
    category: 'Full Home Interior',
    image: '/00 FINISHED/06 SHIVPRASAD RESIDENCE/06_SHIVPRASAD RESIDENCE_01.jpg',
    rooms: ['living-room', 'bedroom', 'kitchen', 'bathroom', 'pooja-room'],
  },
  {
    id: 'proj-pavan-vj',
    title: 'Pavan VJ Residence',
    location: 'Hubli',
    category: 'Residential Interior',
    image: '/00 FINISHED/07 PAVAN VJ /07_PAVAN VJ_01.jpg',
    rooms: ['living-room', 'bedroom', 'kitchen'],
  },
  {
    id: 'proj-raj',
    title: 'Raj Residence',
    location: 'Hubli',
    category: 'Full Home Interior',
    image: '/00 FINISHED/08 RAJ RESIDENCE/01_RAJ RESIDENCE_01.jpg',
    rooms: ['living-room', 'bedroom', 'kitchen', 'bathroom'],
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
    id: 'luxe',
    title: 'Luxe',
    description:
      'Opulent finishes, rich textures, and statement pieces create interiors that exude sophistication and grandeur in every detail.',
    image: '/00 FINISHED/FURNISH THEMES/LUXE.jpg',
  },
  {
    id: 'traditional-indian',
    title: 'Traditional Indian',
    description:
      'Rich warm tones, intricate carved details, and heritage motifs celebrate Indian craftsmanship while creating deeply personal homes.',
    image: '/00 FINISHED/FURNISH THEMES/traditional indian .png',
  },
  {
    id: 'modern-contemporary',
    title: 'Modern Contemporary',
    description:
      'Clean lines, neutral palettes, and sophisticated textures define this timeless style that balances comfort with refined elegance.',
    image: '/00 FINISHED/FURNISH THEMES/MODERN CONTEMPORARY.jpg',
  },
  {
    id: 'urban-minimalism',
    title: 'Urban Minimalism',
    description:
      'Less is more — curated materials, purposeful furniture, and uncluttered spaces let every element breathe and speak for itself.',
    image: '/00 FINISHED/FURNISH THEMES/MINIMALISM.jpg',
  },
  {
    id: 'european',
    title: 'European',
    description:
      'Timeless European elegance with classic proportions, moulded details, and a refined palette that brings old-world charm to modern living.',
    image: '/00 FINISHED/FURNISH THEMES/EUROPEANjpg.jpg',
  },
  {
    id: 'industrial',
    title: 'Industrial',
    description:
      'Exposed concrete, raw metal accents, and open structural elements create bold, edgy interiors with urban character.',
    image: '/00 FINISHED/FURNISH THEMES/INDUSTRIAL.jpg',
  },
  {
    id: 'boho',
    title: 'Boho',
    description:
      'Eclectic textures, earthy tones, and layered patterns bring a free-spirited, globally inspired warmth to your living spaces.',
    image: '/00 FINISHED/FURNISH THEMES/bohemain.jpg',
  },
  {
    id: 'neoclassic',
    title: 'Neoclassic',
    description:
      'Stately symmetry, ornate mouldings, and a restrained colour palette reimagine classical grandeur for the modern Indian home.',
    image: '/00 FINISHED/FURNISH THEMES/NEOCLASSICAL.jpg',
  },
  {
    id: 'moroccan',
    title: 'Moroccan',
    description:
      'Vibrant geometric patterns, arched doorways, and jewel-toned accents transport you to the riads of Marrakech with every room.',
    image: '/00 FINISHED/FURNISH THEMES/MOROCCAN.png',
  },
] as const

/* ── Key Features ── */

export interface KeyFeature {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly icon: string
}

export const KEY_FEATURES: ReadonlyArray<KeyFeature> = [
  {
    id: 'feat-inhouse-team',
    title: 'Inhouse Architects, Designers & Coordinators',
    description:
      'Our entire design and execution team is in-house — no outsourcing, no gaps in communication, just seamless end-to-end ownership.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    id: 'feat-free-estimation',
    title: 'Free Estimation & Costing',
    description:
      'Get a detailed material-wise cost estimate at no charge. You know exactly what you are paying for before a single rupee is spent.',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  },
  {
    id: 'feat-vastu',
    title: 'Vastu Compliant Designing',
    description:
      'Every furnishing layout is thoughtfully aligned with Vastu Shastra principles so your home feels balanced, positive, and harmonious.',
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  },
  {
    id: 'feat-free-drawings',
    title: 'Free Interior Design & Drawings If Project Contract Signed',
    description:
      'Sign a project contract with us and receive complete interior design drawings at no additional cost — a significant value addition.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    id: 'feat-daily-updates',
    title: 'Daily Site Updates',
    description:
      'Stay informed every step of the way with daily progress photos and updates from the site, directly to your phone.',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  },
  {
    id: 'feat-warranty',
    title: '10 Years Warranty on Woodwork',
    description:
      'Our cabinetry and woodwork comes with an industry-leading 10-year warranty — built to last, backed by our commitment.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
] as const

/* ── Material Features ── */

export interface MaterialFeature {
  readonly id: string
  readonly area: string
  readonly material: string
  readonly brand: string
  readonly description: string
  readonly icon: string
}

export const MATERIAL_FEATURES: ReadonlyArray<MaterialFeature> = [
  {
    id: 'mat-wet',
    area: 'Wet Areas',
    material: 'BWP Plywood',
    brand: 'Century',
    description:
      'Boiling Water Proof plywood from Century ensures superior moisture resistance in kitchens, bathrooms, and other wet areas — no warping, no swelling.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    id: 'mat-dry',
    area: 'Dry Areas',
    material: 'MR Plywood & MDF',
    brand: 'Premium Grade',
    description:
      'Moisture Resistant plywood and MDF provide structural stability and a smooth finish surface for wardrobes, TV units, and all dry area cabinetry.',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
  {
    id: 'mat-shutter',
    area: 'Shutter',
    material: 'HDHMR',
    brand: 'Action Tesa',
    description:
      'High Density High Moisture Resistant board from Action Tesa delivers exceptional screw-holding strength and a premium finish on all shutter surfaces.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  },
  {
    id: 'mat-hinges',
    area: 'Hinges',
    material: 'HETTICH Hinges',
    brand: 'HETTICH',
    description:
      'German-engineered HETTICH hinges provide smooth, silent, and long-lasting operation — tested to over 100,000 open-close cycles.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
] as const

/* ── Furnish Testimonials ── */

export const FURNISH_TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    id: 'furn-test-1',
    name: 'Suresh Bhat',
    initials: 'SB',
    projectType: 'Full Home Interior',
    location: 'Hubli',
    quote:
      'RokVilla transformed our bare apartment into a warm, fully furnished home in just 45 days. The modular kitchen alone exceeded our expectations — every inch is utilised so smartly.',
    rating: 5,
  },
  {
    id: 'furn-test-2',
    name: 'Kavitha Rao',
    initials: 'KR',
    projectType: 'Modular Kitchen',
    location: 'Dharwad',
    quote:
      'The modular kitchen design is outstanding. They understood my workflow perfectly and the HDHMR shutters look and feel premium. The 10-year warranty gave us complete peace of mind.',
    rating: 5,
  },
  {
    id: 'furn-test-3',
    name: 'Deepak Kulkarni',
    initials: 'DK',
    projectType: 'Bedroom & Wardrobe',
    location: 'Hubli',
    quote:
      'The custom wardrobes for all three bedrooms are impeccably built. HETTICH hinges move like butter and the BWP plywood in our bathroom area has shown zero swelling even after two monsoons.',
    rating: 5,
  },
  {
    id: 'furn-test-4',
    name: 'Meena Patil',
    initials: 'MP',
    projectType: 'Living Room Furnishing',
    location: 'Ballari',
    quote:
      'Daily site update photos were a game changer for us since we were moving from Bangalore. We always knew exactly where things stood without a single call to the site.',
    rating: 5,
  },
  {
    id: 'furn-test-5',
    name: 'Arun Hegde',
    initials: 'AH',
    projectType: 'Full Home Interior',
    location: 'Dharwad',
    quote:
      'The free estimation was spot-on — not a single surprise cost at the end. The Vastu compliant layout for our pooja room feels exactly right, and the entire interior is beautifully cohesive.',
    rating: 5,
  },
] as const

/* ── Furnish FAQs ── */

export type FurnishFAQCategory = 'materials' | 'process' | 'pricing' | 'customization'

export const FURNISH_FAQ_CATEGORIES: ReadonlyArray<{
  readonly id: FurnishFAQCategory
  readonly label: string
}> = [
  { id: 'materials', label: 'Materials' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'customization', label: 'Customization' },
] as const

export interface FurnishFAQItem {
  readonly id: string
  readonly category: FurnishFAQCategory
  readonly question: string
  readonly answer: string
}

export const FURNISH_FAQS: ReadonlyArray<FurnishFAQItem> = [
  {
    id: 'furn-faq-1',
    category: 'materials',
    question: 'What type of plywood do you use and why does it matter?',
    answer:
      'We use BWP (Boiling Water Proof) plywood from Century for all wet areas like kitchens and bathrooms, and MR (Moisture Resistant) plywood for dry areas. This distinction ensures your furniture withstands Indian climate conditions without warping or delaminating over time.',
  },
  {
    id: 'furn-faq-2',
    category: 'materials',
    question: 'Why do you use HDHMR for shutters instead of regular MDF?',
    answer:
      'HDHMR (High Density High Moisture Resistant) board from Action Tesa offers superior screw-holding strength, better moisture resistance, and a smoother surface compared to standard MDF. It is the ideal substrate for laminates and paints, and it holds hinges and handles firmly over years of daily use.',
  },
  {
    id: 'furn-faq-3',
    category: 'materials',
    question: 'What makes HETTICH hinges a better choice?',
    answer:
      'HETTICH is a German brand renowned for precision engineering. Their hinges are tested to over 100,000 open-close cycles, offer soft-close functionality, and maintain their alignment without drooping over the years — unlike cheaper alternatives that loosen or squeak within a few years.',
  },
  {
    id: 'furn-faq-4',
    category: 'process',
    question: 'How long does a full home interior project typically take?',
    answer:
      'A full home interior project typically takes 45 to 75 days from design approval to handover, depending on the size of the home and the scope of work. We provide a detailed project timeline at the start so you can plan your move-in date with confidence.',
  },
  {
    id: 'furn-faq-5',
    category: 'process',
    question: 'How will I track the progress of my project?',
    answer:
      'We send daily site update photos and progress summaries directly to you via WhatsApp. You are never in the dark about what is happening on site, which is especially helpful if you are not in the city during the execution phase.',
  },
  {
    id: 'furn-faq-6',
    category: 'process',
    question: 'Do I need to be present on site during the work?',
    answer:
      'Not at all. Our in-house coordinators manage the entire execution from start to finish. With daily updates and a dedicated point of contact, you stay informed and in control without needing to visit the site regularly.',
  },
  {
    id: 'furn-faq-7',
    category: 'pricing',
    question: 'Is the estimation really free? What does it include?',
    answer:
      'Yes, our estimation is completely free with no obligation. It includes a room-by-room breakdown of material costs, hardware costs, and labour costs based on your design brief. You get full transparency into what you are spending before committing to anything.',
  },
  {
    id: 'furn-faq-8',
    category: 'pricing',
    question: 'How is the pricing structured for a full home interior?',
    answer:
      'Pricing depends on the scope — the number of rooms, material choices, and design complexity. We provide a fixed-price contract after the free estimation so there are no surprises. The quoted amount is what you pay, period.',
  },
  {
    id: 'furn-faq-9',
    category: 'customization',
    question: 'Can I choose my own colour palette and laminate finishes?',
    answer:
      'Absolutely. Our designers guide you through a curated selection of laminates, veneers, paints, and hardware finishes to match your preferred theme. You have full creative input at every stage, supported by our team\'s expertise in what works best in real homes.',
  },
  {
    id: 'furn-faq-10',
    category: 'customization',
    question: 'Can you incorporate Vastu guidelines into the furnishing layout?',
    answer:
      'Yes. Vastu compliance is a standard part of our design process. From the placement of the pooja room to the orientation of beds and the position of kitchen appliances, we integrate Vastu principles thoughtfully without compromising on aesthetics or functionality.',
  },
] as const
