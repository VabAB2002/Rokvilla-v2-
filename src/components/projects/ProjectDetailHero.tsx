'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
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

  return (
    <section className="relative h-dvh min-h-[640px] overflow-hidden">
      {/* Background media */}
      {project.heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={project.heroImage}
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

      {/* Hero content — full height flex, content anchored to bottom */}
      <div className="relative z-10 flex h-full items-end pb-16 md:pb-20 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 xl:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.span
              variants={itemVariants}
              className="font-accent text-[12px] uppercase tracking-[0.18em] text-bone/60"
            >
              {capitalize(project.category)} &middot;{' '}
              {capitalize(project.location)}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.95] text-bone"
            >
              {project.name}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center gap-6"
            >
              <span className="font-body text-sm tracking-wide text-bone/50">
                {project.year}
              </span>
              <span className="h-px w-6 bg-bone/20" aria-hidden="true" />
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.1em] text-bone/40 transition-colors duration-300 hover:text-bone"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
