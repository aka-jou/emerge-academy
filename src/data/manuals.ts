import { useEffect, useState } from "react"

// Contenido del Manual del Participante de cada curso, extraído de los manuales oficiales de
// Universidad Emerge y repartido por módulo del curso. Cada manual vive en su propio JSON
// (src/data/manuals/<courseId>.json) y se carga bajo demanda solo cuando el alumno abre el
// curso, para no inflar el bundle principal.
//
// Se omiten a propósito las secciones de evaluación, claves de respuesta, autoevaluaciones y
// formatos para firmar: esas partes ya existen en la plataforma como cuestionarios y fichas.

export type ManualBlock =
  | { t: "h"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }

export type ManualSection = {
  title: string
  blocks: ManualBlock[]
}

export type CourseManual = {
  courseId: string
  title: string
  code: string | null
  intro: ManualBlock[]
  modules: Record<string, ManualSection[]>
}

const loaders = import.meta.glob<CourseManual>("./manuals/*.json", { import: "default" })

function loaderFor(courseId: string) {
  return loaders[`./manuals/${courseId}.json`]
}

export function hasManual(courseId: string) {
  return Boolean(loaderFor(courseId))
}

export function useCourseManual(courseId: string) {
  const [manual, setManual] = useState<CourseManual | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = loaderFor(courseId)
    setManual(null)
    if (!load) {
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    load()
      .then((data) => {
        if (!cancelled) setManual(data)
      })
      .catch(() => {
        if (!cancelled) setManual(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [courseId])

  return { manual, loading }
}
