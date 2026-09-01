import { ArrowRightIcon } from "../icons"
import { student } from "../../data/dashboard"
import { useAuth } from "../../lib/auth"

export function WelcomeBanner() {
  const { user } = useAuth()
  const { globalProgress, completedModules, totalModules } = student
  const name = user?.name?.split(" ")[0] ?? student.name

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
            ¡Hola de nuevo, {name}!
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            Sigue avanzando, estás muy cerca de completar tu certificación. Retoma justo donde lo dejaste.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-5xl font-extrabold leading-none text-primary sm:text-6xl">{globalProgress}%</p>
          <p className="mt-1 text-sm font-medium text-muted">Progreso global</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            {completedModules} de {totalModules} módulos completados
          </span>
          <span className="text-sm font-semibold text-primary">{globalProgress}%</span>
        </div>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted-surface"
          role="progressbar"
          aria-valuenow={globalProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso global del estudiante"
        >
          <div className="h-full rounded-full bg-primary" style={{ width: `${globalProgress}%` }} />
        </div>
      </div>

      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
      >
        Continuar curso actual
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
