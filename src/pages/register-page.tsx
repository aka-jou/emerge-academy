import { Link } from "react-router-dom"
import { RegisterCard } from "../components/register-card"

export function RegisterPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Formulario: si es más largo que la pantalla, hace scroll de forma independiente. */}
      <main className="flex h-screen flex-1 flex-col items-center justify-center overflow-y-auto bg-background px-4 py-10">
        <RegisterCard />
        <Link to="/" className="mt-6 text-sm font-medium text-muted transition hover:text-primary">
          ← Volver al inicio
        </Link>
      </main>

      {/* Imagen enmarcada y fija: no hace scroll ni se mueve al desplazar el formulario. */}
      <div className="hidden shrink-0 items-center justify-center bg-muted-surface p-8 lg:flex lg:w-[45%]">
        <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-xl">
          <img
            src="/images/parque-eolico.jpg"
            alt="Parque eólico al atardecer, representando la industria de energías renovables"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-primary/10" />
          <div className="relative z-10 flex h-full flex-col justify-end p-10">
            <h2 className="max-w-md text-pretty text-3xl font-bold leading-tight text-primary-foreground">
              Capacitamos hoy, protegemos siempre
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/90">
              Certificaciones en seguridad industrial para el personal del sector energético,
              industrial y de la construcción en México.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
