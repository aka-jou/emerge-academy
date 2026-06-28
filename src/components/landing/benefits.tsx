import { BriefcaseIcon, ShieldIcon, CertificateIcon, UsersIcon } from "../icons"
import type { JSX } from "react"

const benefits: { title: string; desc: string; icon: (p: { className?: string }) => JSX.Element }[] = [
  {
    title: "Empleabilidad Real",
    desc: "Formación alineada a lo que exigen las empresas del sector eólico para contratar de inmediato.",
    icon: BriefcaseIcon,
  },
  {
    title: "Máxima Seguridad",
    desc: "Protocolos y equipos que cumplen los estándares GWO para que trabajes con total confianza.",
    icon: ShieldIcon,
  },
  {
    title: "Instructores Certificados",
    desc: "Aprende con profesionales acreditados y amplia experiencia operativa en campo.",
    icon: CertificateIcon,
  },
  {
    title: "Bolsa de Trabajo",
    desc: "Conectamos a nuestros egresados con vacantes reales en empresas aliadas del sector.",
    icon: UsersIcon,
  },
]

export function Benefits() {
  return (
    <section id="empresas" className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            ¿Por qué elegir EMERGE Academy?
          </h2>
          <p className="mt-4 text-pretty text-muted">
            Una formación pensada para impulsar tu carrera en la energía eólica.
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
