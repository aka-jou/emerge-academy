import { useState } from "react"
import type { CourseModule } from "../../data/courses"
import { ChevronDownIcon, FileTextIcon, ClockIcon } from "../icons"

const tabs = ["Módulos", "Material", "Evaluaciones", "Foro", "Avisos"] as const

function ModuleAccordion({ module }: { module: CourseModule }) {
  const [open, setOpen] = useState(module.number === 1)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-background"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {module.number}
        </span>
        <span className="flex-1">
          <span className="block text-sm font-semibold text-foreground">{module.title}</span>
          <span className="mt-0.5 flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <FileTextIcon className="h-3.5 w-3.5" />
              {module.lessons} lecciones
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="h-3.5 w-3.5" />
              {module.hours} horas
            </span>
          </span>
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-border px-4 py-4 pl-[4.25rem] text-sm leading-relaxed text-muted">
          Contenido teórico y práctico del módulo con material descargable, ejercicios guiados y
          evaluación de seguimiento al finalizar las {module.lessons} lecciones.
        </div>
      )}
    </div>
  )
}

export function CourseTabs({ modules }: { modules: CourseModule[] }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Módulos")

  return (
    <section className="mt-10">
      <div className="flex flex-wrap gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`relative px-4 py-3 text-sm font-semibold transition ${
              active === tab
                ? "text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {active === "Módulos" ? (
          <div className="flex flex-col gap-3">
            {modules.map((module) => (
              <ModuleAccordion key={module.number} module={module} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-muted-surface px-6 py-12 text-center text-sm text-muted">
            El contenido de “{active}” estará disponible al inscribirte en el curso.
          </div>
        )}
      </div>
    </section>
  )
}
