import { useState, type FormEvent } from "react"
import { LockIcon, ShieldIcon, CheckIcon } from "../icons"
import { useAuth } from "../../lib/auth"

export function SecurityTab() {
  const { changePassword } = useAuth()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.")
      return
    }
    if (newPassword !== confirm) {
      setError("Las contraseñas nuevas no coinciden.")
      return
    }

    setSubmitting(true)
    const result = await changePassword(currentPassword, newPassword)
    setSubmitting(false)

    if (result.ok) {
      setCurrentPassword("")
      setNewPassword("")
      setConfirm("")
      setUpdated(true)
      setTimeout(() => setUpdated(false), 2500)
    } else {
      setError(result.error ?? "No se pudo actualizar la contraseña.")
    }
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

        {error && (
          <p
            role="alert"
            className="max-w-md rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive"
          >
            {error}
          </p>
        )}

        <div className="grid max-w-md gap-5">
          <div>
            <label htmlFor="current" className="block text-sm font-medium text-foreground">
              Contraseña actual
            </label>
            <div className="relative mt-2">
              <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="current"
                type="password"
                autoComplete="current-password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-3.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
          <div>
            <label htmlFor="next" className="block text-sm font-medium text-foreground">
              Nueva contraseña
            </label>
            <div className="relative mt-2">
              <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="next"
                type="password"
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-3.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-foreground">
              Confirmar nueva contraseña
            </label>
            <div className="relative mt-2">
              <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-3.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CheckIcon className="h-4 w-4" />
            {submitting ? "Actualizando…" : "Actualizar contraseña"}
          </button>
          {updated && <span className="text-sm font-medium text-primary">Contraseña actualizada.</span>}
        </div>
      </form>

      {/* Verificación en dos pasos (próximamente: requiere infraestructura TOTP en el backend) */}
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
