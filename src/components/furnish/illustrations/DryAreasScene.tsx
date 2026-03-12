import Image from 'next/image'

export function DryAreasScene() {
  return (
    <Image
      src="/images/furnish/material-dry-areas.png"
      alt="Stylish wardrobe with open doors revealing MR plywood shelves and a TV unit with smooth MDF panels"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 320px"
      className="h-auto w-full"
    />
  )
}
