import { ArrowRightIcon, BriefcaseIcon } from "../icons"

export function EnterpriseBanner() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-500">
          <BriefcaseIcon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-foreground">¿Empresa? Capacita a tu cuadrilla</h2>
          <p className="mt-0.5 text-sm leading-relaxed text-muted">
            Planes especiales para equipos de trabajo y certificación grupal
          </p>
        </div>
      </div>

      <a
        href="#cotizar"
        className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary-hover"
      >
        Cotizar para empresa
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  )
}
