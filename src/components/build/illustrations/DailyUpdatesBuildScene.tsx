import Image from 'next/image'

export function DailyUpdatesBuildScene() {
  return (
    <Image
      src="/images/furnish/feature-daily-updates.png"
      alt="Smartphone showing daily construction site progress photos and update notifications"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 200px"
      className="h-auto w-full"
    />
  )
}
