import { HardHatIcon } from "../icons"
import { SectionHeading } from "./section-heading"

/** Requisitos previos con el tratamiento de un letrero de advertencia. */
export function Prerequisites({ items }: { items: string[] }) {
  if (items.length === 0) return null

  return (
    <section
      aria-labelledby="requisitos-title"
      className="overflow-hidden rounded-2xl bg-sign-yellow-soft ring-1 ring-sign-yellow/50"
    >
      <div aria-hidden="true" className="hazard h-3" />
      <div className="p-6 sm:p-8">
        <h2 id="requisitos-title" className="font-display text-3xl font-semibold leading-none text-[#3b2f00]">
          Requisitos obligatorios
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-snug text-[#3b2f00]">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-5 w-5 shrink-0 rotate-45 items-center justify-center rounded-[3px] bg-sign-yellow"
              >
                <span className="-rotate-45 text-[11px] font-black leading-none text-[#1d1c17]">!</span>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** EPP con círculos azules, como las señales de uso obligatorio. */
export function PpeRequirements({ items }: { items: string[] }) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="epp-title">
      <SectionHeading id="epp-title">Equipo de protección personal</SectionHeading>
      <p className="mt-3 text-muted">De uso obligatorio durante todas las prácticas.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-border">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sign-blue text-white ring-4 ring-sign-blue/15">
              <HardHatIcon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium leading-snug text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function StandardsList({ standards }: { standards: { code: string; name: string }[] }) {
  if (standards.length === 0) return null

  return (
    <section aria-labelledby="normas-title">
      <SectionHeading id="normas-title">Normas que cubre</SectionHeading>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {standards.map((std) => (
          <li key={std.code} className="rounded-2xl border-2 border-ink/85 p-5">
            <p className="font-display text-2xl font-semibold leading-none tracking-wide text-foreground">
              {std.code}
            </p>
            <p className="mt-2 text-sm leading-snug text-muted">{std.name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
