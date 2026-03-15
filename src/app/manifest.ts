import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RokVilla — Architecture & Construction',
    short_name: 'RokVilla',
    description:
      'Premium architecture, construction & interior design in Hubballi, Dharwad & Ballari',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F0D0B',
    theme_color: '#0F0D0B',
    icons: [
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
