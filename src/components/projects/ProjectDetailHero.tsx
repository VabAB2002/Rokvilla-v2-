'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as m from 'framer-motion/m'
import { ArrowLeft, Pause, Play } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  makeHeroContainerVariants,
  makeHeroItemVariants,
} from '@/lib/motion'
import type { Project } from '@/types/project'

interface ProjectDetailHeroProps {
  readonly project: Project
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const toggleVideo = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  return (
    <section className="relative h-dvh min-h-[640px] overflow-hidden">
      {/* Background media */}
      {project.heroVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={project.heroImage}
          aria-label="Architectural project showcase video"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={project.heroVideo} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,13,11,0.3) 0%, rgba(15,13,11,0.5) 50%, rgba(15,13,11,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Video pause/play control (WCAG 2.2.2) */}
      {project.heroVideo && (
        <button
          type="button"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          onClick={toggleVideo}
          className="absolute bottom-20 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-bone/10 text-bone/70 backdrop-blur-sm transition-colors duration-200 hover:bg-bone/20 hover:text-bone"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      )}

      {/* Hero content — full height flex, content anchored to bottom */}
      <div className="relative z-10 flex h-full items-end pb-16 md:pb-20 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 xl:px-16">
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <m.span
              variants={itemVariants}
              className="font-accent text-[12px] uppercase tracking-[0.18em] text-bone/60"
            >
              {capitalize(project.category)} &middot;{' '}
              {capitalize(project.location)}
            </m.span>

            <m.h1
              variants={itemVariants}
              className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.95] text-bone"
            >
              {project.name}
            </m.h1>

            <m.div
              variants={itemVariants}
              className="mt-6 flex items-center gap-6"
            >
              <span className="font-body text-sm tracking-wide text-bone/50">
                {project.year}
              </span>
              <span className="h-px w-6 bg-bone/20" aria-hidden="true" />
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.1em] text-bone/60 transition-colors duration-300 hover:text-bone"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All Projects
              </Link>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
