import { useState } from "react"
import { LockIcon, ShieldIcon, CheckIcon } from "../icons"

const passwordFields = [
  { id: "current", label: "Contraseña actual", autoComplete: "current-password" },
  { id: "next", label: "Nueva contraseña", autoComplete: "new-password" },
  { id: "confirm", label: "Confirmar nueva contraseña", autoComplete: "new-password" },
] as const

export function SecurityTab() {
  const [updated, setUpdated] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setUpdated(true)
    setTimeout(() => setUpdated(false), 2500)
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Actualizar contraseña */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">Credenciales de acceso</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Usa una contraseña segura que no utilices en otros servicios.
          </p>
        </div>

        <div className="grid max-w-md gap-5">
          {passwordFields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-foreground">
                {field.label}
              </label>
              <div className="relative mt-2">
                <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id={field.id}
                  name={field.id}
                  type="password"
                  autoComplete={field.autoComplete}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-3.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
          >
            <CheckIcon className="h-4 w-4" />
            Actualizar contraseña
          </button>
          {updated && <span className="text-sm font-medium text-primary">Contraseña actualizada.</span>}
        </div>
      </form>

      {/* Verificación en dos pasos */}
      <div className="rounded-xl border border-border bg-muted-surface p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-foreground">Verificación en dos pasos (2FA)</h3>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted">
                Añade una capa extra de seguridad industrial a tu cuenta. Al iniciar sesión se solicitará un código
                temporal además de tu contraseña.
              </p>
              <p className="mt-2 text-xs font-medium text-foreground">
                Estado:{" "}
                <span className={twoFactor ? "text-primary" : "text-muted"}>
                  {twoFactor ? "Activada" : "Desactivada"}
                </span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTwoFactor((v) => !v)}
            className={
              twoFactor
                ? "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
                : "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
            }
          >
            <ShieldIcon className="h-4 w-4" />
            {twoFactor ? "Desactivar 2FA" : "Activar 2FA"}
          </button>
        </div>
      </div>
    </div>
  )
}
