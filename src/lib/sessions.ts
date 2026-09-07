import { useCallback, useEffect, useState } from "react"
import { api, ApiError } from "./api"
import { courses } from "../data/courses"
import type { CalendarEvent } from "../data/calendar"

export type LiveSession = {
  id: string
  courseId: string
  title: string
  scheduledAt: string
  meetingUrl: string
  createdAt: string
}

function courseTitle(courseId: string) {
  return courses.find((c) => c.id === courseId)?.title ?? courseId
}

function toCalendarEvent(session: LiveSession): CalendarEvent {
  const date = new Date(session.scheduledAt)
  return {
    id: session.id,
    date: date.toISOString().slice(0, 10),
    time: date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    title: session.title,
    course: courseTitle(session.courseId),
    location: "Google Meet",
    type: "live",
    meetingUrl: session.meetingUrl,
  }
}

// Calendario del estudiante: sesiones reales de los cursos en los que está inscrito,
// convertidas al formato que ya usa la UI del calendario (ver data/calendar.ts).
export function useMySessions() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(() => {
    setLoading(true)
    return api
      .get<LiveSession[]>("/sessions/me")
      .then((sessions) => setEvents(sessions.map(toCalendarEvent)))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { events, loading, reload }
}

export type CreateSessionInput = {
  courseId: string
  title: string
  scheduledAt: string // ISO
  meetingUrl: string
}

// Panel de administrador: programar/editar/borrar sesiones de un curso. Requiere que el
// usuario autenticado tenga rol "admin" (el backend lo valida igual, esto es solo UX).
export function useAdminSessions(courseId: string) {
  const [sessions, setSessions] = useState<LiveSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(() => {
    if (!courseId) return Promise.resolve()
    setLoading(true)
    return api
      .get<LiveSession[]>(`/sessions?courseId=${encodeURIComponent(courseId)}`)
      .then(setSessions)
      .catch((err) => setError(err instanceof ApiError ? err.message : "No se pudieron cargar las sesiones."))
      .finally(() => setLoading(false))
  }, [courseId])

  useEffect(() => {
    reload()
  }, [reload])

  async function createSession(input: CreateSessionInput) {
    setError(null)
    try {
      await api.post<LiveSession>("/sessions", input)
      await reload()
      return { ok: true as const }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "No se pudo crear la sesión."
      setError(message)
      return { ok: false as const, error: message }
    }
  }

  async function deleteSession(id: string) {
    setError(null)
    try {
      await api.delete<void>(`/sessions/${id}`)
      await reload()
      return { ok: true as const }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "No se pudo eliminar la sesión."
      setError(message)
      return { ok: false as const, error: message }
    }
  }

  return { sessions, loading, error, createSession, deleteSession, reload }
}
