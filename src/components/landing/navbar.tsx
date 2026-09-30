import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Logo } from "./logo"
import { MenuIcon } from "../icons"
import { ScrollTrigger } from "../../lib/gsap"

const navLinks = [
  { label: "Cursos", href: "/cursos", route: true },
  { label: "Nuestro Enfoque", href: "#enfoque", route: false },
  { label: "Beneficios", href: "#beneficios", route: false },
  { label: "Calendario", href: "#fechas", route: false },
  { label: "Sectores", href: "#empresas", route: false },
  { label: "Blog", href: "#blog", route: false },
]

/** Altura (px desde arriba) del centro del navbar: ahí se mide qué sección queda detrás. */
const NAV_LINE = 40

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [onDark, setOnDark] = useState(false)

  // Cambia el tema del navbar cuando pasa sobre una sección marcada con data-nav-theme="dark".
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]')
    const triggers: ScrollTrigger[] = []
    const sync = () => setOnDark(triggers.some((t) => t.isActive))

    sections.forEach((el) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: `top ${NAV_LINE}px`,
          end: `bottom ${NAV_LINE}px`,
          refreshPriority: -1,
          onToggle: sync,
        }),
      )
    })
    sync()

    return () => triggers.forEach((t) => t.kill())
  }, [])

  const pill = onDark
    ? "border-white/15 bg-ink/70 text-white"
    : "border-border bg-background/75 text-foreground"
  const link = onDark ? "text-white/70 hover:text-white" : "text-muted hover:text-foreground"
  const cta = onDark
    ? "bg-accent text-accent-foreground hover:bg-accent/85"
    : "bg-primary text-primary-foreground hover:bg-primary-hover"

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6">
      <nav
        aria-label="Principal"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border pl-4 pr-2 shadow-[0_8px_30px_rgba(15,61,46,0.08)] backdrop-blur-md transition-colors duration-500 ${pill}`}
      >
        <Link to="/" aria-label="Universidad Emerge inicio">
          <Logo dark={onDark} />
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <li key={item.label}>
              {item.route ? (
                <Link to={item.href} className={`text-sm font-medium transition-colors ${link}`}>
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} className={`text-sm font-medium transition-colors ${link}`}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Link
            to="/login"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-500 md:inline-flex ${cta}`}
          >
            Mi inscripción
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur-md lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((item) => (
              <li key={item.label}>
                {item.route ? (
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground md:hidden"
          >
            Mi inscripción
          </Link>
        </div>
      )}
    </header>
  )
}
