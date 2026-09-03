import { Link } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard/dashboard-header"
import { AchievementBanner } from "../components/achievements/achievement-banner"
import { CertificatePreview } from "../components/achievements/certificate-preview"
import { CertificateActions } from "../components/achievements/certificate-actions"
import { ChevronRightIcon, CertificateIcon } from "../components/icons"
import { useMyCourses } from "../lib/orders"
import { useAllProgress } from "../lib/progress"
import { useAuth } from "../lib/auth"
import { courseDetails } from "../data/courses"

export function AchievementsPage() {
  const { user } = useAuth()
  const { courses, loading: loadingCourses } = useMyCourses()
  const { progress, loading: loadingProgress } = useAllProgress()
  const loading = loadingCourses || loadingProgress

  // Un curso está "completado" solo cuando el usuario marcó todos sus módulos reales; el
  // certificado de ejemplo solo se muestra para el primer curso que cumpla esa condición.
  const completedCourse = courses.find((course) => {
    const detail = courseDetails[course.id]
    if (!detail || detail.modules.length === 0) return false
    const completedCount = progress.find((p) => p.courseId === course.id)?.completedModules.length ?? 0
    return completedCount >= detail.modules.length
  })

  const hasEnrolledCourses = courses.length > 0

  return (
    <div className="flex min-h-full flex-col bg-background">
      <DashboardHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-sm text-muted">
          <Link to="/dashboard" className="transition hover:text-foreground">
            Dashboard
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="font-medium text-foreground">Logros y Certificaciones</span>
        </nav>

        {!loading && !completedCourse && (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <CertificateIcon className="h-10 w-10 text-muted" />
            <h1 className="text-lg font-bold text-foreground">Aún no tienes certificados</h1>
            <p className="max-w-md text-sm text-muted">
              {hasEnrolledCourses
                ? "Termina todos los módulos de un curso para desbloquear tu certificado."
                : "Cuando completes un curso, tu certificado y credencial verificable aparecerán aquí."}
            </p>
            <Link
              to={hasEnrolledCourses ? "/dashboard" : "/cursos"}
              className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              {hasEnrolledCourses ? "Ir a mis cursos" : "Explorar cursos"}
            </Link>
          </div>
        )}

        {!loading && completedCourse && (
          <>
            {/* Bloque superior: celebración */}
            <div className="mt-4">
              <AchievementBanner courseTitle={completedCourse.title} />
            </div>

            {/* Bloque inferior: visualizador y validación */}
            <section className="mt-8" aria-label="Certificado y acciones">
              <div className="grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <CertificatePreview recipient={user?.name ?? ""} courseTitle={completedCourse.title} />
                </div>
                <div className="lg:col-span-2">
                  <CertificateActions />
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
