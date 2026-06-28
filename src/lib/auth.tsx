import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type User = {
  name: string
  email: string
}

type StoredUser = User & { password: string }

type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => { ok: boolean; error?: string }
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
}

const SESSION_KEY = "emerge.session"
const USERS_KEY = "emerge.users"

// Cuenta de prueba precargada para poder iniciar sesión sin registrarse.
export const DEMO_CREDENTIALS = {
  name: "María",
  email: "alumno@emerge.com",
  password: "demo123",
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as StoredUser[]
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Garantiza que siempre exista la cuenta de prueba para poder iniciar sesión.
    try {
      const users = readUsers()
      if (!users.some((u) => u.email === DEMO_CREDENTIALS.email)) {
        writeUsers([
          ...users,
          {
            name: DEMO_CREDENTIALS.name,
            email: DEMO_CREDENTIALS.email,
            password: DEMO_CREDENTIALS.password,
          },
        ])
      }
    } catch {
      // Ignora errores de almacenamiento (p. ej. modo privado).
    }

    try {
      const session = localStorage.getItem(SESSION_KEY)
      if (session) setUser(JSON.parse(session) as User)
    } catch {
      setUser(null)
    }
    setLoading(false)
  }, [])

  function persistSession(u: User) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(u))
    setUser(u)
  }

  function register(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const users = readUsers()
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "Ya existe una cuenta con este correo." }
    }
    const newUser: StoredUser = { name: name.trim(), email: normalizedEmail, password }
    writeUsers([...users, newUser])
    persistSession({ name: newUser.name, email: newUser.email })
    return { ok: true }
  }

  function login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const users = readUsers()
    const match = users.find((u) => u.email === normalizedEmail)
    if (!match || match.password !== password) {
      return { ok: false, error: "Correo o contraseña incorrectos." }
    }
    persistSession({ name: match.name, email: match.email })
    return { ok: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
