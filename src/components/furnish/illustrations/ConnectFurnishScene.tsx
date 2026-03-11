import Image from 'next/image'

export function ConnectFurnishScene() {
  return (
    <Image
      src="/images/furnish/furnish-step-connect.png"
      alt="Consultation desk with a furnishing plan booklet, coffee cup, and material sample box"
      width={480}
      height={480}
      className="h-auto w-full"
    />
  )
}
