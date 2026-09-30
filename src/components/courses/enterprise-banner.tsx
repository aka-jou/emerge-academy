export function EnterpriseBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink px-6 pb-12 pt-10 text-white sm:px-10 lg:px-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="text-balance font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl">
            ¿Capacitas a una cuadrilla completa?
          </h2>
          <p className="mt-4 max-w-lg text-pretty leading-relaxed text-white/70">
            Armamos un plan según el número de participantes, con capacitación en sitio y
            certificación grupal para tu empresa o dependencia.
          </p>
        </div>
        <a
          href="mailto:contacto@emerge.academy?subject=Cotizaci%C3%B3n%20para%20empresa"
          className="inline-flex justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent/85"
        >
          Cotizar para empresa
        </a>
      </div>
      <div aria-hidden="true" className="tape absolute inset-x-0 bottom-0 h-2.5" />
    </div>
  )
}
