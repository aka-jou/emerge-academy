import { DownloadIcon, ArrowRightIcon } from "../icons"
import { downloads, type DownloadFile } from "../../data/dashboard"

const extTint: Record<DownloadFile["ext"], string> = {
  PDF: "bg-red-100 text-red-600",
  DOC: "bg-blue-100 text-blue-600",
  XLS: "bg-green-100 text-green-700",
}

export function RecentDownloads() {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-foreground">Descargas recientes</h2>

        <ul className="mt-4 flex flex-col gap-2">
          {downloads.map((file) => (
            <li key={file.id}>
              <a
                href="#descarga"
                className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:bg-muted-surface"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${extTint[file.ext]}`}
                >
                  {file.ext}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{file.size}</p>
                </div>
                <DownloadIcon className="h-4 w-4 shrink-0 text-muted" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#todas-descargas"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary-hover"
        >
          Ver todas las descargas
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </section>

      <section className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm">
        <h3 className="text-lg font-bold text-balance">Certificaciones disponibles</h3>
        <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
          Desbloquea nuevas certificaciones GWO y haz crecer tu perfil profesional.
        </p>
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-white/90"
        >
          Explorarlas
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </section>
    </div>
  )
}
