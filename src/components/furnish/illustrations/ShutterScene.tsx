import Image from 'next/image'

export function ShutterScene() {
  return (
    <Image
      src="/images/furnish/material-shutter.png"
      alt="Close-up of HDHMR cabinet shutters with a clean matte finish, one door slightly ajar showing the dense board edge"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 180px"
      className="h-auto w-full"
    />
  )
}
