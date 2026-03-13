interface ProjectsEmptyStateProps {
  readonly onReset: () => void
}

export function ProjectsEmptyState({ onReset }: ProjectsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-2xl font-light text-obsidian/60">
        No projects match your filters
      </p>
      <p className="mt-3 max-w-sm font-body text-sm text-stone">
        Try adjusting your search or filter criteria to discover more of our
        work.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-full border-[1.5px] border-terracotta/30 bg-terracotta/[0.07] backdrop-blur-sm px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-terracotta transition-all duration-200 hover:border-terracotta/50 hover:bg-terracotta/[0.12]"
      >
        Clear All Filters
      </button>
    </div>
  )
}
