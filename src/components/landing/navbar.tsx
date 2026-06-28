import { useState } from "react"
import { Link } from "react-router-dom"
import { Logo } from "./logo"
import { MenuIcon } from "../icons"

const navLinks = [
  { label: "Cursos GWO", href: "/cursos" },
  { label: "Calendario", href: "#fechas" },
  { label: "Sedes", href: "#sedes" },
  { label: "Instructores", href: "#instructores" },
  { label: "Empresas", href: "#empresas" },
  { label: "Blog", href: "#blog" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="EMERGE Academy inicio">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-foreground transition hover:text-primary"
          >
            Mi inscripción
          </Link>
          <a
            href="#cotizar"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Cotizar
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-muted transition hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 border-t border-border px-4 py-3">
            <Link
              to="/login"
              className="rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold text-foreground"
            >
              Mi inscripción
            </Link>
            <a
              href="#cotizar"
              className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              Cotizar
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
