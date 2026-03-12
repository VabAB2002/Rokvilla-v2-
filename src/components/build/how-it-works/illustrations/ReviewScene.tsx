import Image from 'next/image'

export function ReviewScene() {
  return (
    <Image
      src="/images/build/build-step-review.png"
      alt="Magnifying glass examining a comparison chart of house specifications"
      width={480}
      height={480}
      className="h-auto w-full"
      sizes="(max-width: 768px) 240px, 320px"
    />
  )
}
