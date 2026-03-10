import Image from 'next/image'

export function ConnectScene() {
  return (
    <Image
      src="/images/design-step-connect.png"
      alt="Consultation table with floor plan notebook, coffee, and material swatches"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
