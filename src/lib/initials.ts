// Iniciales para el avatar por defecto: primera letra de las dos primeras palabras del
// nombre (ej. "María Fernanda González" -> "MF"). Si solo hay una palabra, usa solo esa letra.
export function getInitials(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return "?"
  if (words.length === 1) return words[0].charAt(0).toUpperCase()
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
}
