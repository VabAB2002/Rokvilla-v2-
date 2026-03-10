import Image from 'next/image'

export function BrowseScene() {
  return (
    <Image
      src="/images/design-step-browse.png"
      alt="Open architecture portfolio showing floor plans and villa elevations"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
