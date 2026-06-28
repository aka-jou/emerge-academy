import { WindIcon, ShieldIcon, HardHatIcon, HeartPulseIcon } from "../icons"
import type { JSX } from "react"

const tags = ["GWO", "ISO 9001", "NOM-009-STPS", "BST", "BTT", "ART"]

const areas: { title: string; desc: string; icon: (p: { className?: string }) => JSX.Element }[] = [
  {
    title: "Energía eólica",
    desc: "Formamos a los técnicos que instalan, operan y mantienen aerogeneradores en parques eólicos.",
    icon: WindIcon,
  },
  {
    title: "Seguridad en altura",
    desc: "Trabajo seguro en torres, sistemas de detención de caídas y rescate en aerogeneradores.",
    icon: ShieldIcon,
  },
  {
    title: "Operación técnica",
    desc: "Manejo de equipos, herramientas y procedimientos homologados para el campo eólico.",
    icon: HardHatIcon,
  },
  {
    title: "Respuesta a emergencias",
    desc: "Primeros auxilios, extinción de incendios y protocolos de evacuación en sitio.",
    icon: HeartPulseIcon,
  },
]

export function WhatIsGWO() {
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
            En EMERGE Academy nos especializamos en la <strong className="text-foreground">formación de
            seguridad y técnica para la industria eólica</strong>. Todas nuestras capacitaciones giran en
            torno al trabajo seguro en aerogeneradores: desde el ascenso a torres y el rescate en altura,
            hasta la operación y el mantenimiento de los equipos que generan energía limpia.
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
              src="/images/wind-farm.png"
              alt="Parque eólico con aerogeneradores donde trabajan los técnicos certificados GWO"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              ¿Qué es GWO?
            </h3>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              La <strong className="text-foreground">Global Wind Organisation (GWO)</strong> es el
              estándar internacional de seguridad y formación para la industria eólica. Sus
              certificaciones son reconocidas mundialmente y exigidas por fabricantes y operadores para
              trabajar en aerogeneradores.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              En EMERGE Academy impartimos estos estándares con infraestructura real, equipos
              homologados y prácticas que replican las condiciones de campo, garantizando una formación
              válida en cualquier proyecto eólico del mundo.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
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
