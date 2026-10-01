import { type FormEvent, type KeyboardEvent, type ReactNode, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { GoogleIcon } from "./google-icon"
import { ArrowRightIcon, CheckIcon, EyeIcon, EyeOffIcon } from "./icons"
import { useAuth } from "../lib/auth"
import { gsap, useGSAP } from "../lib/gsap"

type Status = "idle" | "submitting" | "success"

const inputClass =
  "h-12 w-full rounded-xl bg-card px-4 text-sm text-foreground ring-1 ring-border outline-none transition placeholder:text-muted focus:ring-2 focus:ring-primary/35"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Campo con una barra que se extiende bajo el input al enfocarlo. */
function Field({ id, label, aside, children }: { id: string; label: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <div data-login className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {aside}
      </div>
      <div className="group relative">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out group-focus-within:scale-x-100"
        />
      </div>
    </div>
  )
}

export function LoginCard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState<Status>("idle")
  const [showPassword, setShowPassword] = useState(false)
  const [capsLock, setCapsLock] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const form = useRef<HTMLFormElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-login]", { autoAlpha: 0, y: 22, duration: 0.9, stagger: 0.07, ease: "expo.out", delay: 0.2 })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  function shakeForm() {
    if (!form.current || prefersReducedMotion()) return
    gsap.to(form.current, { keyframes: { x: [0, -10, 8, -6, 4, 0] }, duration: 0.45, ease: "power1.out" })
  }

  function checkCapsLock(e: KeyboardEvent<HTMLInputElement>) {
    setCapsLock(e.getModifierState("CapsLock"))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setStatus("submitting")
    const result = await login(email, password)
    if (result.ok) {
      setStatus("success")
      const from = (location.state as { from?: string } | null)?.from
      // Los administradores tienen su propia área, separada del dashboard de alumnos; si
      // venían de un link específico (from), eso tiene prioridad.
      const target = from ?? (result.user?.role === "admin" ? "/admin" : "/dashboard")
      window.setTimeout(() => navigate(target), prefersReducedMotion() ? 0 : 550)
    } else {
      setStatus("idle")
      setError(result.error ?? "No se pudo iniciar sesión.")
      setAttempt((n) => n + 1)
      shakeForm()
    }
  }

  return (
    <div ref={root} className="w-full max-w-sm">
      <h1
        data-login
        className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl"
      >
        Bienvenido de vuelta
      </h1>
      <p data-login className="mt-4 text-pretty leading-relaxed text-muted">
        Entra para continuar tus cursos, descargar tus certificados y ver tus próximas sesiones.
      </p>

      <form ref={form} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
        {error && (
          <p
            key={attempt}
            role="alert"
            className="flex items-start gap-3 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive ring-1 ring-destructive/25 animate-[alert-in_0.35s_ease-out]"
          >
            <span aria-hidden="true" className="mt-0.5 h-4 w-1 shrink-0 rounded-full bg-destructive" />
            {error}
          </p>
        )}

        <Field id="email" label="Correo electrónico">
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className={inputClass}
          />
        </Field>

        <Field
          id="password"
          label="Contraseña"
          aside={
            <a href="#" className="text-xs font-medium text-muted transition hover:text-primary">
              ¿Olvidaste tu contraseña?
            </a>
          }
        >
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={checkCapsLock}
            onKeyUp={checkCapsLock}
            onBlur={() => setCapsLock(false)}
            placeholder="••••••••"
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={showPassword}
            className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition hover:bg-background hover:text-foreground"
          >
            {showPassword ? <EyeOffIcon className="h-[18px] w-[18px]" /> : <EyeIcon className="h-[18px] w-[18px]" />}
          </button>
        </Field>
        {capsLock && (
          <p role="status" className="-mt-2 text-xs font-medium text-[#8a6a00]">
            Bloq Mayús está activado.
          </p>
        )}

        <button
          data-login
          type="submit"
          disabled={status !== "idle"}
          className={`group relative mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${
            status === "success"
              ? "bg-accent text-accent-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary-hover"
          }`}
        >
          {status === "submitting" && <span aria-hidden="true" className="stripes-busy absolute inset-0" />}
          <span className="relative flex items-center gap-2">
            {status === "success" ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Listo
              </>
            ) : status === "submitting" ? (
              "Verificando…"
            ) : (
              <>
                Iniciar sesión
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
        <p className="sr-only" aria-live="polite">
          {status === "submitting" ? "Verificando tus datos" : status === "success" ? "Sesión iniciada" : ""}
        </p>
      </form>

      <div data-login className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted">o</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* El wrapper lleva la animación: la clase `transition` del botón interfiere con GSAP. */}
      <div data-login>
        <button
          type="button"
          onClick={() => console.log("[v0] continuar con Google")}
          className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-card text-sm font-medium text-foreground ring-1 ring-border transition hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <GoogleIcon className="h-5 w-5" />
          Continuar con Google
        </button>
      </div>

      <p data-login className="mt-8 text-sm text-muted">
        ¿No tienes cuenta?{" "}
        <Link
          to="/registro"
          state={location.state}
          className="font-semibold text-primary underline-offset-4 transition hover:underline"
        >
          Regístrate aquí
        </Link>
      </p>
    </div>
  )
}
