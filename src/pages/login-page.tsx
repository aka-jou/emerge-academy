import { Link } from "react-router-dom"
import { LoginCard } from "../components/login-card"
import { AuthMobileBar, AuthShowcase } from "../components/auth-showcase"

export function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background lg:h-screen lg:overflow-hidden">
      <AuthShowcase />

      {/* El formulario hace scroll por su cuenta si no cabe; el panel de marca queda fijo. */}
      <main className="no-scrollbar flex flex-1 flex-col lg:overflow-y-auto">
        <AuthMobileBar />
        <div className="hidden justify-end px-10 pt-8 lg:flex">
          <Link to="/" className="text-sm font-medium text-muted transition hover:text-primary">
            Volver al inicio
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-10">
          <LoginCard />
        </div>
      </main>
    </div>
  )
}
