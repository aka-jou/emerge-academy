import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import {
  ArrowRightIcon,
  CheckIcon,
  MenuIcon,
  ClockIcon,
} from "../components/icons"
import { courses, courseDetails } from "../data/courses"
import { useMyCourses } from "../lib/orders"
import { useCourseProgress } from "../lib/progress"

export function CoursePlayerPage() {
  const { id } = useParams<{ id: string }>()
  const courseId = id ?? ""
  const course = courses.find((c) => c.id === courseId)
  const detail = courseDetails[courseId]

  const { courses: enrolledCourses, loading: loadingEnrollment } = useMyCourses()
  const { completedModules, loading: loadingProgress, error, setModuleCompleted } = useCourseProgress(courseId)

  const [activeModule, setActiveModule] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const isEnrolled = enrolledCourses.some((c) => c.id === courseId)
  const modules = detail?.modules ?? []
  const totalModules = modules.length
  const percent = totalModules > 0 ? Math.round((completedModules.length / totalModules) * 100) : 0

  // Al cargar el progreso, arranca en el primer módulo no completado (o el primero si ya
  // terminó todo).
  useEffect(() => {
    if (loadingProgress || totalModules === 0) return
    const firstIncomplete = modules.find((m) => !completedModules.includes(m.number))
    setActiveModule(firstIncomplete?.number ?? modules[0].number)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProgress, totalModules])

  const currentModule = modules.find((m) => m.number === activeModule) ?? modules[0]
  const currentIndex = modules.findIndex((m) => m.number === activeModule)
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null
  const nextModule = currentIndex >= 0 && currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null
  const isCurrentCompleted = currentModule ? completedModules.includes(currentModule.number) : false

  async function toggleCompleted() {
    if (!currentModule) return
    setSaving(true)
    await setModuleCompleted(currentModule.number, !isCurrentCompleted)
    setSaving(false)
  }

  async function completeAndContinue() {
    if (!currentModule) return
    setSaving(true)
    if (!isCurrentCompleted) await setModuleCompleted(currentModule.number, true)
    setSaving(false)
    if (nextModule) setActiveModule(nextModule.number)
  }

  // No existe el curso o no tiene módulos definidos.
  if (!course || !detail || totalModules === 0) {
    return <Navigate to="/dashboard" replace />
  }

  // Todavía no sabemos si está inscrito (cargando useMyCourses): esperar antes de decidir.
  if (loadingEnrollment) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <span className="text-sm font-medium text-muted">Cargando…</span>
      </div>
    )
  }

  // El usuario no compró este curso: lo mandamos a la página de venta, no a las lecciones.
  if (!isEnrolled) {
    return <Navigate to={`/cursos/${courseId}`} replace />
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Barra lateral izquierda */}
        <aside className="hidden w-80 shrink-0 border-r border-border lg:block">
          <ModuleSidebar
            title={course.title}
            percent={percent}
            modules={modules}
            completedModules={completedModules}
            activeModuleNumber={activeModule}
            onSelectModule={(n) => {
              setActiveModule(n)
              setSidebarOpen(false)
            }}
          />
        </aside>

        {/* Barra lateral móvil (overlay) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Cerrar contenido"
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-black/40"
            />
            <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] border-r border-border shadow-xl">
              <ModuleSidebar
                title={course.title}
                percent={percent}
                modules={modules}
                completedModules={completedModules}
                activeModuleNumber={activeModule}
                onSelectModule={(n) => {
                  setActiveModule(n)
                  setSidebarOpen(false)
                }}
              />
            </div>
          </div>
        )}

        {/* Área principal derecha */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground"
            >
              <MenuIcon className="h-4 w-4" />
              Contenido
            </button>
            <span className="truncate text-sm font-semibold text-foreground">{course.title}</span>
          </div>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
            <div className="mx-auto max-w-3xl">
              {currentModule && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                    <span>Módulo {currentModule.number}</span>
                    <span className="text-muted">·</span>
                    <span className="flex items-center gap-1 text-muted">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {currentModule.hours} h · {currentModule.lessons} lecciones
                    </span>
                  </div>
                  <h1 className="mt-2 text-xl font-bold tracking-tight text-foreground text-pretty sm:text-2xl">
                    {currentModule.title}
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Revisa el contenido de este módulo con tu instructor y el material de apoyo del curso. Cuando
                    hayas cubierto los temas y practicado lo necesario, márcalo como completado para avanzar tu
                    progreso real de certificación.
                  </p>

                  {error && (
                    <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive">
                      {error}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={toggleCompleted}
                    disabled={saving}
                    className={
                      isCurrentCompleted
                        ? "mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition disabled:cursor-not-allowed disabled:opacity-60"
                        : "mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface disabled:cursor-not-allowed disabled:opacity-60"
                    }
                  >
                    <CheckIcon className="h-4 w-4" />
                    {isCurrentCompleted ? "Módulo completado" : "Marcar módulo como completado"}
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* Barra de navegación inferior fija */}
          <footer className="shrink-0 border-t border-border bg-card px-4 py-3 sm:px-8">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
              <button
                type="button"
                disabled={!prevModule}
                onClick={() => prevModule && setActiveModule(prevModule.number)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRightIcon className="h-4 w-4 rotate-180" />
                <span className="hidden sm:inline">Módulo anterior</span>
                <span className="sm:hidden">Anterior</span>
              </button>

              {nextModule ? (
                <button
                  type="button"
                  disabled={saving}
                  onClick={completeAndContinue}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Marcar como completado y continuar</span>
                  <span className="sm:hidden">Completar</span>
                </button>
              ) : (
                <Link
                  to="/dashboard/logros"
                  onClick={() => {
                    if (!isCurrentCompleted) setModuleCompleted(currentModule!.number, true)
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
                >
                  <CheckIcon className="h-4 w-4" />
                  {percent === 100 ? "Ver certificado" : "Finalizar y ver mi progreso"}
                </Link>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

type ModuleSidebarProps = {
  title: string
  percent: number
  modules: { number: number; title: string; lessons: number; hours: number }[]
  completedModules: number[]
  activeModuleNumber: number
  onSelectModule: (moduleNumber: number) => void
}

function ModuleSidebar({
  title,
  percent,
  modules,
  completedModules,
  activeModuleNumber,
  onSelectModule,
}: ModuleSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="shrink-0 border-b border-border p-5">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition hover:text-foreground"
        >
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
          Volver al Dashboard
        </Link>
        <h1 className="mt-3 text-sm font-bold leading-snug text-foreground text-pretty">{title}</h1>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-muted">Progreso del curso</span>
            <span className="text-primary">{percent}%</span>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-muted-surface"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso del curso"
          >
            <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <nav aria-label="Contenido del curso" className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-0.5">
          {modules.map((m) => {
            const isActive = m.number === activeModuleNumber
            const isCompleted = completedModules.includes(m.number)
            return (
              <li key={m.number}>
                <button
                  type="button"
                  onClick={() => onSelectModule(m.number)}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive
                      ? "flex w-full items-start gap-2.5 rounded-lg bg-green-50 px-3 py-2.5 text-left text-sm font-medium text-foreground"
                      : "flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted transition hover:bg-muted-surface hover:text-foreground"
                  }
                >
                  <span className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                        <CheckIcon className="h-3 w-3 text-white" />
                      </span>
                    ) : (
                      <span className="block h-4 w-4 rounded-full border-2 border-border" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block leading-snug text-pretty">{m.title}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {m.hours} h · {m.lessons} lecciones
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
