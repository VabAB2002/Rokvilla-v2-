import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScrollFilmMobile } from '@/components/sections/scroll-film/ScrollFilmMobile'
import React from 'react'

// Mock next/image to a plain <img> to avoid Next.js server-side image processing
vi.mock('next/image', () => ({
  default: ({ src, alt, fill: _fill, sizes: _sizes, className, ...rest }: Record<string, unknown>) =>
    React.createElement('img', { src: src as string, alt: alt as string, className: className as string, ...rest }),
}))

// Mock next/link to a plain <a>
vi.mock('next/link', () => ({
  default: ({ href, children, className, ...rest }: Record<string, unknown>) =>
    React.createElement('a', { href: href as string, className: className as string, ...rest }, children as React.ReactNode),
}))

// Mock framer-motion/m to render plain HTML elements via React.createElement
// Using a factory that returns an object (not a Proxy) to avoid async issues.
vi.mock('framer-motion/m', () => {
  function makeComponent(tag: string) {
    return function MockMotionEl({
      children,
      initial: _initial,
      animate: _animate,
      whileInView: _whileInView,
      viewport: _viewport,
      transition: _transition,
      ...props
    }: Record<string, unknown>) {
      return React.createElement(tag, props as React.HTMLAttributes<HTMLElement>, children as React.ReactNode)
    }
  }
  return {
    article: makeComponent('article'),
    div: makeComponent('div'),
    section: makeComponent('section'),
    span: makeComponent('span'),
    h2: makeComponent('h2'),
    h3: makeComponent('h3'),
    p: makeComponent('p'),
  }
})

vi.mock('@/hooks/useReducedMotion', () => ({ useReducedMotion: () => false }))

describe('ScrollFilmMobile', () => {
  it('renders all 3 chapter cards with correct titles', () => {
    render(<ScrollFilmMobile />)
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Build')).toBeInTheDocument()
    expect(screen.getByText('Furnish')).toBeInTheDocument()
  })

  it('renders chapter taglines', () => {
    render(<ScrollFilmMobile />)
    expect(screen.getByText(/Where vision takes form/)).toBeInTheDocument()
    expect(screen.getByText(/Crafted to last/)).toBeInTheDocument()
    expect(screen.getByText(/Details that define/)).toBeInTheDocument()
  })

  it('renders chapter images', () => {
    render(<ScrollFilmMobile />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBe(3)
  })

  it('renders service links', () => {
    render(<ScrollFilmMobile />)
    const links = screen.getAllByRole('link')
    expect(links.some(l => l.getAttribute('href') === '/design')).toBe(true)
    expect(links.some(l => l.getAttribute('href') === '/build')).toBe(true)
    expect(links.some(l => l.getAttribute('href') === '/furnish')).toBe(true)
  })
})
