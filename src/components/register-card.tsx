import { type FormEvent, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Logo } from "./landing/logo"
import { useAuth } from "../lib/auth"

const INDUSTRIES = [
  "Energía eólica",
  "Energía solar",
  "Industrial / Manufactura",
  "Construcción",
  "Oil & Gas",
  "Otro",
]

export function RegisterCard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { register } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [phone, setPhone] = useState("")
  const [industry, setIndustry] = useState("")
  const [rfc, setRfc] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      return
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.")
      return
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Ingresa un teléfono de contacto válido (mínimo 10 dígitos).")
      return
    }
    if (!acceptedTerms) {
      setError("Debes aceptar el aviso de privacidad y los términos y condiciones.")
      return
    }

    setSubmitting(true)
    const result = await register({
      name,
      email,
      password,
      company,
      phone,
      jobTitle: jobTitle || undefined,
      industry: industry || undefined,
      rfc: rfc || undefined,
    })
    setSubmitting(false)

    if (result.ok) {
      const from = (location.state as { from?: string } | null)?.from
      navigate(from ?? "/dashboard")
    } else {
      setError(result.error ?? "No se pudo crear la cuenta.")
    }
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-[0_4px_24px_rgba(20,83,45,0.08)] sm:p-10">
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo />
        <h1 className="mt-5 text-pretty text-xl font-semibold text-card-foreground">Crea tu cuenta empresarial</h1>
        <p className="mt-2 text-sm text-muted">
          Registra a tu empresa para certificar a tu personal en seguridad industrial
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive"
          >
            {error}
          </p>
        )}

        {/* Datos del responsable de la cuenta */}
        <fieldset className="flex flex-col gap-4">
          <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
            Datos del responsable de la cuenta
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-card-foreground">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="María Pérez"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="jobTitle" className="text-sm font-medium text-card-foreground">
                Puesto en la empresa
                <span className="ml-1 font-normal text-muted">(opcional)</span>
              </label>
              <input
                id="jobTitle"
                type="text"
                autoComplete="organization-title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Coordinador de Seguridad e Higiene"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-card-foreground">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@empresa.com"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-card-foreground">
                Teléfono de contacto
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="961 123 4567"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
        </fieldset>

        {/* Datos de la empresa */}
        <fieldset className="flex flex-col gap-4 border-t border-border pt-5">
          <legend className="text-xs font-semibold uppercase tracking-wide text-muted">Datos de la empresa</legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-sm font-medium text-card-foreground">
                Empresa / Razón social
              </label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Grupo Emerge RM"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="industry" className="text-sm font-medium text-card-foreground">
                Sector
                <span className="ml-1 font-normal text-muted">(opcional)</span>
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
              >
                <option value="">Selecciona un sector</option>
                {INDUSTRIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:w-1/2 sm:pr-2">
            <label htmlFor="rfc" className="text-sm font-medium text-card-foreground">
              RFC de la empresa
              <span className="ml-1 font-normal text-muted">(opcional, para tu factura)</span>
            </label>
            <input
              id="rfc"
              type="text"
              value={rfc}
              onChange={(e) => setRfc(e.target.value.toUpperCase())}
              placeholder="EME010101AB1"
              maxLength={13}
              className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm uppercase text-card-foreground outline-none transition placeholder:normal-case placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </fieldset>

        {/* Contraseña */}
        <fieldset className="flex flex-col gap-4 border-t border-border pt-5">
          <legend className="text-xs font-semibold uppercase tracking-wide text-muted">Seguridad de la cuenta</legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-card-foreground">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirm" className="text-sm font-medium text-card-foreground">
                Confirmar contraseña
              </label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
        </fieldset>

        <label className="flex items-start gap-2.5 text-sm text-muted">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span>
            He leído y acepto el{" "}
            <a href="#aviso-privacidad" className="font-medium text-primary hover:text-primary-hover">
              Aviso de Privacidad
            </a>{" "}
            y los{" "}
            <a href="#terminos" className="font-medium text-primary hover:text-primary-hover">
              Términos y Condiciones
            </a>{" "}
            de Universidad Emerge.
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creando cuenta…" : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        ¿Ya tienes cuenta?{" "}
        <Link
          to="/login"
          state={location.state}
          className="font-semibold text-primary transition hover:text-primary-hover"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}
