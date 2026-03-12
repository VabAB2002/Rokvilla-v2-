import Image from 'next/image'

export function ConnectBuildScene() {
  return (
    <Image
      src="/images/build/build-step-connect.png"
      alt="Clipboard with form, coffee cup, and phone on a table"
      width={480}
      height={480}
      className="h-auto w-full"
      sizes="(max-width: 768px) 240px, 240px"
    />
  )
}
