import Image from 'next/image'

export function PackageScene() {
  return (
    <Image
      src="/images/build/build-step-package.png"
      alt="Construction package blueprints spread on a desk with bookmarks"
      width={480}
      height={480}
      className="h-auto w-full"
      sizes="(max-width: 768px) 240px, 240px"
    />
  )
}
