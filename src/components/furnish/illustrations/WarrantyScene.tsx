import Image from 'next/image'

export function WarrantyScene() {
  return (
    <Image
      src="/images/furnish/feature-warranty.png"
      alt="Warranty certificate with a 10-year badge beside polished wooden cabinetry"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
