import { BriefcaseIcon, AwardIcon } from "../icons"

export function CourseObjective({ objective, instructor }: { objective?: string; instructor?: string }) {
  if (!objective && !instructor) return null

  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
      {instructor && (
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <BriefcaseIcon className="h-4 w-4 text-primary" />
          Instructor: <span className="font-normal text-muted">{instructor}</span>
        </p>
      )}
      {objective && (
        <div className={instructor ? "mt-4 border-t border-border pt-4" : undefined}>
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <AwardIcon className="h-4 w-4 text-primary" />
            Objetivo general
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{objective}</p>
        </div>
      )}
    </div>
  )
}
