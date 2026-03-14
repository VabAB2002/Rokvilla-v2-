import { describe, it, expect } from 'vitest'
import {
  buildOrganizationSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  buildBreadcrumbSchema,
} from '@/lib/seo/schemas'
import { LOCATIONS } from '@/lib/constants/locations'

describe('buildOrganizationSchema', () => {
  it('returns correct @context and @type', () => {
    const schema = buildOrganizationSchema()
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Organization')
  })

  it('returns correct name and url', () => {
    const schema = buildOrganizationSchema()
    expect(schema.name).toBe('RokVilla')
    expect(schema.url).toBe('https://rokvilla.com')
  })

  it('returns correct logo path', () => {
    const schema = buildOrganizationSchema()
    expect(schema.logo).toBe('https://rokvilla.com/logo/rok-logo-black.png')
  })

  it('returns correct telephone and email', () => {
    const schema = buildOrganizationSchema()
    expect(schema.telephone).toBe('+91 78992 32229')
    expect(schema.email).toBe('home@rokvilla.com')
  })

  it('returns correct address structure', () => {
    const schema = buildOrganizationSchema()
    expect(schema.address).toEqual({
      '@type': 'PostalAddress',
      addressLocality: 'Hubballi',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    })
  })

  it('returns sameAs array with 3 social links', () => {
    const schema = buildOrganizationSchema()
    const sameAs = schema.sameAs as string[]
    expect(sameAs).toHaveLength(3)
    expect(sameAs).toContain('https://instagram.com/rokvilla')
    expect(sameAs).toContain('https://facebook.com/rokvilla')
    expect(sameAs).toContain('https://linkedin.com/company/rokvilla')
  })
})

describe('buildLocalBusinessSchema', () => {
  const hubli = LOCATIONS[0]

  it('returns correct @context and @type', () => {
    const schema = buildLocalBusinessSchema(hubli)
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('LocalBusiness')
  })

  it('includes city in name', () => {
    const schema = buildLocalBusinessSchema(hubli)
    expect(schema.name).toBe('RokVilla — Hubballi')
  })

  it('extracts 6-digit postal code from address string', () => {
    const schema = buildLocalBusinessSchema(hubli)
    const address = schema.address as Record<string, unknown>
    expect(address.postalCode).toBe('580031')
  })

  it('extracts correct postal code for Dharwad', () => {
    const dharwad = LOCATIONS[1]
    const schema = buildLocalBusinessSchema(dharwad)
    const address = schema.address as Record<string, unknown>
    expect(address.postalCode).toBe('580003')
  })

  it('extracts correct postal code for Ballari', () => {
    const ballari = LOCATIONS[2]
    const schema = buildLocalBusinessSchema(ballari)
    const address = schema.address as Record<string, unknown>
    expect(address.postalCode).toBe('583103')
  })

  it('returns correct geo coordinates', () => {
    const schema = buildLocalBusinessSchema(hubli)
    expect(schema.geo).toEqual({
      '@type': 'GeoCoordinates',
      latitude: 15.3647,
      longitude: 75.124,
    })
  })

  it('returns correct address structure', () => {
    const schema = buildLocalBusinessSchema(hubli)
    expect(schema.address).toEqual({
      '@type': 'PostalAddress',
      streetAddress: hubli.address,
      addressLocality: 'Hubballi',
      addressRegion: 'Karnataka',
      postalCode: '580031',
      addressCountry: 'IN',
    })
  })

  it('includes telephone and email from location', () => {
    const schema = buildLocalBusinessSchema(hubli)
    expect(schema.telephone).toBe(hubli.phone)
    expect(schema.email).toBe(hubli.email)
  })

  it('returns sameAs array with 3 social links', () => {
    const schema = buildLocalBusinessSchema(hubli)
    const sameAs = schema.sameAs as string[]
    expect(sameAs).toHaveLength(3)
  })
})

describe('buildServiceSchema', () => {
  const title = 'Architecture Design'
  const description = 'Premium architecture services in Karnataka.'
  const url = 'https://rokvilla.com/services/architecture'

  it('returns correct @context and @type', () => {
    const schema = buildServiceSchema(title, description, url)
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Service')
  })

  it('name matches title param', () => {
    const schema = buildServiceSchema(title, description, url)
    expect(schema.name).toBe(title)
  })

  it('description matches description param', () => {
    const schema = buildServiceSchema(title, description, url)
    expect(schema.description).toBe(description)
  })

  it('url matches url param', () => {
    const schema = buildServiceSchema(title, description, url)
    expect(schema.url).toBe(url)
  })

  it('returns correct nested provider structure', () => {
    const schema = buildServiceSchema(title, description, url)
    expect(schema.provider).toEqual({
      '@type': 'Organization',
      name: 'RokVilla',
      url: 'https://rokvilla.com',
    })
  })

  it('returns correct areaServed structure', () => {
    const schema = buildServiceSchema(title, description, url)
    expect(schema.areaServed).toEqual({
      '@type': 'State',
      name: 'Karnataka',
      addressCountry: 'IN',
    })
  })
})

describe('buildBreadcrumbSchema', () => {
  it('returns correct @context and @type', () => {
    const schema = buildBreadcrumbSchema([{ name: 'Home', url: 'https://rokvilla.com' }])
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('BreadcrumbList')
  })

  it('positions are 1-indexed', () => {
    const items = [
      { name: 'Home', url: 'https://rokvilla.com' },
      { name: 'Services', url: 'https://rokvilla.com/services' },
    ]
    const schema = buildBreadcrumbSchema(items)
    const elements = schema.itemListElement as Array<Record<string, unknown>>
    expect(elements[0].position).toBe(1)
    expect(elements[1].position).toBe(2)
  })

  it('produces correct itemListElement array for multiple items', () => {
    const items = [
      { name: 'Home', url: 'https://rokvilla.com' },
      { name: 'Services', url: 'https://rokvilla.com/services' },
      { name: 'Architecture', url: 'https://rokvilla.com/services/architecture' },
    ]
    const schema = buildBreadcrumbSchema(items)
    const elements = schema.itemListElement as Array<Record<string, unknown>>

    expect(elements).toHaveLength(3)
    expect(elements[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://rokvilla.com',
    })
    expect(elements[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://rokvilla.com/services',
    })
    expect(elements[2]).toEqual({
      '@type': 'ListItem',
      position: 3,
      name: 'Architecture',
      item: 'https://rokvilla.com/services/architecture',
    })
  })

  it('handles a single item', () => {
    const schema = buildBreadcrumbSchema([{ name: 'Home', url: 'https://rokvilla.com' }])
    const elements = schema.itemListElement as Array<Record<string, unknown>>
    expect(elements).toHaveLength(1)
    expect(elements[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://rokvilla.com',
    })
  })

  it('handles an empty array', () => {
    const schema = buildBreadcrumbSchema([])
    const elements = schema.itemListElement as Array<Record<string, unknown>>
    expect(elements).toHaveLength(0)
  })
})
