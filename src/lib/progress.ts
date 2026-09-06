import { useCallback, useEffect, useState } from "react"
import { api, ApiError } from "./api"

export type CourseProgress = {
  courseId: string
  completedModules: number[]
  moduleScores: Record<string, number>
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

// Progreso de UN curso en particular, con funciones para marcar/desmarcar un módulo sin
// cuestionario, o enviar el resultado de un cuestionario de módulo. Solo funciona si el
// usuario ya compró el curso, y respeta el bloqueo secuencial (el backend lo valida igual).
export function useCourseProgress(courseId: string) {
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [moduleScores, setModuleScores] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(() => {
    setLoading(true)
    return api
      .get<CourseProgress[]>("/progress/me")
      .then((all) => {
        const mine = all.find((p) => p.courseId === courseId)
        setCompletedModules(mine?.completedModules ?? [])
        setModuleScores(mine?.moduleScores ?? {})
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
      setModuleScores(result.moduleScores)
      return { ok: true as const }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo guardar tu avance. Intenta de nuevo.")
      return { ok: false as const }
    }
  }

  async function submitQuiz(moduleNumber: number, score: number, passingScore: number) {
    setError(null)
    try {
      const result = await api.post<CourseProgress & { passed: boolean }>(`/progress/me/${courseId}/quiz`, {
        moduleNumber,
        score,
        passingScore,
      })
      setCompletedModules(result.completedModules)
      setModuleScores(result.moduleScores)
      return { ok: true as const, passed: result.passed }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo enviar tu cuestionario. Intenta de nuevo.")
      return { ok: false as const, passed: false }
    }
  }

  return { completedModules, moduleScores, loading, error, setModuleCompleted, submitQuiz, reload }
}
