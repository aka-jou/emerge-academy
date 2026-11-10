import { useEffect, useState } from "react"
import { ChevronDownIcon, FileTextIcon } from "../icons"
import type { CourseManual, ManualBlock, ManualSection } from "../../data/manuals"

type ManualContentProps = {
  manual: CourseManual | null
  loading: boolean
  moduleNumber: number
}

// Lectura del Manual del Participante dentro del reproductor: muestra los temas del manual que
// corresponden al módulo activo. Cada tema es plegable para que el alumno avance por partes.
export function ManualContent({ manual, loading, moduleNumber }: ManualContentProps) {
  const sections = manual?.modules[String(moduleNumber)] ?? []
  const showIntro = moduleNumber === 1 && (manual?.intro.length ?? 0) > 0
  const [openIndex, setOpenIndex] = useState<number | null>(showIntro ? -1 : 0)

  // Al cambiar de módulo se abre el primer tema (o la presentación en el módulo 1).
  useEffect(() => {
    setOpenIndex(showIntro ? -1 : 0)
  }, [moduleNumber, manual, showIntro])

  if (loading) {
    return (
      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <p className="text-sm font-medium text-muted">Cargando manual del participante…</p>
      </section>
    )
  }

  if (!manual || (sections.length === 0 && !showIntro)) return null

  return (
    <section aria-labelledby="manual-heading" className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
      <header className="flex items-start gap-3 border-b border-border px-5 py-4">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileTextIcon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <h2 id="manual-heading" className="text-sm font-bold text-foreground">
            Manual del participante
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            {manual.title}
            {manual.code ? ` · ${manual.code}` : ""} · {sections.length}{" "}
            {sections.length === 1 ? "tema en este módulo" : "temas en este módulo"}
          </p>
        </div>
      </header>

      <ul className="divide-y divide-border">
        {showIntro && (
          <ManualItem
            title="Presentación del curso"
            label="Inicio"
            open={openIndex === -1}
            onToggle={() => setOpenIndex(openIndex === -1 ? null : -1)}
            blocks={manual.intro}
          />
        )}
        {sections.map((section, i) => (
          <ManualItem
            key={`${moduleNumber}-${i}`}
            title={section.title}
            label={`Tema ${i + 1}`}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            blocks={section.blocks}
          />
        ))}
      </ul>
    </section>
  )
}

type ManualItemProps = {
  title: ManualSection["title"]
  label: string
  open: boolean
  onToggle: () => void
  blocks: ManualBlock[]
}

function ManualItem({ title, label, open, onToggle, blocks }: ManualItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-muted-surface"
      >
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-primary">{label}</span>
        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground text-pretty">{title}</span>
        <ChevronDownIcon className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-6 pt-1">
          <ManualBlocks blocks={blocks} />
        </div>
      )}
    </li>
  )
}

function ManualBlocks({ blocks }: { blocks: ManualBlock[] }) {
  return (
    <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/85">
      {blocks.map((block, i) => {
        switch (block.t) {
          case "h":
            return (
              <h3 key={i} className="mt-3 text-sm font-bold text-foreground text-pretty first:mt-0">
                {block.text}
              </h3>
            )
          case "p":
            return (
              <p key={i} className="text-pretty">
                {block.text}
              </p>
            )
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-1.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={i} className="flex flex-col gap-1.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="w-5 shrink-0 text-right font-semibold tabular-nums text-primary">{j + 1}.</span>
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ol>
            )
        }
      })}
    </div>
  )
}
