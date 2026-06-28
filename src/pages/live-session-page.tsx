import { Link } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard/dashboard-header"
import { CountdownTimer } from "../components/live-session/countdown-timer"
import { SessionTabs } from "../components/live-session/session-tabs"
import { SessionSidebar } from "../components/live-session/session-sidebar"
import { ChevronRightIcon, VideoIcon, CalendarIcon, ClockIcon } from "../components/icons"
import { liveSession } from "../data/dashboard"

export function LiveSessionPage() {
  const session = liveSession

  return (
    <div className="flex min-h-full flex-col bg-background">
      <DashboardHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-sm">
          <Link to="/cursos" className="font-medium text-muted transition hover:text-primary">
            Cursos
          </Link>
          <ChevronRightIcon className="h-4 w-4 text-muted" />
          <Link to="/dashboard" className="font-medium text-muted transition hover:text-primary">
            Curso de Seguridad en alturas
          </Link>
          <ChevronRightIcon className="h-4 w-4 text-muted" />
          <span className="font-semibold text-foreground">Sesión en vivo</span>
        </nav>

        <div className="mt-6 grid gap-6 lg:grid-cols-10">
          {/* Columna principal (70%) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h1 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {session.title}
              </h1>

              {/* Etiquetas de metadatos */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted-surface/60 px-3 py-1.5 text-xs font-medium text-foreground">
                  <ClockIcon className="h-3.5 w-3.5 text-muted" />
                  {session.schedule}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted-surface/60 px-3 py-1.5 text-xs font-medium">
                  Instructor:&nbsp;<span className="font-semibold text-blue-600">{session.instructor}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted-surface/60 px-3 py-1.5 text-xs font-medium text-foreground">
                  <CalendarIcon className="h-3.5 w-3.5 text-muted" />
                  {session.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  {session.status}
                </span>
              </div>

              {/* Temporizador */}
              <div className="mt-8 rounded-2xl border border-border bg-muted-surface/40 px-4 py-8">
                <CountdownTimer startsInMs={session.startsInMs} />
              </div>

              {/* Botones de acción */}
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={session.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover sm:w-auto"
                >
                  <VideoIcon className="h-5 w-5" />
                  Entrar a la clase
                </a>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted-surface sm:w-auto"
                >
                  <CalendarIcon className="h-5 w-5 text-muted" />
                  Añadir a mi calendario
                </button>
              </div>

              {/* Pestañas */}
              <div className="mt-8">
                <SessionTabs session={session} />
              </div>
            </div>
          </div>

          {/* Sidebar (30%) */}
          <div className="lg:col-span-3">
            <SessionSidebar session={session} />
          </div>
        </div>
      </main>
    </div>
  )
}
