import { useState, type JSX } from "react"
import { Link } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard/dashboard-header"
import { ProfileTab } from "../components/account/profile-tab"
import { SecurityTab } from "../components/account/security-tab"
import { BillingTab } from "../components/account/billing-tab"
import { ChevronRightIcon, UsersIcon, LockIcon, FileTextIcon } from "../components/icons"

type TabId = "profile" | "security" | "billing"

const tabs: { id: TabId; label: string; Icon: (p: { className?: string }) => JSX.Element }[] = [
  { id: "profile", label: "Mi Perfil", Icon: UsersIcon },
  { id: "security", label: "Seguridad", Icon: LockIcon },
  { id: "billing", label: "Historial de Pagos y Facturación", Icon: FileTextIcon },
]

export function AccountSettingsPage() {
  const [active, setActive] = useState<TabId>("profile")

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
          <span className="font-medium text-foreground">Ajustes de Cuenta y Perfil</span>
        </nav>

        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">Ajustes de Cuenta y Perfil</h1>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Administra tu información personal, la seguridad de tu cuenta y tu historial de facturación.
          </p>
        </div>

        {/* Panel con menú de pestañas (vertical en desktop, superior en móvil) */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside aria-label="Secciones de ajustes">
            <nav className="flex gap-2 overflow-x-auto rounded-xl border border-border bg-card p-2 lg:flex-col lg:overflow-visible">
              {tabs.map(({ id, label, Icon }) => {
                const isActive = active === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActive(id)}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "inline-flex w-full shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg bg-primary px-3.5 py-2.5 text-left text-sm font-semibold text-primary-foreground transition lg:whitespace-normal"
                        : "inline-flex w-full shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-sm font-medium text-muted transition hover:bg-muted-surface hover:text-foreground lg:whitespace-normal"
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </button>
                )
              })}
            </nav>
          </aside>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            {active === "profile" && <ProfileTab />}
            {active === "security" && <SecurityTab />}
            {active === "billing" && <BillingTab />}
          </section>
        </div>
      </main>
    </div>
  )
}
