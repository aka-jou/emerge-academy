import { Link } from "react-router-dom"
import { RegisterCard } from "../components/register-card"

export function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <RegisterCard />
      <Link to="/" className="mt-6 text-sm font-medium text-muted transition hover:text-primary">
        ← Volver al inicio
      </Link>
    </main>
  )
}
