import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ProjectBentoGallery } from '@/components/projects/ProjectBentoGallery'

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const imgProps = { ...props }
    delete imgProps.fill
    delete imgProps.sizes
    delete imgProps.placeholder
    delete imgProps.blurDataURL

    return React.createElement(
      'img',
      imgProps as React.ImgHTMLAttributes<HTMLImageElement>,
    )
  },
}))

vi.mock('framer-motion/m', () => {
  function makeComponent(tag: string) {
    return function MockMotionElement(props: Record<string, unknown>) {
      const elementProps = { ...props }
      delete elementProps.whileHover
      delete elementProps.whileTap
      delete elementProps.initial
      delete elementProps.animate
      delete elementProps.exit
      delete elementProps.transition
      delete elementProps.viewport

      const { children, ...domProps } = elementProps as {
        children?: React.ReactNode
      }

      return React.createElement(
        tag,
        domProps as React.HTMLAttributes<HTMLElement>,
        children,
      )
    }
  }

  return {
    button: makeComponent('button'),
    div: makeComponent('div'),
  }
})

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}))

vi.mock('@/components/ui/AnimatedSection', () => ({
  AnimatedSection: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => React.createElement('div', { className }, children),
}))

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}))

describe('ProjectBentoGallery', () => {
  it('renders gallery images beyond the first five on the page', () => {
    render(
      <ProjectBentoGallery
        images={[
          '/gallery-1.jpg',
          '/gallery-2.jpg',
          '/gallery-3.jpg',
          '/gallery-4.jpg',
          '/gallery-5.jpg',
          '/gallery-6.jpg',
        ]}
        projectName="Test Project"
      />,
    )

    expect(
      screen.getAllByAltText('Test Project — project view 6').length,
    ).toBeGreaterThan(0)
  })
})
