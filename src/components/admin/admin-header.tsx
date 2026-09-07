import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "../landing/logo"
import { LayoutDashboardIcon, VideoIcon, LogOutIcon, ChevronDownIcon, UsersIcon } from "../icons"
import { useAuth } from "../../lib/auth"
import { useClickOutside } from "../../lib/use-click-outside"
import { getInitials } from "../../lib/initials"

export function AdminHeader() {
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
        <Link to="/admin" aria-label="Universidad Emerge - Panel de administrador" className="flex items-center gap-2">
          <Logo />
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted transition hover:bg-muted-surface hover:text-foreground"
          >
            <LayoutDashboardIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Resumen</span>
          </Link>

          <Link
            to="/admin/sesiones"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted transition hover:bg-muted-surface hover:text-foreground"
          >
            <VideoIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Sesiones</span>
          </Link>

          <div ref={menuRef} className="relative ml-1 sm:ml-2">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Menú de cuenta"
              className="flex items-center gap-1.5 rounded-full transition hover:opacity-90"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-primary/10 text-sm font-bold text-primary">
                {user?.name ? getInitials(user.name) : "AD"}
              </span>
              <ChevronDownIcon className={`hidden h-4 w-4 text-muted transition-transform sm:block ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card py-1.5 shadow-lg"
              >
                <div className="border-b border-border px-4 py-2.5">
                  <p className="truncate text-sm font-semibold text-foreground">{user?.name}</p>
                  {user?.email && <p className="truncate text-xs text-muted">{user.email}</p>}
                </div>
                <Link
                  role="menuitem"
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted-surface"
                >
                  <UsersIcon className="h-4 w-4 text-muted" />
                  Ver como alumno
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
