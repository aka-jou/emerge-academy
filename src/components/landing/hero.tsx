import { Link } from "react-router-dom"
import { CheckIcon } from "../icons"

const pillars = [
  "Trabajo en Alturas (Working at Heights)",
  "Primeros Auxilios (First Aid)",
  "Manejo Manual de Cargas",
  "Extinción de Incendios",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Centro de entrenamiento certificado
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            UNIVERSIDAD EMERGE <br/> Formación certificada
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Capacítate con estándares internacionales para trabajar en el sector eólico. Cursos
            prácticos impartidos por instructores certificados, con infraestructura real y enfoque en
            tu empleabilidad.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <li key={pillar} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {pillar}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/cursos"
              className="rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Ver cursos
            </Link>
            <a
              href="#fechas"
              className="rounded-lg border border-border bg-card px-6 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-background"
            >
              Calendario y sedes
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border shadow-[0_12px_40px_rgba(20,83,45,0.12)]">
            <img
              src="/images/training-center.png"
              alt="Centro de entrenamiento GWO de EMERGE Academy con prácticas de trabajo en alturas"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card px-5 py-3 shadow-lg sm:block">
            <p className="text-2xl font-extrabold text-primary">+2,500</p>
            <p className="text-xs font-medium text-muted">técnicos formados</p>
          </div>
        </div>
      </div>
    </section>
  )
}
