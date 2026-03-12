import Image from 'next/image'

export function FreeDrawingsScene() {
  return (
    <Image
      src="/images/furnish/feature-free-drawings.png"
      alt="Interior design drawings and 3D renders spread on a desk with a signed contract"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
