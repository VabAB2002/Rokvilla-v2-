import Image from 'next/image'

interface VideoBackgroundProps {
  readonly imageSrc: string
  readonly imageAlt: string
}

export function VideoBackground({
  imageSrc,
  imageAlt,
}: VideoBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        fetchPriority="high"
        quality={85}
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay — darker at bottom for mobile bottom-anchored text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,13,11,0.3) 0%, rgba(15,13,11,0.55) 50%, rgba(15,13,11,0.82) 100%)',
        }}
      />

    </div>
  )
}
