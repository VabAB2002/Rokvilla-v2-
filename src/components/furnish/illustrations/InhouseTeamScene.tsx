import Image from 'next/image'

export function InhouseTeamScene() {
  return (
    <Image
      src="/images/furnish/feature-inhouse-team.png"
      alt="In-house team of architects, designers, and coordinators collaborating around a table with blueprints"
      width={480}
      height={480}
      sizes="(max-width: 768px) 240px, 200px"
      className="h-auto w-full"
    />
  )
}
