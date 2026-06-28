import type { JSX } from "react"
import { Link } from "react-router-dom"
import { VideoIcon, FileTextIcon, HardHatIcon } from "../icons"
import { milestones, type Milestone } from "../../data/dashboard"

const kindConfig: Record<
  Milestone["kind"],
  { Icon: (props: { className?: string }) => JSX.Element; tint: string }
> = {
  live: { Icon: VideoIcon, tint: "bg-red-100 text-red-600" },
  evaluation: { Icon: FileTextIcon, tint: "bg-muted-surface text-primary" },
  task: { Icon: HardHatIcon, tint: "bg-muted-surface text-primary" },
}

function actionButton(action: Milestone["action"]) {
  switch (action) {
    case "join":
      return (
        <Link
          to="/dashboard/sesion-en-vivo/bst"
          className="rounded-lg bg-red-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Unirse
        </Link>
      )
    case "start":
      return (
        <button
          type="button"
          className="rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
        >
          Iniciar
        </button>
      )
    default:
      return (
        <button
          type="button"
          className="rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-semibold text-muted transition hover:bg-muted-surface hover:text-foreground"
        >
          Ver detalles
        </button>
      )
  }
}

export function UpcomingMilestones() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-foreground">Próximos hitos</h2>

      <ul className="mt-4 flex flex-col gap-3">
        {milestones.map((m) => {
          const { Icon, tint } = kindConfig[m.kind]
          return (
            <li
              key={m.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-muted-surface/40 p-3"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{m.title}</p>
                <p className="mt-0.5 text-xs text-muted">{m.schedule}</p>
              </div>
              {actionButton(m.action)}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
