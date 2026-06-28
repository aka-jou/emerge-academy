import { useState } from "react"
import { VideoIcon, FileTextIcon, DownloadIcon } from "../icons"
import type { LiveSession } from "../../data/dashboard"

type TabKey = "descripcion" | "agenda" | "materiales"

const tabs: { key: TabKey; label: string }[] = [
  { key: "descripcion", label: "Descripción" },
  { key: "agenda", label: "Agenda" },
  { key: "materiales", label: "Materiales" },
]

export function SessionTabs({ session }: { session: LiveSession }) {
  const [active, setActive] = useState<TabKey>("descripcion")

  return (
    <div>
      <div className="flex gap-1 border-b border-border" role="tablist" aria-label="Detalles de la sesión">
        {tabs.map((tab) => {
          const isActive = active === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.key)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="pt-5">
        {active === "descripcion" && (
          <div>
            <h3 className="text-base font-semibold text-foreground">Acerca de esta sesión</h3>
            <div className="mt-3 flex flex-col gap-3">
              {session.about.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted-surface p-4">
              <VideoIcon className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">Política de grabación:</span> esta videollamada
                será grabada con fines educativos. La grabación estará disponible para los inscritos durante 30
                días en la sección de materiales. Al unirte, aceptas la política de grabación de la plataforma.
              </p>
            </div>
          </div>
        )}

        {active === "agenda" && (
          <ul className="flex flex-col gap-2">
            {session.agenda.map((item) => (
              <li
                key={item.time}
                className="flex items-center gap-4 rounded-xl border border-border bg-muted-surface/40 p-3"
              >
                <span className="rounded-md bg-primary px-2.5 py-1 font-mono text-xs font-bold text-primary-foreground">
                  {item.time}
                </span>
                <span className="text-sm font-medium text-foreground">{item.topic}</span>
              </li>
            ))}
          </ul>
        )}

        {active === "materiales" && (
          <ul className="flex flex-col gap-2">
            {session.materials.map((file) => (
              <li
                key={file.name}
                className="flex items-center gap-3 rounded-xl border border-border bg-muted-surface/40 p-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted-surface text-primary">
                  <FileTextIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {file.ext} · {file.size}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Descargar ${file.name}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted transition hover:bg-muted-surface hover:text-foreground"
                >
                  <DownloadIcon className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
