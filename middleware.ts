import { NextRequest, NextResponse } from 'next/server'

function buildCspHeader(nonce: string): string {
  const directives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline' https://api.mapbox.com`,
    `img-src 'self' data: blob: https://api.mapbox.com https://*.mapbox.com`,
    `font-src 'self'`,
    `worker-src 'self' blob:`,
    `connect-src 'self' https://*.mapbox.com https://events.mapbox.com https://*.sentry.io https://o*.ingest.sentry.io https://vitals.vercel-insights.com https://*.vercel-insights.com`,
    `media-src 'self'`,
    `frame-src 'none'`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `manifest-src 'self'`,
    `upgrade-insecure-requests`,
  ]

  return directives.join('; ')
}

export function middleware(request: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const csp = buildCspHeader(nonce)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.headers.set('Content-Security-Policy', csp)

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
