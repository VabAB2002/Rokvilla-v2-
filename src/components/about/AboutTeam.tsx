'use client'

import { useRef, useState } from 'react'
import * as m from 'framer-motion/m'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { TEAM_MEMBERS, type TeamMember } from '@/lib/constants/about'

/* ── Direction detection (Aceternity pattern) ── */

type Direction = 'top' | 'right' | 'bottom' | 'left'

function getDirection(ev: React.MouseEvent, ref: React.RefObject<HTMLElement | null>): Direction {
  if (!ref.current) return 'bottom'
  const { left, top, width: w, height: h } = ref.current.getBoundingClientRect()
  const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1)
  const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1)
  const d = Math.round(Math.atan2(y, x) / 1.5707963 + 5) % 4
  return (['top', 'right', 'bottom', 'left'] as const)[d]
}

function getSlidePosition(dir: Direction): { x: string | number; y: string | number } {
  switch (dir) {
    case 'top':    return { y: '-100%', x: 0 }
    case 'bottom': return { y: '100%',  x: 0 }
    case 'left':   return { x: '-100%', y: 0 }
    case 'right':  return { x: '100%',  y: 0 }
  }
}

/* ── DirectionAwareCard ── */

interface DirectionAwareCardProps {
  readonly member: TeamMember
  readonly reducedMotion: boolean
}

function DirectionAwareCard({ member, reducedMotion }: DirectionAwareCardProps) {
  const cardRef = useRef<HTMLElement | null>(null)
  const [direction, setDirection] = useState<Direction>('bottom')
  const [isHovered, setIsHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const initials = member.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

  function handleMouseEnter(ev: React.MouseEvent<HTMLElement>) {
    setDirection(getDirection(ev, cardRef))
    setIsHovered(true)
  }

  function handleMouseLeave(ev: React.MouseEvent<HTMLElement>) {
    setDirection(getDirection(ev, cardRef))
    setIsHovered(false)
  }

  const slidePos = getSlidePosition(direction)

  const overlayInitial = reducedMotion ? { opacity: 0, x: 0, y: 0 } : { ...slidePos, opacity: 1 }
  const overlayExit    = reducedMotion ? { opacity: 0, x: 0, y: 0 } : { ...slidePos, opacity: 1 }
  const overlayAnimate = { x: 0, y: 0, opacity: 1 }

  return (
    <article
      ref={cardRef}
      className="relative aspect-[3/4] overflow-hidden rounded-sm group cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Portrait image */}
      {imgError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-limestone/20">
          <span className="font-display text-6xl font-light text-stone-400/40">
            {initials}
          </span>
        </div>
      ) : (
        <Image
          src={member.photoSrc}
          alt={member.photoAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => setImgError(true)}
        />
      )}

      {/* Direction-aware overlay (desktop hover) */}
      <AnimatePresence>
        {isHovered && (
          <m.div
            key="overlay"
            initial={overlayInitial}
            animate={overlayAnimate}
            exit={overlayExit}
            transition={{ duration: reducedMotion ? 0.15 : 0.3, ease: EASE_OUT_EXPO }}
            className="absolute inset-0 bg-void/70 backdrop-blur-[2px] flex flex-col justify-end p-6 md:p-8"
          >
            <m.h3
              initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.05, duration: reducedMotion ? 0.1 : 0.3, ease: EASE_OUT_EXPO }}
              className="font-display text-2xl md:text-3xl font-medium text-bone"
            >
              {member.name}
            </m.h3>
            <m.p
              initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.1, duration: reducedMotion ? 0.1 : 0.3, ease: EASE_OUT_EXPO }}
              className="font-accent text-[11px] uppercase tracking-[0.16em] text-brass-light mt-1"
            >
              {member.title}
            </m.p>
            <m.p
              initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.15, duration: reducedMotion ? 0.1 : 0.3, ease: EASE_OUT_EXPO }}
              className="font-body text-sm text-bone/80 mt-3 leading-relaxed"
            >
              {member.bio}
            </m.p>
          </m.div>
        )}
      </AnimatePresence>
    </article>
  )
}

/* ── Mobile card (static layout below image) ── */

function MobileCard({ member }: { readonly member: TeamMember }) {
  const [imgError, setImgError] = useState(false)

  const initials = member.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-limestone/20">
            <span className="font-display text-6xl font-light text-stone-400/40">
              {initials}
            </span>
          </div>
        ) : (
          <Image
            src={member.photoSrc}
            alt={member.photoAlt}
            fill
            className="object-cover object-top"
            sizes="100vw"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="pt-4">
        <h3 className="font-display text-2xl font-medium text-obsidian">{member.name}</h3>
        <p className="font-accent text-[11px] uppercase tracking-[0.16em] text-terracotta mt-1">
          {member.title}
        </p>
        <p className="font-body text-sm text-slate mt-3 leading-relaxed">{member.bio}</p>
      </div>
    </div>
  )
}

/* ── AboutTeam (main export) ── */

export function AboutTeam() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="bg-white py-12 md:py-32 lg:py-36" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

        {/* Header */}
        <AnimatedSection className="text-center">
          <p className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
            The Team
          </p>
          <h2
            id="team-heading"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-obsidian mt-3"
          >
            The People Behind Every Space
          </h2>
        </AnimatedSection>

        {/* Desktop grid — direction-aware hover cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8 mt-16 mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <DirectionAwareCard key={member.id} member={member} reducedMotion={reducedMotion} />
          ))}
        </div>

        {/* Mobile grid — static image + text below */}
        <div className="grid md:hidden grid-cols-1 gap-10 mt-12">
          {TEAM_MEMBERS.map((member) => (
            <MobileCard key={member.id} member={member} />
          ))}
        </div>

      </div>
    </section>
  )
}
