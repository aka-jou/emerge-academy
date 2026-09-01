import { Link } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard/dashboard-header"
import { WelcomeBanner } from "../components/dashboard/welcome-banner"
import { EnrolledCourseCard } from "../components/dashboard/enrolled-course-card"
import { UpcomingMilestones } from "../components/dashboard/upcoming-milestones"
import { RecentDownloads } from "../components/dashboard/recent-downloads"
import { useMyCourses } from "../lib/orders"

export function DashboardPage() {
  const { courses, loading, error } = useMyCourses()

  return (
    <div className="flex min-h-full flex-col bg-background">
      <DashboardHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <WelcomeBanner />

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
                <EnrolledCourseCard key={course.id} course={course} />
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
