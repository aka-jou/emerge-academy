import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api, ApiError, getToken, setToken } from "./api"

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  industry?: string
  rfc?: string
  cityCountry?: string
}

type UpdateProfileInput = Partial<
  Pick<User, "name" | "phone" | "company" | "jobTitle" | "industry" | "rfc" | "cityCountry">
>

export type RegisterInput = {
  name: string
  email: string
  password: string
  company: string
  phone: string
  jobTitle?: string
  industry?: string
  rfc?: string
}

type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  register: (data: RegisterInput) => Promise<{ ok: boolean; error?: string }>
  updateProfile: (data: UpdateProfileInput) => Promise<{ ok: boolean; error?: string }>
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function extractErrorMessage(err: unknown, fallback: string) {
  if (err instanceof ApiError) return err.message || fallback
  return fallback
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      const token = getToken()
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const me = await api.get<User>("/users/me")
        setUser(me)
      } catch {
        // El token venció o es inválido: cerramos sesión localmente.
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadSession()
  }, [])

  async function register(data: RegisterInput) {
    try {
      const result = await api.post<{ accessToken: string; user: User }>("/auth/register", data)
      setToken(result.accessToken)
      setUser(result.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: extractErrorMessage(err, "No se pudo crear la cuenta.") }
    }
  }

  async function login(email: string, password: string) {
    try {
      const result = await api.post<{ accessToken: string; user: User }>("/auth/login", { email, password })
      setToken(result.accessToken)
      setUser(result.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: extractErrorMessage(err, "No se pudo iniciar sesión.") }
    }
  }

  async function updateProfile(data: UpdateProfileInput) {
    try {
      const updated = await api.patch<User>("/users/me", data)
      setUser(updated)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: extractErrorMessage(err, "No se pudo actualizar el perfil.") }
    }
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    try {
      await api.post<void>("/users/me/password", { currentPassword, newPassword })
      return { ok: true }
    } catch (err) {
      return { ok: false, error: extractErrorMessage(err, "No se pudo actualizar la contraseña.") }
    }
  }

  function logout() {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, updateProfile, changePassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
