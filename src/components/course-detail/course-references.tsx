export function CourseReferences({ references }: { references?: string[] }) {
  if (!references || references.length === 0) return null

  return (
    <section aria-labelledby="referencias-title" className="border-t border-border pt-8">
      <h2 id="referencias-title" className="text-sm font-semibold text-foreground">
        Referencias y fuentes normativas
      </h2>
      <ol className="mt-4 grid gap-x-8 gap-y-2 text-sm leading-relaxed text-muted sm:grid-cols-2">
        {references.map((ref, i) => (
          <li key={ref} className="flex gap-3">
            <span className="font-display font-semibold tabular-nums text-foreground/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{ref}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
