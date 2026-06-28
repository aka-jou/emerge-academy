import type { JSX } from "react"
import { Link } from "react-router-dom"
import { ClockIcon, VideoIcon, PlayIcon, FileTextIcon, HelpCircleIcon } from "../icons"
import type { ActiveCourse, ContentType } from "../../data/dashboard"

const contentIcon: Record<ContentType, (props: { className?: string }) => JSX.Element> = {
  Video: PlayIcon,
  PDF: FileTextIcon,
  Quiz: HelpCircleIcon,
  Meet: VideoIcon,
}

export function DashboardCourseCard({ course }: { course: ActiveCourse }) {
  const { code, title, content, progress, milestoneType, milestoneLabel, live } = course

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">{code}</span>
        {content.map((c) => {
          const Icon = contentIcon[c]
          return (
            <span
              key={c}
              className="inline-flex items-center gap-1 rounded-md bg-muted-surface px-2 py-1 text-xs font-medium text-muted"
            >
              <Icon className="h-3.5 w-3.5" />
              {c}
            </span>
          )
        })}
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground text-pretty">{title}</h3>

      <div className="mt-4">
        <div className="flex items-center gap-3">
          <div
            className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted-surface"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progreso de ${title}`}
          >
            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-semibold text-foreground">{progress}%</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted">
        {milestoneType === "live" ? (
          <VideoIcon className="h-4 w-4 text-primary" />
        ) : (
          <ClockIcon className="h-4 w-4 text-primary" />
        )}
        <span className="font-medium">{milestoneLabel}</span>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {live ? (
          <Link
            to={`/dashboard/sesion-en-vivo/${course.id}`}
            className="inline-flex flex-1 animate-pulse items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm ring-2 ring-red-300 transition hover:bg-red-700"
          >
            Unirse ahora
          </Link>
        ) : (
          <Link
            to={`/dashboard/curso/${course.id}`}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Entrar
          </Link>
        )}
        <Link
          to={`/dashboard/curso/${course.id}`}
          className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
        >
          Ver temario
        </Link>
      </div>
    </article>
  )
}
