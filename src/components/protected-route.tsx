import { type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../lib/auth"

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-sm font-medium text-muted">Cargando…</span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
