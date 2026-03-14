'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'
import * as Sentry from '@sentry/nextjs'

interface Props {
  readonly children: ReactNode
  readonly fallback?: ReactNode
  readonly name?: string
}

interface State {
  readonly hasError: boolean
}

export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    Sentry.withScope((scope) => {
      if (this.props.name) scope.setTag('section', this.props.name)
      scope.setExtra('componentStack', info.componentStack)
      Sentry.captureException(error)
    })
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="font-body text-sm text-stone">This section is temporarily unavailable.</p>
        </div>
      )
    }
    return this.props.children
  }
}
