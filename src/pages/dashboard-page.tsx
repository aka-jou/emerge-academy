import { DashboardHeader } from "../components/dashboard/dashboard-header"
import { WelcomeBanner } from "../components/dashboard/welcome-banner"
import { DashboardCourseCard } from "../components/dashboard/dashboard-course-card"
import { UpcomingMilestones } from "../components/dashboard/upcoming-milestones"
import { RecentDownloads } from "../components/dashboard/recent-downloads"
import { activeCourses } from "../data/dashboard"

export function DashboardPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <DashboardHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <WelcomeBanner />

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Cursos activos</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeCourses.map((course) => (
              <DashboardCourseCard key={course.id} course={course} />
            ))}
          </div>
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
