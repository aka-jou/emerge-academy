import { useState } from "react"
import { Link } from "react-router-dom"
import { Logo } from "./logo"
import { MenuIcon } from "../icons"

const navLinks = [
  { label: "Cursos", href: "/cursos", route: true },
  { label: "Nuestro Enfoque", href: "#enfoque", route: false },
  { label: "Beneficios", href: "#beneficios", route: false },
  { label: "Calendario", href: "#fechas", route: false },
  { label: "Sectores", href: "#sectores", route: false },
  { label: "Blog", href: "#blog", route: false },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Universidad Emerge inicio">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.route ? (
                <Link
                  to={link.href}
                  className="text-sm font-medium text-muted transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted transition hover:text-foreground"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
        <Link
            to="/login"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Mi inscripción
          </Link>
         
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
                {link.route ? (
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm font-medium text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm font-medium text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 border-t border-border px-4 py-3">
          <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              Mi inscripción
            </Link>
           
          </div>
        </div>
      )}
    </header>
  )
}
