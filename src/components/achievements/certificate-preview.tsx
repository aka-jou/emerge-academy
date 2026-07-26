import { GraduationCapIcon, ShieldIcon, StarIcon } from "../icons"
import { certificate } from "../../data/dashboard"

export function CertificatePreview() {
  return (
    <figure className="m-0">
      <div className="rounded-2xl bg-card p-3 shadow-2xl ring-1 ring-border sm:p-4">
        {/* Documento del certificado en proporción 4:3 */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-primary/15 bg-card">
          {/* Marco decorativo */}
          <div className="absolute inset-2 rounded-md border border-primary/20" />
          <div className="absolute inset-3 rounded-sm border border-amber-300/40" />

          <div className="relative flex h-full flex-col items-center justify-between px-5 py-5 text-center sm:px-8 sm:py-7">
            {/* Encabezado: logo */}
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCapIcon className="h-4 w-4" />
              </span>
              <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">
                EMERGE UNIVERSITY
              </span>
            </div>

            {/* Cuerpo */}
            <div className="flex flex-col items-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">
                Certificado de aprobación
              </p>
              <p className="mt-1 text-[10px] text-muted sm:text-xs">Se otorga la presente constancia a</p>
              <p className="mt-2 font-serif text-xl font-bold text-primary sm:text-3xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                {certificate.recipient}
              </p>
              <div className="mt-2 h-px w-40 bg-border sm:w-56" />
              <p className="mt-3 max-w-md text-[10px] leading-relaxed text-foreground sm:text-sm">
                Por completar satisfactoriamente el estándar{" "}
                <span className="font-semibold">{certificate.standard}</span> — {certificate.courseTitle} ({certificate.hours}).
              </p>
            </div>

            {/* Pie: firmas + sello */}
            <div className="flex w-full items-end justify-between gap-3">
              {certificate.instructors.map((ins) => (
                <div key={ins.name} className="flex-1 text-center">
                  <p className="font-serif text-xs italic text-foreground sm:text-sm" style={{ fontFamily: "Georgia, serif" }}>
                    {ins.name}
                  </p>
                  <div className="mx-auto mt-1 h-px w-full max-w-[8rem] bg-foreground/40" />
                  <p className="mt-1 text-[8px] leading-tight text-muted sm:text-[10px]">{ins.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sello digital de validez */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center sm:bottom-5">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-50 sm:h-14 sm:w-14">
              <ShieldIcon className="h-6 w-6 text-amber-500 sm:h-7 sm:w-7" />
              <StarIcon className="absolute h-3 w-3 text-amber-600" />
            </span>
          </div>

          {/* Fecha de emisión */}
          <p className="absolute right-4 top-4 text-[8px] text-muted sm:text-[10px]">
            Emitido: {certificate.issueDate}
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Vista previa del certificado oficial · Folio {certificate.folio}
      </figcaption>
    </figure>
  )
}
