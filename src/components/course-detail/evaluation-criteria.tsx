import type { EvaluationCriterion } from "../../data/courses"
import { FileTextIcon } from "../icons"

export function EvaluationCriteria({
  criteria,
  note,
}: {
  criteria?: EvaluationCriterion[]
  note?: string
}) {
  if (!criteria || criteria.length === 0) return null

  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
        <FileTextIcon className="h-4 w-4 text-primary" />
        Criterios de evaluación
      </h3>
      <ul className="mt-4 flex flex-col gap-3">
        {criteria.map((item) => (
          <li key={item.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">{item.label}</span>
              <span className="font-semibold text-foreground">{item.percentage}%</span>
            </div>
            <div
              className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted-surface"
              role="progressbar"
              aria-valuenow={item.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={item.label}
            >
              <div className="h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
            </div>
          </li>
        ))}
      </ul>
      {note && <p className="mt-3 text-xs text-muted">{note}</p>}
    </div>
  )
}
