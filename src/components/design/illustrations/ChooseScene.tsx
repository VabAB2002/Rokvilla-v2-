import Image from 'next/image'

export function ChooseScene() {
  return (
    <Image
      src="/images/design/design-step-choose.png"
      alt="Hand selecting from design service folders — floor plans, interiors, and elevations"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
