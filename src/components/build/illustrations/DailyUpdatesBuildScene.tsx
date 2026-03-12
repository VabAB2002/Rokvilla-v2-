import Image from 'next/image'

export function DailyUpdatesBuildScene() {
  return (
    <Image
      src="/images/build/feature-daily-updates.png"
      alt="Smartphone showing daily construction site progress photos and update notifications"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
