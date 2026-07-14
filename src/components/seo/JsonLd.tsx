interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

function getSchemaId(schema: Record<string, unknown>, index: number): string {
  const type = schema["@type"];
  if (typeof type === "string") {
    return `json-ld-${type.toLowerCase()}`;
  }
  return `json-ld-${index}`;
}

function serializeJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

/**
 * Server-only JSON-LD injection for static export.
 * Scripts are baked into HTML at build time and must not be
 * re-rendered via client-side navigation (see LanguageSwitcher).
 */
export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={getSchemaId(schema, index)}
          id={getSchemaId(schema, index)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
    </>
  );
}
