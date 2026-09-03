import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "../landing/logo"
import { CertificateIcon, CalendarIcon, LifeBuoyIcon, UsersIcon, LogOutIcon, ChevronDownIcon } from "../icons"
import { student } from "../../data/dashboard"
import { useAuth } from "../../lib/auth"
import { useClickOutside } from "../../lib/use-click-outside"

const links = [
  { label: "Soporte", href: "#soporte", Icon: LifeBuoyIcon },
]

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  useClickOutside(menuRef, () => setMenuOpen(false))

  function handleLogout() {
    setMenuOpen(false)
    logout()
    navigate("/")
  }

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

          <div ref={menuRef} className="relative ml-1 sm:ml-2">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Menú de cuenta"
              className="flex items-center gap-1.5 rounded-full transition hover:opacity-90"
            >
              <img
                src="/images/maria-avatar.png"
                alt={`Foto de perfil de ${user?.name ?? student.name}`}
                className="h-9 w-9 rounded-full border-2 border-border object-cover"
              />
              <ChevronDownIcon className={`hidden h-4 w-4 text-muted transition-transform sm:block ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card py-1.5 shadow-lg"
              >
                <div className="border-b border-border px-4 py-2.5">
                  <p className="truncate text-sm font-semibold text-foreground">{user?.name ?? student.name}</p>
                  {user?.email && <p className="truncate text-xs text-muted">{user.email}</p>}
                </div>
                <Link
                  role="menuitem"
                  to="/dashboard/cuenta"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted-surface"
                >
                  <UsersIcon className="h-4 w-4 text-muted" />
                  Mi cuenta
                </Link>
                <button
                  role="menuitem"
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-destructive transition hover:bg-destructive/10"
                >
                  <LogOutIcon className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
