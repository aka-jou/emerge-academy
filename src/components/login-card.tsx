import { type FormEvent, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { GoogleIcon } from "./google-icon"
import { Logo } from "./landing/logo"
import { useAuth } from "../lib/auth"

export function LoginCard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = await login(email, password)
    setSubmitting(false)
    if (result.ok) {
      const from = (location.state as { from?: string } | null)?.from
      // Los administradores tienen su propia área, separada del dashboard de alumnos; si
      // venían de un link específico (from), eso tiene prioridad.
      navigate(from ?? (result.user?.role === "admin" ? "/admin" : "/dashboard"))
    } else {
      setError(result.error ?? "No se pudo iniciar sesión.")
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-[0_4px_24px_rgba(20,83,45,0.08)] sm:p-10">
      {/* Marca */}
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo />
        <h1 className="mt-5 text-pretty text-xl font-semibold text-card-foreground">
          Inicia sesión en tu cuenta
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive"
          >
            {error}
          </p>
        )}
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
            placeholder="tucorreo@ejemplo.com"
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-card-foreground">
              Contraseña
            </label>
            <a href="#" className="text-xs font-medium text-muted transition hover:text-primary">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Iniciando sesión…" : "Iniciar sesión"}
        </button>
      </form>

      {/* Divisor */}
      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted">o</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={() => console.log("[v0] continuar con Google")}
        className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-card-foreground transition hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
      >
        <GoogleIcon className="h-5 w-5" />
        Continuar con Google
      </button>

      <p className="mt-8 text-center text-sm text-muted">
        ¿No tienes cuenta?{" "}
        <Link
          to="/registro"
          state={location.state}
          className="font-semibold text-primary transition hover:text-primary-hover"
        >
          Regístrate aquí
        </Link>
      </p>
    </div>
  )
}
