import { Link } from "react-router-dom"
import { AdminHeader } from "../components/admin/admin-header"
import { UsersIcon, GraduationCapIcon, ChevronRightIcon, VideoIcon } from "../components/icons"
import { useCoursesOverview } from "../lib/admin"

export function AdminDashboardPage() {
  const { overview, loading, error } = useCoursesOverview()

  const coursesWithStudents = overview.filter((c) => c.enrolledCount > 0)
  const totalEnrollments = overview.reduce((sum, c) => sum + c.enrolledCount, 0)

  return (
    <div className="flex min-h-full flex-col bg-background">
      <AdminHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Panel de administrador</h1>
        <p className="mt-1 text-sm text-muted">
          Resumen de cursos activos, alumnos inscritos y acceso a la programación de sesiones.
        </p>

        {error && (
          <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive">
            {error}
          </p>
        )}

        {/* Tarjetas de resumen */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-muted">
              <GraduationCapIcon className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Cursos con alumnos</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">{loading ? "…" : coursesWithStudents.length}</p>
            <p className="mt-1 text-xs text-muted">de {overview.length} cursos en el catálogo</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-muted">
              <UsersIcon className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Inscripciones totales</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">{loading ? "…" : totalEnrollments}</p>
            <p className="mt-1 text-xs text-muted">suma de alumnos por curso (un alumno puede contar en varios)</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-muted">
              <VideoIcon className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Sesiones en vivo</span>
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">Programa una clase</p>
            <Link
              to="/admin/sesiones"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
            >
              Ir a Sesiones
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Tabla de cursos */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-sm font-bold text-foreground">Cursos y alumnos inscritos</h2>
          </div>

          {loading && <p className="px-5 py-6 text-sm text-muted">Cargando…</p>}

          {!loading && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted-surface text-left">
                    <th className="px-5 py-3 font-semibold text-foreground">Curso</th>
                    <th className="px-5 py-3 text-right font-semibold text-foreground">Precio</th>
                    <th className="px-5 py-3 text-right font-semibold text-foreground">Alumnos inscritos</th>
                    <th className="px-5 py-3 text-right font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {overview
                    .slice()
                    .sort((a, b) => b.enrolledCount - a.enrolledCount)
                    .map((course) => (
                      <tr key={course.courseId} className="border-b border-border last:border-0 transition hover:bg-muted-surface/60">
                        <td className="px-5 py-3 font-medium text-foreground">{course.title}</td>
                        <td className="px-5 py-3 text-right text-muted">
                          {course.priceMxn.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-foreground">{course.enrolledCount}</td>
                        <td className="px-5 py-3 text-right">
                          <Link
                            to={`/admin/cursos/${course.courseId}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
                          >
                            Ver alumnos
                            <ChevronRightIcon className="h-3.5 w-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
