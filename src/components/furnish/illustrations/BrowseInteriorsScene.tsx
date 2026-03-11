import Image from 'next/image'

export function BrowseInteriorsScene() {
  return (
    <Image
      src="/images/furnish/furnish-step-browse.png"
      alt="Open lookbook of furnished interiors with fabric swatches and paint chips spread on a table"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
