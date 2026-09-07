import { Link } from "react-router-dom"
import { PlusIcon, ClockIcon, LayoutDashboardIcon } from "../icons"
import { useUpcomingSessions } from "../../lib/admin"

export function AdminGlanceCard() {
  const { sessions, loading, courseTitle } = useUpcomingSessions()

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Próximas sesiones que impartirás</h2>
          <p className="mt-1 text-sm text-muted">
            Esto es lo que verían tus alumnos en su calendario. Programa una nueva desde aquí.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/admin/sesiones"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            <PlusIcon className="h-4 w-4" />
            Agendar sesión
          </Link>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
          >
            <LayoutDashboardIcon className="h-4 w-4" />
            Panel completo
          </Link>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-5">
        {loading && <p className="text-sm text-muted">Cargando sesiones…</p>}

        {!loading && sessions.length === 0 && (
          <p className="rounded-lg bg-muted-surface px-3 py-6 text-center text-sm text-muted">
            No tienes sesiones programadas próximamente.
          </p>
        )}

        {!loading && sessions.length > 0 && (
          <ul className="flex flex-col gap-3">
            {sessions.map((s) => (
              <li
                key={s.id}
                className="flex flex-col gap-2 rounded-xl border border-border p-3.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                    <ClockIcon className="h-3.5 w-3.5 text-primary" />
                    {new Date(s.scheduledAt).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" })}
                    {" · "}
                    {courseTitle(s.courseId)}
                  </p>
                </div>
                <a
                  href={s.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted-surface"
                >
                  Unirse
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
