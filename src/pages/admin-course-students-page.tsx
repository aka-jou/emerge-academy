import { Link, useParams } from "react-router-dom"
import { AdminHeader } from "../components/admin/admin-header"
import { ChevronRightIcon, CheckIcon } from "../components/icons"
import { courses } from "../data/courses"
import { useCourseStudents } from "../lib/admin"

export function AdminCourseStudentsPage() {
  const { id } = useParams<{ id: string }>()
  const courseId = id ?? null
  const course = courses.find((c) => c.id === courseId)
  const { students, totalModules, certifiedCount, loading, error } = useCourseStudents(courseId)

  return (
    <div className="flex min-h-full flex-col bg-background">
      <AdminHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-sm text-muted">
          <Link to="/admin" className="transition hover:text-foreground">
            Panel de administrador
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="font-medium text-foreground">{course?.title ?? courseId}</span>
        </nav>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{course?.title ?? courseId}</h1>
        <p className="mt-1 text-sm text-muted">
          {totalModules > 0
            ? `Un alumno se considera certificado al completar los ${totalModules} módulos del curso.`
            : "Este curso todavía no tiene módulos definidos en el catálogo, así que no se puede calcular certificación."}
        </p>

        {error && (
          <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Alumnos inscritos</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{loading ? "…" : students.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Alumnos certificados</p>
            <p className="mt-2 text-3xl font-bold text-primary">{loading ? "…" : certifiedCount}</p>
          </div>
        </div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {loading && <p className="px-5 py-6 text-sm text-muted">Cargando alumnos…</p>}

          {!loading && students.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-muted">Nadie ha comprado este curso todavía.</p>
          )}

          {!loading && students.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted-surface text-left">
                    <th className="px-5 py-3 font-semibold text-foreground">Alumno</th>
                    <th className="px-5 py-3 font-semibold text-foreground">Empresa</th>
                    <th className="px-5 py-3 text-right font-semibold text-foreground">Progreso</th>
                    <th className="px-5 py-3 text-right font-semibold text-foreground">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const isCertified = totalModules > 0 && s.completedModulesCount >= totalModules
                    return (
                      <tr key={s.userId} className="border-b border-border last:border-0">
                        <td className="px-5 py-3">
                          <p className="font-medium text-foreground">{s.name}</p>
                          <p className="text-xs text-muted">{s.email}</p>
                        </td>
                        <td className="px-5 py-3 text-muted">{s.company ?? "—"}</td>
                        <td className="px-5 py-3 text-right text-muted">
                          {totalModules > 0 ? `${s.completedModulesCount} / ${totalModules} módulos` : "—"}
                        </td>
                        <td className="px-5 py-3 text-right">
                          {isCertified ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                              <CheckIcon className="h-3.5 w-3.5" />
                              Certificado
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-muted-surface px-2.5 py-1 text-xs font-medium text-muted">
                              En progreso
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
