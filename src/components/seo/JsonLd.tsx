interface JsonLdProps {
  readonly schema:
    | Record<string, unknown>
    | ReadonlyArray<Record<string, unknown>>
  readonly nonce?: string
}

export function JsonLd({ schema, nonce }: JsonLdProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s).replace(/<\/script>/gi, '<\\/script>'),
          }}
        />
      ))}
    </>
  )
}
