import Image from 'next/image'

export function DailyUpdatesScene() {
  return (
    <Image
      src="/images/furnish/feature-daily-updates.png"
      alt="Smartphone showing daily site progress photos and update notifications"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
