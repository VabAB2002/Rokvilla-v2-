import { renderHook, act } from '@testing-library/react'
import { useReducedMotion } from '../useReducedMotion'
import { useIsLowPowerDevice } from '../useIsLowPowerDevice'
import { useInView } from '../useInView'

// ---------------------------------------------------------------------------
// matchMedia mock helpers
// ---------------------------------------------------------------------------

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation(() => ({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })
}

// ---------------------------------------------------------------------------
// useReducedMotion
// ---------------------------------------------------------------------------

describe('useReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false when matchMedia does not match reduced motion', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when matchMedia matches prefers-reduced-motion: reduce', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// useIsLowPowerDevice
// ---------------------------------------------------------------------------

describe('useIsLowPowerDevice', () => {
  function setConnection(value: unknown) {
    Object.defineProperty(navigator, 'connection', {
      writable: true,
      configurable: true,
      value,
    })
  }

  afterEach(() => {
    setConnection(undefined)
  })

  it('returns false when no connection API is present', () => {
    setConnection(undefined)
    const { result } = renderHook(() => useIsLowPowerDevice())
    expect(result.current).toBe(false)
  })

  it('returns true when navigator.connection.saveData is true', () => {
    setConnection({ saveData: true, effectiveType: '4g' })
    const { result } = renderHook(() => useIsLowPowerDevice())
    expect(result.current).toBe(true)
  })

  it('returns true when navigator.connection.effectiveType is 2g', () => {
    setConnection({ saveData: false, effectiveType: '2g' })
    const { result } = renderHook(() => useIsLowPowerDevice())
    expect(result.current).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// IntersectionObserver mock
// ---------------------------------------------------------------------------

type IOCallback = (entries: IntersectionObserverEntry[]) => void

let latestObserver: {
  callback: IOCallback
  observe: ReturnType<typeof vi.fn>
  unobserve: ReturnType<typeof vi.fn>
  disconnect: ReturnType<typeof vi.fn>
} | null = null

function setupIntersectionObserverMock() {
  latestObserver = null

  function MockIntersectionObserver(callback: IOCallback) {
    const instance = {
      callback,
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }
    latestObserver = instance
    return instance
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
}

// ---------------------------------------------------------------------------
// useInView
// ---------------------------------------------------------------------------

// renderHook doesn't attach the ref to a real DOM element, so the hook's
// useEffect exits early (el = ref.current = null → no observer is created).
//
// Strategy: render with `rootMargin: '0px'` initially so an element can be
// attached to the ref, then rerender with `rootMargin: '1px'` to change the
// deps array and force the effect to re-run with the populated ref.

describe('useInView', () => {
  let container: HTMLDivElement
  let el: HTMLDivElement

  beforeEach(() => {
    setupIntersectionObserverMock()
    container = document.createElement('div')
    document.body.appendChild(container)
    el = document.createElement('div')
    container.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(container)
    vi.restoreAllMocks()
  })

  it('starts with inView = false', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current.inView).toBe(false)
  })

  it('sets inView = true when intersection fires with isIntersecting: true', () => {
    const { result, rerender } = renderHook(
      ({ margin }: { margin: string }) => useInView({ rootMargin: margin }),
      { initialProps: { margin: '0px' } },
    )

    // Populate the ref then change a dep to force the effect to re-run
    ;(result.current.ref as React.MutableRefObject<HTMLDivElement>).current = el
    act(() => {
      rerender({ margin: '1px' })
    })

    expect(latestObserver).not.toBeNull()
    expect(latestObserver!.observe).toHaveBeenCalledWith(el)

    act(() => {
      latestObserver!.callback([
        { isIntersecting: true } as IntersectionObserverEntry,
      ])
    })

    expect(result.current.inView).toBe(true)
  })

  it('calls observer.unobserve after intersection when once = true', () => {
    const { result, rerender } = renderHook(
      ({ margin }: { margin: string }) =>
        useInView({ rootMargin: margin, once: true }),
      { initialProps: { margin: '0px' } },
    )

    ;(result.current.ref as React.MutableRefObject<HTMLDivElement>).current = el
    act(() => {
      rerender({ margin: '1px' })
    })

    expect(latestObserver).not.toBeNull()

    act(() => {
      latestObserver!.callback([
        { isIntersecting: true } as IntersectionObserverEntry,
      ])
    })

    expect(result.current.inView).toBe(true)
    expect(latestObserver!.unobserve).toHaveBeenCalledWith(el)
  })
})
