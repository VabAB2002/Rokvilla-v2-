import { LOCATIONS } from '@/lib/constants/locations'
import { SOCIAL_LINKS, PHONE_DISPLAY, EMAIL } from '@/lib/constants/contact'
import { SITE_URL } from './constants'

interface SchemaBase {
  readonly '@context': 'https://schema.org'
  readonly '@type': string
  readonly [key: string]: unknown
}

export function buildOrganizationSchema(): SchemaBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RokVilla',
    url: SITE_URL,
    logo: `${SITE_URL}/logo/rok-logo-black.png`,
    description:
      'Premium architecture, construction & interior design in Hubli, Dharwad & Ballari, Karnataka.',
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hubballi',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  }
}

export function buildLocalBusinessSchema(
  location: (typeof LOCATIONS)[number],
): SchemaBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `RokVilla — ${location.city}`,
    url: SITE_URL,
    telephone: location.phone,
    email: location.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: 'Karnataka',
      postalCode: location.address.match(/\d{6}/)?.[0] ?? '',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.lat,
      longitude: location.lng,
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  }
}

export function buildServiceSchema(
  title: string,
  description: string,
  url: string,
): SchemaBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'RokVilla',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'State',
      name: 'Karnataka',
      addressCountry: 'IN',
    },
  }
}

interface BreadcrumbItem {
  readonly name: string
  readonly url: string
}

export function buildBreadcrumbSchema(
  items: ReadonlyArray<BreadcrumbItem>,
): SchemaBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
