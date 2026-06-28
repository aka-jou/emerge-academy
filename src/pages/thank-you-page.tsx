import { Link } from "react-router-dom"
import { CheckIcon, MailIcon, UsersIcon, PlayIcon, ArrowRightIcon } from "../components/icons"

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
})

// Resumen de la transacción mostrado tras un pago exitoso con PayPal.
const order = {
  folio: "EMG-2026-09127",
  method: "PayPal",
  date: "28 de junio de 2026",
  total: 2964.5,
  course: {
    title: "Curso de Seguridad en Alturas GWO",
    module: "Módulo: Trabajos en Altura · Certificación GWO",
    image: "/images/training-center.png",
  },
}

const nextSteps = [
  {
    title: "Revisa tu correo",
    description: "Te enviamos tu comprobante fiscal (CFDI 4.0) y los accesos a la plataforma.",
    Icon: MailIcon,
  },
  {
    title: "Completa tu perfil estudiantil",
    description: "Agrega tus datos profesionales para personalizar tu certificación.",
    Icon: UsersIcon,
  },
  {
    title: "Inicia tu primera lección",
    description: "Tu curso ya está disponible. Comienza cuando quieras, a tu propio ritmo.",
    Icon: PlayIcon,
  },
]

export function ThankYouPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-4 py-12 sm:px-6 sm:py-16">
        {/* Insignia de éxito */}
        <div className="relative flex items-center justify-center">
          <span className="absolute h-28 w-28 animate-ping rounded-full bg-green-400/30" aria-hidden="true" />
          <span className="absolute h-24 w-24 rounded-full bg-green-100" aria-hidden="true" />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/40">
            <CheckIcon className="h-10 w-10 text-white" />
          </span>
        </div>

        {/* Encabezado de celebración */}
        <h1 className="mt-8 text-center text-2xl font-extrabold tracking-tight text-foreground text-balance sm:text-3xl">
          ¡Tu inscripción está confirmada!
        </h1>
        <p className="mt-2 text-center text-base font-medium text-muted text-pretty">
          Bienvenido a EMERGE Academy
        </p>

        {/* Tarjeta de resumen de la transacción */}
        <section
          aria-label="Resumen de la compra"
          className="mt-8 w-full rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Número de orden</p>
              <p className="mt-1 font-mono text-lg font-bold text-foreground">{order.folio}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
              <CheckIcon className="h-3.5 w-3.5" />
              Pago confirmado
            </span>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">Método de pago</dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">{order.method}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">Fecha de compra</dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">{order.date}</dd>
            </div>
            <div className="sm:text-right">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">Monto total</dt>
              <dd className="mt-1 text-sm font-extrabold text-primary">{currency.format(order.total)}</dd>
            </div>
          </dl>

          {/* Miniatura del curso adquirido */}
          <div className="mt-6 flex items-center gap-4 rounded-xl border border-border bg-muted-surface/50 p-4">
            <img
              src={order.course.image || "/placeholder.svg"}
              alt={order.course.title}
              className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-foreground">{order.course.title}</h2>
              <p className="mt-0.5 truncate text-xs text-muted">{order.course.module}</p>
              <div className="mt-3 flex items-center gap-3">
                <div
                  className="h-2 flex-1 overflow-hidden rounded-full bg-border"
                  role="progressbar"
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progreso del curso"
                >
                  <div className="h-full rounded-full bg-primary" style={{ width: "0%" }} />
                </div>
                <span className="whitespace-nowrap text-xs font-semibold text-muted">0% · Listo para comenzar</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pasos siguientes */}
        <section aria-label="Pasos siguientes" className="mt-8 w-full">
          <h2 className="text-base font-bold tracking-tight text-foreground">Tus próximos pasos</h2>
          <ol className="mt-4 flex flex-col gap-3">
            {nextSteps.map((step, index) => {
              const { title, description, Icon } = step
              return (
                <li
                  key={title}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Icon className="h-4 w-4 text-primary" />
                      {title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        {/* CTA principal */}
        <Link
          to="/dashboard"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
        >
          Comenzar capacitación ahora
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/cursos"
          className="mt-3 text-sm font-medium text-muted transition hover:text-foreground"
        >
          Seguir explorando cursos
        </Link>
      </main>
    </div>
  )
}
