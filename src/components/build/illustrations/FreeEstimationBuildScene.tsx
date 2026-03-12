import Image from 'next/image'

export function FreeEstimationBuildScene() {
  return (
    <Image
      src="/images/furnish/feature-free-estimation.png"
      alt="Detailed construction cost estimate document with material pricing breakdown"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 200px"
      className="h-auto w-full"
    />
  )
}
