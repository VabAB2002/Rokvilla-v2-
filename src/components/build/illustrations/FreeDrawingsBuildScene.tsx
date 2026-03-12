import Image from 'next/image'

export function FreeDrawingsBuildScene() {
  return (
    <Image
      src="/images/build/feature-free-drawings.png"
      alt="Architectural design drawings and blueprints spread on a desk with a signed construction contract"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
