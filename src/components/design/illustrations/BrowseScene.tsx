import Image from 'next/image'

export function BrowseScene() {
  return (
    <Image
      src="/images/design/design-step-browse.png"
      alt="Open architecture portfolio showing floor plans and villa elevations"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 320px"
      className="h-auto w-full"
    />
  )
}
