import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-muted">Error 404</p>
      <h1 className="text-3xl font-bold text-foreground">Esta página no existe</h1>
      <p className="max-w-md text-muted">Es posible que el enlace esté roto o que la página se haya movido.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
          Ir al inicio
        </Link>
        <Link to="/cursos" className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">
          Ver cursos
        </Link>
      </div>
    </main>
  )
}
