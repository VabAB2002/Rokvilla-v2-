import Image from 'next/image'

export function WarrantyScene() {
  return (
    <Image
      src="/images/furnish/feature-warranty.png"
      alt="Warranty certificate with a 10-year badge beside polished wooden cabinetry"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 200px"
      className="h-auto w-full"
    />
  )
}
