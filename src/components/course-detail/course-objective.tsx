import { SectionHeading } from "./section-heading"

export function CourseObjective({ objective, instructor }: { objective?: string; instructor?: string }) {
  if (!objective && !instructor) return null

  return (
    <section aria-labelledby="objetivo-title">
      <SectionHeading id="objetivo-title">Qué vas a lograr</SectionHeading>
      {objective && (
        <p className="mt-6 border-l-4 border-(--area) pl-5 text-pretty text-lg leading-relaxed text-foreground sm:text-xl">
          {objective}
        </p>
      )}
      {instructor && (
        <p className="mt-5 text-sm text-muted">
          Imparte <span className="font-semibold text-foreground">{instructor}</span>
        </p>
      )}
    </section>
  )
}
