import { useEffect, useState } from "react"
import { api } from "./api"
import type { Order } from "./cart"
import type { Course } from "../data/courses"

// Historial real de compras del usuario autenticado (reemplaza los datos
// de ejemplo que vivían en src/data/account.ts).
export function useMyOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await api.get<Order[]>("/orders/me")
        if (!cancelled) setOrders(data)
      } catch {
        if (!cancelled) setError("No se pudo cargar tu historial de compras.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { orders, loading, error }
}

// Cursos a los que el usuario tiene acceso por haber pagado una orden real
// (reemplaza el array activeCourses hardcodeado de src/data/dashboard.ts).
export function useMyCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await api.get<Course[]>("/orders/me/courses")
        if (!cancelled) setCourses(data)
      } catch {
        if (!cancelled) setError("No se pudieron cargar tus cursos.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { courses, loading, error }
}
