import type { Service } from '@/types/service'

export const SERVICES: ReadonlyArray<Service> = [
  {
    id: 'design',
    title: 'Design',
    description:
      'From concept to blueprint — architectural designs that balance aesthetics and function.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    href: '#services',
    image: '/images/service-design.jpg',
  },
  {
    id: 'build',
    title: 'Build Packages',
    description:
      'Turnkey construction with transparent pricing, from foundation to finishing.',
    icon: 'M3 21h18M3 7v1a3 3 0 006 0V7m0 0V7a3 3 0 016 0v1m0-1V7a3 3 0 016 0v1M6 21V10m6 11V10m6 11V10',
    href: '#services',
    image: '/images/service-build.jpg',
  },
  {
    id: 'furnish',
    title: 'Furnish',
    description:
      'Interior styling that transforms spaces — custom furniture and finishing touches.',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    href: '#services',
    image: '/images/service-furnish.jpg',
  },
] as const
