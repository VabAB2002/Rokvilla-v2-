export interface ScrollFilmChapter {
  readonly id: string
  readonly overline: string
  readonly title: string
  readonly tagline: string
  readonly image: string
  readonly imageAlt: string
  readonly href: string
}

export const SCROLL_FILM_CHAPTERS: ReadonlyArray<ScrollFilmChapter> = [
  {
    id: 'design',
    overline: '01 — Design',
    title: 'Design',
    tagline:
      'Where vision takes form. Architectural blueprints that balance aesthetics, function, and Karnataka\'s unique context.',
    image: '/images/home/service-design.jpg',
    imageAlt: 'RokVilla architectural design showcase',
    href: '/design',
  },
  {
    id: 'build',
    overline: '02 — Build',
    title: 'Build',
    tagline:
      'Crafted to last. Premium construction with transparent timelines, quality materials, and meticulous execution.',
    image: '/images/home/service-build.jpg',
    imageAlt: 'RokVilla construction project in progress',
    href: '/build',
  },
  {
    id: 'furnish',
    overline: '03 — Furnish',
    title: 'Furnish',
    tagline:
      'Details that define. Complete interior solutions — from modular kitchens to custom furniture, every space tells a story.',
    image: '/images/home/service-furnish.jpg',
    imageAlt: 'RokVilla interior design and furnishing',
    href: '/furnish',
  },
] as const
