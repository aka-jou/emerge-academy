import type { EvaluationCriterion } from "../../data/courses"
import { SectionHeading } from "./section-heading"

const shades = ["bg-ink", "bg-primary", "bg-(--area)", "bg-primary/30"]

export function EvaluationCriteria({
  criteria,
  note,
}: {
  criteria?: EvaluationCriterion[]
  note?: string
}) {
  if (!criteria || criteria.length === 0) return null
  const weighted = criteria.filter((c) => c.percentage > 0)

  return (
    <section aria-labelledby="evaluacion-title">
      <SectionHeading id="evaluacion-title">Cómo se evalúa</SectionHeading>

      <div aria-hidden="true" className="mt-6 flex h-4 gap-1 overflow-hidden rounded-full">
        {weighted.map((item) => (
          <span
            key={item.label}
            style={{ flexGrow: item.percentage }}
            className={`basis-0 ${shades[criteria.indexOf(item) % shades.length]}`}
          />
        ))}
      </div>

      <ul className="mt-6 flex flex-col divide-y divide-border border-y border-border">
        {criteria.map((item, i) => (
          <li key={item.label} className="flex items-center gap-4 py-4">
            <span
              aria-hidden="true"
              className={`h-3 w-3 shrink-0 rounded-[3px] ${item.percentage > 0 ? shades[i % shades.length] : "ring-1 ring-border"}`}
            />
            <span className="flex-1 text-sm leading-snug text-foreground">{item.label}</span>
            <span className="font-display text-3xl font-semibold tabular-nums leading-none text-foreground">
              {item.percentage}%
            </span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-4 text-sm leading-relaxed text-muted">{note}</p>}
    </section>
  )
}
