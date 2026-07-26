import { type FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "./landing/logo"
import { useAuth } from "../lib/auth"

export function RegisterCard() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
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

    const result = register(name, email, password)
    if (result.ok) {
      navigate("/dashboard")
    } else {
      setError(result.error ?? "No se pudo crear la cuenta.")
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-[0_4px_24px_rgba(20,83,45,0.08)] sm:p-10">
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo />
        <h1 className="mt-5 text-pretty text-xl font-semibold text-card-foreground">Crea tu cuenta</h1>
        <p className="mt-2 text-sm text-muted">Empieza tu formación en seguridad hoy mismo</p>
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

        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring/40"
        >
          Crear cuenta
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="font-semibold text-primary transition hover:text-primary-hover">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}
