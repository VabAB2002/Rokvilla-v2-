'use client'

import { Search, ChevronDown } from 'lucide-react'
import type { ProjectCategory } from '@/types/questionnaire'

type FilterCategory = 'all' | ProjectCategory
type FilterLocation = 'all' | 'hubli' | 'dharwad' | 'ballari' | 'bengaluru' | 'vijayapur'
type SortOrder = 'year-desc' | 'alpha'

interface ProjectsFilterBarProps {
  readonly search: string
  readonly category: FilterCategory
  readonly location: FilterLocation
  readonly sortOrder: SortOrder
  readonly matchCount: number
  readonly onSearchChange: (value: string) => void
  readonly onCategoryChange: (value: FilterCategory) => void
  readonly onLocationChange: (value: FilterLocation) => void
  readonly onSortChange: (value: SortOrder) => void
}

const CATEGORY_OPTIONS: ReadonlyArray<{
  readonly value: FilterCategory
  readonly label: string
}> = [
  { value: 'all', label: 'All Types' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Interior' },
  { value: 'industry', label: 'Industry' },
  { value: 'public', label: 'Public' },
]

const LOCATION_OPTIONS: ReadonlyArray<{
  readonly value: FilterLocation
  readonly label: string
}> = [
  { value: 'all', label: 'All Locations' },
  { value: 'hubli', label: 'Hubli' },
  { value: 'dharwad', label: 'Dharwad' },
  { value: 'ballari', label: 'Ballari' },
  { value: 'bengaluru', label: 'Bengaluru' },
  { value: 'vijayapur', label: 'Vijayapur' },
]

export function ProjectsFilterBar({
  search,
  category,
  location,
  sortOrder,
  matchCount,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
  onSortChange,
}: ProjectsFilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Top row: search + dropdowns */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            className="min-h-[44px] w-full rounded-xl border border-limestone bg-white py-3 pl-11 pr-4 font-body text-sm text-obsidian placeholder:text-stone/60 transition-colors duration-200 focus:border-terracotta focus:outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 min-w-0">
            <select
              value={category}
              onChange={(e) =>
                onCategoryChange(e.target.value as FilterCategory)
              }
              className="min-h-[44px] w-full flex-1 min-w-0 appearance-none rounded-xl border border-limestone bg-white py-3 pl-4 pr-10 font-body text-base md:text-[13px] uppercase tracking-[0.08em] text-slate transition-colors duration-200 focus:border-terracotta focus:outline-none"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
              aria-hidden="true"
            />
          </div>

          <div className="relative flex-1 min-w-0">
            <select
              value={location}
              onChange={(e) =>
                onLocationChange(e.target.value as FilterLocation)
              }
              className="min-h-[44px] w-full flex-1 min-w-0 appearance-none rounded-xl border border-limestone bg-white py-3 pl-4 pr-10 font-body text-base md:text-[13px] uppercase tracking-[0.08em] text-slate transition-colors duration-200 focus:border-terracotta focus:outline-none"
            >
              {LOCATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Bottom row: match count + sort */}
      <div className="flex items-center justify-between">
        <span className="font-body text-sm tabular-nums text-stone">
          {matchCount} {matchCount === 1 ? 'Project' : 'Projects'}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-pressed={sortOrder === 'year-desc'}
            onClick={() => onSortChange('year-desc')}
            className={`min-h-[44px] rounded-full px-4 font-body text-[12px] uppercase tracking-[0.08em] transition-all duration-200 ${
              sortOrder === 'year-desc'
                ? 'border-2 border-terracotta/40 bg-terracotta/[0.15] backdrop-blur-sm text-terracotta font-semibold shadow-sm'
                : 'border border-terracotta/20 bg-terracotta/[0.06] backdrop-blur-sm text-slate font-normal hover:border-terracotta/[0.35] hover:bg-terracotta/10 hover:text-obsidian'
            }`}
          >
            Date
          </button>
          <button
            type="button"
            aria-pressed={sortOrder === 'alpha'}
            onClick={() => onSortChange('alpha')}
            className={`min-h-[44px] rounded-full px-4 font-body text-[12px] uppercase tracking-[0.08em] transition-all duration-200 ${
              sortOrder === 'alpha'
                ? 'border-2 border-terracotta/40 bg-terracotta/[0.15] backdrop-blur-sm text-terracotta font-semibold shadow-sm'
                : 'border border-terracotta/20 bg-terracotta/[0.06] backdrop-blur-sm text-slate font-normal hover:border-terracotta/[0.35] hover:bg-terracotta/10 hover:text-obsidian'
            }`}
          >
            A–Z
          </button>
        </div>
      </div>
    </div>
  )
}

export type { FilterCategory, FilterLocation, SortOrder }
