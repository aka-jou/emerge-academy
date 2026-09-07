import { Link } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard/dashboard-header"
import { WelcomeBanner } from "../components/dashboard/welcome-banner"
import { EnrolledCourseCard } from "../components/dashboard/enrolled-course-card"
import { UpcomingMilestones } from "../components/dashboard/upcoming-milestones"
import { RecentDownloads } from "../components/dashboard/recent-downloads"
import { AdminGlanceCard } from "../components/dashboard/admin-glance-card"
import { useMyCourses } from "../lib/orders"
import { useAllProgress } from "../lib/progress"
import { useAuth } from "../lib/auth"

export function DashboardPage() {
  const { user } = useAuth()
  const { courses, loading, error } = useMyCourses()
  const { progress, loading: loadingProgress } = useAllProgress()

  return (
    <div className="flex min-h-full flex-col bg-background">
      <DashboardHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <WelcomeBanner enrolledCourses={courses} progress={progress} loading={loading || loadingProgress} />

        {/* Cuentas de administrador ven aquí un vistazo rápido de sus sesiones en vez del
            contenido de "alumno" (que estaría vacío, ya que un admin normalmente no compra
            cursos para sí mismo). El panel completo de gestión vive en /admin. */}
        {user?.role === "admin" && (
          <div className="mt-8">
            <AdminGlanceCard />
          </div>
        )}

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Cursos activos</h2>

          {loading && <p className="mt-4 text-sm text-muted">Cargando tus cursos…</p>}
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          {!loading && !error && courses.length === 0 && (
            <div className="mt-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <p className="text-sm font-medium text-foreground">Aún no tienes cursos inscritos.</p>
              <Link
                to="/cursos"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Explorar catálogo
              </Link>
            </div>
          )}

          {!loading && courses.length > 0 && (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <EnrolledCourseCard key={course.id} course={course} progress={progress} />
              ))}
            </div>
          )}
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <UpcomingMilestones />
          </div>
          <div className="lg:col-span-2">
            <RecentDownloads />
          </div>
        </div>
      </main>
    </div>
  )
}
