// Pantalla de carga de marca: logo con pulso suave y una barra indeterminada. Se usa
// mientras se valida la sesión o se cargan los datos de una página completa.
export function PageLoader({ label = "Cargando…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-background animate-fade-in"
    >
      <img
        src="/images/logo-emerge.png"
        alt=""
        aria-hidden="true"
        className="h-14 w-14 object-contain animate-loader-pulse"
      />
      <div className="h-1 w-40 overflow-hidden rounded-full bg-primary/10">
        <div className="h-full w-full origin-left rounded-full bg-primary animate-loader-bar" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</span>
    </div>
  )
}
