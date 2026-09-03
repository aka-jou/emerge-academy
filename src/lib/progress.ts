import { useCallback, useEffect, useState } from "react"
import { api } from "./api"

export type CourseProgress = {
  courseId: string
  completedModules: number[]
}

// Progreso real de TODOS los cursos del usuario (para el dashboard: banner de progreso
// global, tarjetas de "Cursos activos" y gate de certificados en Logros).
export function useAllProgress() {
  const [progress, setProgress] = useState<CourseProgress[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(() => {
    setLoading(true)
    return api
      .get<CourseProgress[]>("/progress/me")
      .then(setProgress)
      .catch(() => setProgress([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { progress, loading, reload }
}

// Progreso de UN curso en particular, con función para marcar/desmarcar un módulo.
// Solo funciona si el usuario ya compró el curso (el backend lo valida igual).
export function useCourseProgress(courseId: string) {
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(() => {
    setLoading(true)
    return api
      .get<CourseProgress[]>("/progress/me")
      .then((all) => {
        const mine = all.find((p) => p.courseId === courseId)
        setCompletedModules(mine?.completedModules ?? [])
      })
      .catch(() => setError("No se pudo cargar tu progreso."))
      .finally(() => setLoading(false))
  }, [courseId])

  useEffect(() => {
    reload()
  }, [reload])

  async function setModuleCompleted(moduleNumber: number, completed: boolean) {
    setError(null)
    try {
      const result = await api.patch<CourseProgress>(`/progress/me/${courseId}`, {
        moduleNumber,
        completed,
      })
      setCompletedModules(result.completedModules)
      return { ok: true as const }
    } catch {
      setError("No se pudo guardar tu avance. Intenta de nuevo.")
      return { ok: false as const }
    }
  }

  return { completedModules, loading, error, setModuleCompleted, reload }
}
