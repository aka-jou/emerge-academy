import type { CSSProperties } from "react"
import { courseDetails, type CourseType } from "../data/courses"

type Area = { type: CourseType; color: string; ink: string }

/** Áreas de formación con su color de señalización y el color de texto legible encima. */
export const AREAS: Area[] = [
  { type: "Seguridad Industrial", color: "var(--color-sign-yellow)", ink: "#1d1c17" },
  { type: "Protección Civil", color: "var(--color-sign-red)", ink: "#ffffff" },
  { type: "Atención Prehospitalaria", color: "var(--color-sign-green)", ink: "#ffffff" },
  { type: "Gestión de Emergencias", color: "var(--color-sign-blue)", ink: "#ffffff" },
]

/** Expone el color del área como --area / --area-ink para usar bg-(--area), text-(--area-ink). */
export function areaStyle(type: CourseType): CSSProperties {
  const area = AREAS.find((a) => a.type === type) ?? AREAS[0]
  return { "--area": area.color, "--area-ink": area.ink } as CSSProperties
}

export type Level = "Básico" | "Intermedio" | "Avanzado"
export const LEVELS: Level[] = ["Básico", "Intermedio", "Avanzado"]

export function courseLevel(id: string) {
  return courseDetails[id]?.specs.find((s) => s.icon === "graduation")?.label as Level | undefined
}

export function courseModality(id: string) {
  return courseDetails[id]?.specs.find((s) => s.icon === "users")?.label
}

/** "16 horas" → 16 */
export function hoursOf(duration: string) {
  return Number.parseInt(duration, 10) || 0
}
