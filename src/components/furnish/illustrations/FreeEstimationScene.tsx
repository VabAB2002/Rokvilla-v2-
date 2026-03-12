import Image from 'next/image'

export function FreeEstimationScene() {
  return (
    <Image
      src="/images/furnish/feature-free-estimation.png"
      alt="Detailed cost estimate document with itemised material pricing and a calculator"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 200px"
      className="h-auto w-full"
    />
  )
}
