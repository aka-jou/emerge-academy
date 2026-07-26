import { StarIcon } from "../icons"

const testimonials = [
  {
    name: "Carlos Méndez",
    role: "Coordinador de seguridad · Empresa EPC, sector eólico",
    avatar: "/images/avatar-1.png",
    quote:
      "La capacitación en Trabajo Seguro en Alturas y Espacios Confinados de Universidad Emerge elevó el nivel de nuestra cuadrilla. Los instructores conocen el campo y eso se nota en la práctica.",
  },
  {
    name: "Daniela Ruiz",
    role: "Jefa de Protección Civil · Gobierno municipal",
    avatar: "/images/avatar-2.png",
    quote:
      "Capacitaron a toda nuestra brigada contra incendio con escenarios reales. El programa de Comandante de Situaciones de Emergencia mejoró nuestra capacidad de respuesta como institución.",
  },
  {
    name: "Jorge Sandoval",
    role: "Gerente de planta · Industria manufacturera",
    avatar: "/images/avatar-3.png",
    quote:
      "Llevamos varios cursos in-company con Universidad Emerge: LOTO, Riesgo Eléctrico y Sustancias Químicas. La formación práctica redujo notablemente nuestros incidentes.",
  },
]

export function Testimonials() {
  return (
    <section id="blog" className="scroll-mt-16 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Lo que dicen nuestros egresados
          </h2>
          <p className="mt-4 text-pretty text-muted">
            Empresas y gobiernos que ya fortalecieron su capacidad de respuesta con Universidad Emerge.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex gap-1 text-primary" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                {`"${t.quote}"`}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar || "/placeholder.svg"}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
