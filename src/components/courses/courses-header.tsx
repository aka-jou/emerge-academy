import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "../landing/logo"
import { SearchIcon, ShoppingCartIcon } from "../icons"
import { useCart } from "../../lib/cart"

export function CoursesHeader({ showSearch = true }: { showSearch?: boolean }) {
  const { count } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  function handleSearch(event: FormEvent) {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `/cursos?q=${encodeURIComponent(q)}` : "/cursos")
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Universidad Emerge inicio">
          <Logo />
        </Link>

        {showSearch ? (
          <form role="search" onSubmit={handleSearch} className="relative mx-auto hidden w-full max-w-xs sm:block">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cursos"
              aria-label="Buscar cursos"
              className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </form>
        ) : (
          <span className="mx-auto" />
        )}

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <Link
            to="/cursos"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-background sm:inline-flex"
          >
            Catálogo
          </Link>
          <Link
            to="/carrito"
            aria-label={`Carrito de inscripciones${count > 0 ? ` (${count})` : ""}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition hover:bg-ink/85"
          >
            <ShoppingCartIcon className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
