import { Link } from "react-router-dom"
import { Logo } from "../landing/logo"
import { CertificateIcon, CalendarIcon, LifeBuoyIcon } from "../icons"
import { student } from "../../data/dashboard"

const links = [
  { label: "Soporte", href: "#soporte", Icon: LifeBuoyIcon },
]

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" aria-label="Universidad Emerge - Dashboard">
          <Logo />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/dashboard/calendario"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted transition hover:bg-muted-surface hover:text-foreground"
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Calendario</span>
          </Link>

          <Link
            to="/dashboard/logros"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted transition hover:bg-muted-surface hover:text-foreground"
          >
            <CertificateIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Certificados</span>
          </Link>

          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted transition hover:bg-muted-surface hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}

          <Link
            to="/dashboard/cuenta"
            className="ml-1 rounded-full transition hover:opacity-90 sm:ml-2"
            aria-label="Ajustes de cuenta y perfil"
          >
            <img
              src="/images/maria-avatar.png"
              alt={`Foto de perfil de ${student.name}`}
              className="h-9 w-9 rounded-full border-2 border-border object-cover"
            />
          </Link>
        </div>
      </nav>
    </header>
  )
}
