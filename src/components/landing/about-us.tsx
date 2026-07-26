import { ShieldIcon, HardHatIcon, HeartPulseIcon, GlobeIcon } from "../icons"
import type { JSX } from "react"

const tags = ["Energías Renovables", "Industria", "Construcción", "Logística", "Gobierno", "Manufactura"]

const areas: { title: string; desc: string; icon: (p: { className?: string }) => JSX.Element }[] = [
  {
    title: "Seguridad Industrial",
    desc: "Programas de prevención de riesgos laborales, trabajo en alturas, espacios confinados y riesgo eléctrico.",
    icon: HardHatIcon,
  },
  {
    title: "Protección Civil",
    desc: "Brigadas contra incendio, mando de emergencias y estrategias tácticas para equipos de respuesta.",
    icon: ShieldIcon,
  },
  {
    title: "Atención Prehospitalaria",
    desc: "Primeros auxilios, resucitación cardio-pulmonar y formación de técnicos en urgencias médicas.",
    icon: HeartPulseIcon,
  },
  {
    title: "Gestión de Emergencias",
    desc: "Comando de situaciones de emergencia, extracción vehicular y operación con materiales riesgosos.",
    icon: GlobeIcon,
  },
]

export function AboutUs() {
  return (
    <section id="enfoque" className="scroll-mt-16 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Nuestra especialidad
          </span>
          <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Nuestro Enfoque
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Universidad Emerge es una unidad estratégica de capacitación especializada orientada al
            desarrollo de competencias en <strong className="text-foreground">seguridad industrial,
            protección civil, atención prehospitalaria y gestión de emergencias</strong> para empresas
            privadas, organismos públicos y gobiernos municipales.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area.title}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary">
                <area.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{area.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-2xl border border-border shadow-sm lg:order-1">
            <img
              src="/images/courses/comandante-emergencias.jpg"
              alt="Comandante de Universidad Emerge coordinando una respuesta a emergencia"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              ¿Quiénes somos?
            </h3>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Surgimos respaldados por la experiencia operativa de{" "}
              <strong className="text-foreground">Grupo Emerge RM</strong> en el sector energético e
              industrial, con el objetivo de convertirnos en el principal referente de capacitación
              especializada en el sureste de México.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              <strong className="text-foreground">Misión:</strong> desarrollar profesionales,
              brigadistas y equipos de respuesta altamente capacitados que contribuyan a la protección
              de la vida, la continuidad operativa y la reducción de riesgos en empresas y comunidades.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              <strong className="text-foreground">Visión:</strong> ser la institución líder del sureste
              de México en capacitación especializada para seguridad industrial, emergencias y
              protección civil, reconocida por su excelencia académica y su impacto en la prevención de
              riesgos.
            </p>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
              Sectores que atendemos
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
