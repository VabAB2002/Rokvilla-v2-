import Image from 'next/image'

export function VastuScene() {
  return (
    <Image
      src="/images/furnish/feature-vastu.png"
      alt="Floor plan layout with Vastu compass overlay showing directional alignment for rooms"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 200px"
      className="h-auto w-full"
    />
  )
}
