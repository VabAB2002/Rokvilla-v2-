import Image from 'next/image'

export function VastuBuildScene() {
  return (
    <Image
      src="/images/build/feature-vastu.png"
      alt="House floor plan with Vastu compass overlay showing directional alignment"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
