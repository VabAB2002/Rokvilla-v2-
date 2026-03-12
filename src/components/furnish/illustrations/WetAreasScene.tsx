import Image from 'next/image'

export function WetAreasScene() {
  return (
    <Image
      src="/images/furnish/material-wet-areas.png"
      alt="Cross-section of a kitchen cabinet showing BWP plywood layers resisting water splashes near a sink"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
