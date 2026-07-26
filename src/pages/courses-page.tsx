import { CoursesHeader } from "../components/courses/courses-header"
import { CourseFilters } from "../components/courses/course-filters"
import { CourseCard } from "../components/courses/course-card"
import { EnterpriseBanner } from "../components/courses/enterprise-banner"
import { courses } from "../data/courses"

export function CoursesPage() {
  return (
    <div className="flex min-h-full flex-col bg-card">
      <CoursesHeader />

      <section className="border-b border-border bg-muted-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            Cursos de capacitación
            <br />
            para iniciar o recertificar
          </h1>
          <p className="mt-3 text-sm text-muted">
            Formación práctica con instructores certificados y certificación oficial
          </p>
        </div>
      </section>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <CourseFilters />
        </div>

        <div className="border-t border-border bg-muted-surface">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-muted">Página 1 de 1</p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <EnterpriseBanner />
        </div>
      </main>
    </div>
  )
}
