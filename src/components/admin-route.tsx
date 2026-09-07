import { type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../lib/auth"

export function AdminRoute({ children }: { children: ReactNode }) {
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

  // Sin permisos de administrador: lo mandamos al dashboard normal, no al login (sí tiene
  // sesión, solo no puede ver este panel). El backend valida esto de nuevo en cada endpoint.
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
