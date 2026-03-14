import { test, expect } from '@playwright/test'

const goto = { waitUntil: 'domcontentloaded' as const }

test.describe('Smoke Tests', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/', goto)
    await expect(page).toHaveTitle(/RokVilla/)
    await expect(page.locator('#main-content')).toBeAttached()
  })

  test('skip-to-content link exists', async ({ page }) => {
    await page.goto('/', goto)
    await expect(page.locator('a[href="#main-content"]')).toBeAttached()
  })

  test('design page loads', async ({ page }) => {
    await page.goto('/design', goto)
    await expect(page.locator('h1, h2, h3').first()).toBeVisible()
  })

  test('build page loads', async ({ page }) => {
    await page.goto('/build', goto)
    await expect(page.locator('h1, h2, h3').first()).toBeVisible()
  })

  test('furnish page loads', async ({ page }) => {
    await page.goto('/furnish', goto)
    await expect(page.locator('h1, h2, h3').first()).toBeVisible()
  })

  test('projects page loads', async ({ page }) => {
    await page.goto('/projects', goto)
    await expect(page.locator('main, [role="main"], #main-content').first()).toBeAttached()
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('JSON-LD present on home', async ({ page }) => {
    await page.goto('/', goto)
    await expect(page.locator('script[type="application/ld+json"]')).toBeAttached()
  })

  test('security headers present on home', async ({ request }) => {
    const response = await request.get('/')
    expect(response.headers()['x-content-type-options']).toBe('nosniff')
    expect(response.headers()['x-frame-options']).toBe('DENY')
  })
})
