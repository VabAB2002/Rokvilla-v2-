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

      {/* Back link */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 md:px-12 md:pt-32 xl:px-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.12em] text-bone/60 transition-colors duration-300 hover:text-bone"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex h-full items-end pb-20 md:pb-24">
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
              className="mt-4 font-display text-[clamp(2.5rem,6vw,6rem)] font-light leading-[0.95] text-bone"
            >
              {project.name}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 font-body text-sm tracking-wide text-bone/50"
            >
              {project.year}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
