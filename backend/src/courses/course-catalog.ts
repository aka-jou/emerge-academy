import coursesSeed from "../database/courses-seed.json"

// Tarifa de referencia por hora de capacitación (MXN, antes de IVA).
const RATE_MXN_PER_HOUR = 300

type CatalogCourse = {
  id: string
  type: string
  standard: string
  title: string
  description: string
  duration: string
  requirement: string
  venue: string
  online?: boolean
  action: string
  image: string
}

export function estimatePrice(duration: string): number {
  const hours = parseInt(duration, 10) || 0
  return hours * RATE_MXN_PER_HOUR
}

// Catálogo oficial de cursos, listo para guardarse en la base de datos (con precio).
// Lo usan tanto el arranque del backend como el script `npm run seed`.
export function getCatalogCourses() {
  return (coursesSeed as CatalogCourse[]).map((item) => ({
    ...item,
    online: item.online ?? false,
    priceMxn: estimatePrice(item.duration),
  }))
}
