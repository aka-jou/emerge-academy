import { Link } from "react-router-dom"
import { Logo } from "../landing/logo"
import { SearchIcon, ShoppingCartIcon } from "../icons"
import { useCart } from "../../lib/cart"

export function CoursesHeader() {
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Universidad Emerge inicio">
          <Logo />
        </Link>

        <div className="relative mx-auto hidden w-full max-w-xs sm:block">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Buscar cursos..."
            aria-label="Buscar cursos"
            className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div className="ml-auto flex items-center gap-3 sm:ml-0">
          <Link
            to="/carrito"
            aria-label={`Carrito de inscripciones${count > 0 ? ` (${count})` : ""}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-background"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[11px] font-bold text-white">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
          <Link
            to="/cursos"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Ver calendario
          </Link>
        </div>
      </div>
    </header>
  )
}
