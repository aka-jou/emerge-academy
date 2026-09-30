import { useRef } from "react"
import type { CourseModule } from "../../data/courses"
import { ClockIcon, FileTextIcon } from "../icons"
import { gsap, useGSAP } from "../../lib/gsap"
import { SectionHeading } from "./section-heading"

const barShades = [
  "bg-ink text-white",
  "bg-primary text-primary-foreground",
  "bg-(--area) text-(--area-ink)",
  "bg-primary/25 text-foreground",
]

export function CourseSyllabus({ modules }: { modules: CourseModule[] }) {
  const root = useRef<HTMLElement>(null)
  const totalHours = modules.reduce((sum, m) => sum + m.hours, 0)
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Las barras de horas crecen al entrar en pantalla.
        gsap.from(q("[data-syllabus='segment']"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: q("[data-syllabus='bar']")[0], start: "top 85%", once: true },
        })

        // Cada módulo se enciende al alcanzarlo y la línea avanza hasta el siguiente.
        q("[data-syllabus='item']").forEach((item) => {
          gsap.to(item, {
            scrollTrigger: { trigger: item, start: "top 62%", end: "max", toggleClass: "is-active" },
          })
          const fill = item.querySelector("[data-syllabus='fill']")
          if (fill) {
            gsap.fromTo(
              fill,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: { trigger: item, start: "top 62%", end: "bottom 62%", scrub: true },
              },
            )
          }
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="temario" ref={root} aria-labelledby="temario-title">
      <SectionHeading id="temario-title">Temario</SectionHeading>
      <p className="mt-3 text-muted">
        {modules.length} módulos, {totalLessons} lecciones y {totalHours} horas de formación
        teórico-práctica.
      </p>

      <div
        data-syllabus="bar"
        role="img"
        aria-label={`Horas por módulo: ${modules.map((m) => `módulo ${m.number}, ${m.hours} horas`).join("; ")}`}
        className="mt-6 flex h-11 gap-1 overflow-hidden rounded-xl"
      >
        {modules.map((m, i) => (
          <div
            key={m.number}
            data-syllabus="segment"
            style={{ flexGrow: m.hours }}
            className={`flex min-w-0 basis-0 items-center justify-center font-display text-base font-semibold ${barShades[i % barShades.length]}`}
          >
            {m.hours} h
          </div>
        ))}
      </div>

      <ol className="mt-8">
        {modules.map((m, i) => (
          <li
            key={m.number}
            data-syllabus="item"
            className="group relative grid grid-cols-[3.25rem_1fr] gap-5 py-5"
          >
            {i < modules.length - 1 && (
              <>
                <span aria-hidden="true" className="absolute left-[1.625rem] top-[2.875rem] h-full w-px bg-border" />
                <span
                  aria-hidden="true"
                  data-syllabus="fill"
                  className="absolute left-[1.625rem] top-[2.875rem] h-full w-px origin-top bg-primary motion-reduce:hidden"
                />
              </>
            )}
            <span className="relative z-10 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-background font-display text-xl font-semibold text-muted ring-1 ring-border transition-colors duration-500 group-[.is-active]:bg-ink group-[.is-active]:text-white group-[.is-active]:ring-ink">
              {String(m.number).padStart(2, "0")}
            </span>
            <div className="pt-1.5">
              <h3 className="text-pretty text-lg font-semibold leading-snug text-foreground">{m.title}</h3>
              <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <FileTextIcon className="h-4 w-4" />
                  {m.lessons} lecciones
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4" />
                  {m.hours} horas
                </span>
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-xl bg-muted-surface px-5 py-4 text-sm text-muted ring-1 ring-border">
        El material de apoyo, las evaluaciones y el foro del curso se habilitan al inscribirte.
      </p>
    </section>
  )
}
