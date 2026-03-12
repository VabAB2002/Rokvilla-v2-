import Image from 'next/image'

export function VastuBuildScene() {
  return (
    <Image
      src="/images/furnish/feature-vastu.png"
      alt="House floor plan with Vastu compass overlay showing directional alignment"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 200px"
      className="h-auto w-full"
    />
  )
}
