import Image from 'next/image'

export function ChooseThemeScene() {
  return (
    <Image
      src="/images/furnish/furnish-step-theme.png"
      alt="Hand pinning a mood board with interior style samples — contemporary, minimalist, and traditional Indian"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 320px"
      className="h-auto w-full"
    />
  )
}
