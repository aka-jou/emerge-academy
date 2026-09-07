import { useCallback, useEffect, useState } from "react"
import { api } from "./api"
import { courseDetails } from "../data/courses"

export type CourseOverview = {
  courseId: string
  title: string
  priceMxn: number
  enrolledCount: number
}

export type CourseStudent = {
  userId: string
  name: string
  email: string
  company: string | null
  completedModulesCount: number
}

// Resumen de todos los cursos con cuántos alumnos distintos los compraron (con orden
// pagada). Usado en el dashboard del administrador.
export function useCoursesOverview() {
  const [overview, setOverview] = useState<CourseOverview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(() => {
    setLoading(true)
    return api
      .get<CourseOverview[]>("/admin/courses-overview")
      .then(setOverview)
      .catch(() => setError("No se pudo cargar el resumen de cursos."))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { overview, loading, error, reload }
}

// Alumnos inscritos en un curso específico, con su progreso real. El porcentaje y si ya se
// certificó (100%) se calculan aquí mismo usando el total de módulos del catálogo del
// frontend (src/data/courses.ts), que es donde vive esa información.
export function useCourseStudents(courseId: string | null) {
  const [students, setStudents] = useState<CourseStudent[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(() => {
    if (!courseId) {
      setStudents([])
      return Promise.resolve()
    }
    setLoading(true)
    return api
      .get<CourseStudent[]>(`/admin/courses/${encodeURIComponent(courseId)}/students`)
      .then(setStudents)
      .catch(() => setError("No se pudo cargar la lista de alumnos."))
      .finally(() => setLoading(false))
  }, [courseId])

  useEffect(() => {
    reload()
  }, [reload])

  const totalModules = courseId ? (courseDetails[courseId]?.modules.length ?? 0) : 0
  const certifiedCount = totalModules > 0 ? students.filter((s) => s.completedModulesCount >= totalModules).length : 0

  return { students, totalModules, certifiedCount, loading, error, reload }
}
