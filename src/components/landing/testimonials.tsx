import { StarIcon } from "../icons"

const testimonials = [
  {
    name: "Carlos Méndez",
    role: "Técnico de mantenimiento · Vestas",
    avatar: "/images/avatar-1.png",
    quote:
      "La certificación GWO de EMERGE me abrió las puertas. A las dos semanas de terminar ya estaba trabajando en un parque eólico. La práctica en alturas fue de primer nivel.",
  },
  {
    name: "Daniela Ruiz",
    role: "Especialista en seguridad · Acciona",
    avatar: "/images/avatar-2.png",
    quote:
      "Los instructores realmente conocen el campo. Aprendí protocolos que aplico todos los días. Recomiendo EMERGE a cualquiera que quiera entrar al sector eólico.",
  },
  {
    name: "Jorge Sandoval",
    role: "Supervisor de cuadrilla · Enel Green Power",
    avatar: "/images/avatar-3.png",
    quote:
      "Excelente infraestructura y grupos reducidos. La formación es exigente y eso se nota cuando llegas a la torre. La bolsa de trabajo me consiguió mi primer contrato.",
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
            Profesionales que hoy trabajan en las principales empresas del sector eólico.
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
