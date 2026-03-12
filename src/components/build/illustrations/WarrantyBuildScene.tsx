import Image from 'next/image'

export function WarrantyBuildScene() {
  return (
    <Image
      src="/images/build/feature-warranty.png"
      alt="10-year warranty certificate with a gold badge beside a sturdy concrete and steel structure"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 200px"
      className="h-auto w-full"
    />
  )
}
