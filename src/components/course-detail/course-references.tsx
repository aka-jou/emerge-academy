import { FileTextIcon } from "../icons"

export function CourseReferences({ references }: { references?: string[] }) {
  if (!references || references.length === 0) return null

  return (
    <div className="mt-8 rounded-xl border border-border bg-muted-surface/50 p-5">
      <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
        <FileTextIcon className="h-4 w-4 text-primary" />
        Referencias y fuentes normativas
      </h3>
      <ol className="mt-3 flex flex-col gap-1.5 pl-5 text-sm leading-relaxed text-muted">
        {references.map((ref) => (
          <li key={ref} className="list-decimal">
            {ref}
          </li>
        ))}
      </ol>
    </div>
  )
}
