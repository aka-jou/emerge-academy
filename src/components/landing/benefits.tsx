import { BriefcaseIcon, ShieldIcon, CertificateIcon, UsersIcon } from "../icons"
import type { JSX } from "react"

const benefits: { title: string; desc: string; icon: (p: { className?: string }) => JSX.Element }[] = [
  {
    title: "Formación Práctica",
    desc: "Capacitación basada en escenarios reales que fortalece la capacidad de respuesta de tu equipo.",
    icon: ShieldIcon,
  },
  {
    title: "Instructores Especializados",
    desc: "Aprende con profesionales certificados y con amplia experiencia operativa en campo.",
    icon: CertificateIcon,
  },
  {
    title: "Experiencia Industrial",
    desc: "Respaldados por Grupo Emerge RM, con trayectoria en el sector energético e industrial.",
    icon: BriefcaseIcon,
  },
  {
    title: "Capacitación en Sitio",
    desc: "Programas personalizados con cobertura regional para empresas y gobiernos municipales.",
    icon: UsersIcon,
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-16 bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            ¿Por qué elegir Universidad Emerge?
          </h2>
          <p className="mt-4 text-pretty text-muted">
            Capacitación especializada basada en escenarios reales, instructores certificados y
            metodologías prácticas.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/12 text-primary">
                <b.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
