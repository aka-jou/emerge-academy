import { Link } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard/dashboard-header"
import { AchievementBanner } from "../components/achievements/achievement-banner"
import { CertificatePreview } from "../components/achievements/certificate-preview"
import { CertificateActions } from "../components/achievements/certificate-actions"
import { ChevronRightIcon } from "../components/icons"

export function AchievementsPage() {
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
      </main>
    </div>
  )
}
