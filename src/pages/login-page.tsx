import { Link } from "react-router-dom"
import { LoginCard } from "../components/login-card"

export function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <LoginCard />
      <Link to="/" className="mt-6 text-sm font-medium text-muted transition hover:text-primary">
        ← Volver al inicio
      </Link>
    </main>
  )
}
