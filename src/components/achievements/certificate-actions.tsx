import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { DownloadIcon, LinkedinIcon, ShieldIcon, CopyIcon, CheckIcon } from "../icons"
import { certificate } from "../../data/dashboard"

export function CertificateActions() {
  const [copied, setCopied] = useState(false)

  function copySerial() {
    navigator.clipboard?.writeText(certificate.serialNumber).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => setCopied(false),
    )
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-foreground">Tu credencial</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Descarga tu certificado oficial o compártelo con empleadores y dependencias.
        </p>
      </div>

      {/* Botones principales apilados */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
        >
          <DownloadIcon className="h-5 w-5" />
          Descargar certificado en PDF (Alta resolución)
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
        >
          <LinkedinIcon className="h-5 w-5 text-[#0a66c2]" />
          Compartir credencial en LinkedIn
        </button>
      </div>

      {/* Verificación de autenticidad */}
      <div className="rounded-xl border border-border bg-muted-surface p-4">
        <div className="flex items-center gap-2">
          <ShieldIcon className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Verificación de autenticidad</h3>
        </div>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-3">
            <QRCodeSVG
              value={certificate.verifyUrl}
              size={104}
              level="M"
              bgColor="#ffffff"
              fgColor="#1a3a2a"
              aria-label="Código QR de verificación del certificado"
            />
            <span className="mt-2 text-[10px] font-medium text-muted">Folio QR único</span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs leading-relaxed text-muted">
              Las empresas y dependencias oficiales pueden escanear este código QR para validar en línea las
              competencias del egresado y la vigencia de la certificación.
            </p>

            <dl className="mt-3 space-y-2 text-left">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">Folio</dt>
                <dd className="font-mono text-sm font-semibold text-foreground">{certificate.folio}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                  Número de serie de validación
                </dt>
                <dd className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-2.5 py-1.5">
                  <span className="font-mono text-xs text-foreground">{certificate.serialNumber}</span>
                  <button
                    type="button"
                    onClick={copySerial}
                    className="inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-1 text-xs font-medium text-primary transition hover:bg-muted-surface"
                    aria-label="Copiar número de serie"
                  >
                    {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    {copied ? "Copiado" : "Copiar"}
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Verificación disponible en{" "}
          <span className="font-medium text-foreground">verifica.emergeacademy.mx</span> · Válido del{" "}
          {certificate.issueDate} al {certificate.expiryDate}.
        </p>
      </div>
    </div>
  )
}
