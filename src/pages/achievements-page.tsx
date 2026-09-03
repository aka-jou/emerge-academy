import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard/dashboard-header"
import { AchievementBanner } from "../components/achievements/achievement-banner"
import { CertificatePreview } from "../components/achievements/certificate-preview"
import { CertificateActions } from "../components/achievements/certificate-actions"
import { ChevronRightIcon, CertificateIcon } from "../components/icons"
import { api } from "../lib/api"

export function AchievementsPage() {
  // El progreso y las certificaciones aún no se calculan en el backend (no hay seguimiento
  // real de avance por lección), así que por ahora solo mostramos el certificado de ejemplo
  // cuando el usuario ya tiene al menos un curso inscrito de verdad; una cuenta nueva sin
  // compras ve un estado vacío en vez de una certificación que no ha ganado.
  const [hasEnrolledCourses, setHasEnrolledCourses] = useState<boolean | null>(null)

  useEffect(() => {
    api
      .get<unknown[]>("/orders/me/courses")
      .then((courses) => setHasEnrolledCourses(courses.length > 0))
      .catch(() => setHasEnrolledCourses(false))
  }, [])

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

        {hasEnrolledCourses === false && (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <CertificateIcon className="h-10 w-10 text-muted" />
            <h1 className="text-lg font-bold text-foreground">Aún no tienes certificados</h1>
            <p className="max-w-md text-sm text-muted">
              Cuando completes un curso, tu certificado y credencial verificable aparecerán aquí.
            </p>
            <Link
              to="/cursos"
              className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Explorar cursos
            </Link>
          </div>
        )}

        {hasEnrolledCourses === true && (
          <>
            {/* Bloque superior: celebración */}
            <div className="mt-4">
              <AchievementBanner />
            </div>

            {/* Bloque inferior: visualizador y validación */}
            <section className="mt-8" aria-label="Certificado y acciones">
              <div className="grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <CertificatePreview />
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
