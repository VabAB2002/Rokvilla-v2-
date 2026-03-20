import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ScrollFilmDesktop } from '@/components/sections/scroll-film/ScrollFilmDesktop'

// Mock next/image to a plain <img>
vi.mock('next/image', () => ({
  default: ({ src, alt, fill: _fill, sizes: _sizes, className, priority: _priority, ...rest }: Record<string, unknown>) =>
    React.createElement('img', { src: src as string, alt: alt as string, className: className as string, ...rest }),
}))

// Mock next/link to a plain <a>
vi.mock('next/link', () => ({
  default: ({ href, children, className, ...rest }: Record<string, unknown>) =>
    React.createElement('a', { href: href as string, className: className as string, ...rest }, children as React.ReactNode),
}))

// Mock GSAP — we're testing DOM output, not animation behavior
vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    matchMedia: () => ({
      add: vi.fn(),
      revert: vi.fn(),
    }),
    timeline: () => ({
      fromTo: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      addLabel: vi.fn().mockReturnThis(),
    }),
    set: vi.fn(),
  },
  ScrollTrigger: {
    update: vi.fn(),
    refresh: vi.fn(),
  },
  SplitText: vi.fn().mockImplementation(() => ({
    chars: [],
    words: [],
    revert: vi.fn(),
  })),
}))

// NOTE: This mock runs the callback synchronously during render. Refs will be
// null at that point, so GSAP code inside `useGSAP` will early-return. This is
// fine — we're testing DOM output, not animation behavior.
vi.mock('@gsap/react', () => ({
  useGSAP: (cb: () => void) => { cb() },
}))

describe('ScrollFilmDesktop', () => {
  it('renders all 3 chapter slides', () => {
    render(<ScrollFilmDesktop />)
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Build')).toBeInTheDocument()
    expect(screen.getByText('Furnish')).toBeInTheDocument()
  })

  it('renders chapter overlines', () => {
    render(<ScrollFilmDesktop />)
    expect(screen.getByText('01 — Design')).toBeInTheDocument()
    expect(screen.getByText('02 — Build')).toBeInTheDocument()
    expect(screen.getByText('03 — Furnish')).toBeInTheDocument()
  })

  it('renders 3 chapter images', () => {
    const { container } = render(<ScrollFilmDesktop />)
    const images = container.querySelectorAll('img')
    expect(images.length).toBe(3)
  })

  it('has hidden class for mobile breakpoint', () => {
    const { container } = render(<ScrollFilmDesktop />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain('hidden')
    expect(wrapper?.className).toContain('md:block')
  })
})
