interface SkeletonProps {
  readonly className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-limestone/30 ${className}`}
      aria-hidden="true"
    />
  )
}

export function FormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16" aria-hidden="true">
      <Skeleton className="mx-auto h-8 w-48" />
      <Skeleton className="mx-auto mt-3 h-4 w-72" />
      <div className="mt-10 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12 rounded-xl" />
          <Skeleton className="h-12 rounded-xl" />
        </div>
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  )
}

export function MapSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16" aria-hidden="true">
      <Skeleton className="mx-auto h-8 w-40" />
      <Skeleton className="mx-auto mt-3 h-4 w-64" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  )
}
