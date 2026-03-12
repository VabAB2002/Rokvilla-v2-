import Image from 'next/image'

export function InhouseTeamBuildScene() {
  return (
    <Image
      src="/images/furnish/feature-inhouse-team.png"
      alt="In-house architects, designers, and project coordinators collaborating over construction blueprints"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 200px"
      className="h-auto w-full"
    />
  )
}
