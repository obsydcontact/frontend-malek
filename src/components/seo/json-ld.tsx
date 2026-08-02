/** Renders a JSON-LD <script> tag. See docs/10-seo-strategy.md § Schema.org. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
