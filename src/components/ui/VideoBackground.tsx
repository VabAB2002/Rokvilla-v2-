'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface VideoBackgroundProps {
  readonly videoSrc?: string
  readonly imageSrc: string
  readonly imageAlt: string
}

export function VideoBackground({
  videoSrc,
  imageSrc,
  imageAlt,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause()
    }
  }, [prefersReducedMotion])

  const showVideo = videoSrc && !prefersReducedMotion

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fallback image (always rendered, serves as poster/LCP) */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className={`object-cover transition-opacity duration-700 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        sizes="100vw"
      />

      {/* Video (loads after hydration) */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,13,11,0.3) 0%, rgba(15,13,11,0.55) 50%, rgba(15,13,11,0.75) 100%)',
        }}
      />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
    </div>
  )
}
