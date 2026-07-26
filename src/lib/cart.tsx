import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type CartLine = {
  courseId: string
  quantity: number
}

type CartContextValue = {
  items: CartLine[]
  count: number
  addItem: (courseId: string, quantity?: number) => void
  removeItem: (courseId: string) => void
  setQuantity: (courseId: string, quantity: number) => void
  isInCart: (courseId: string) => boolean
  clear: () => void
}

const CART_KEY = "emerge.cart"
const CartContext = createContext<CartContextValue | null>(null)

function readCart(): CartLine[] {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as CartLine[]
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(() => readCart())

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch {
      // Ignora errores de almacenamiento (p. ej. modo privado).
    }
  }, [items])

  function addItem(courseId: string, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((line) => line.courseId === courseId)
      if (existing) {
        return prev.map((line) =>
          line.courseId === courseId ? { ...line, quantity: line.quantity + quantity } : line,
        )
      }
      return [...prev, { courseId, quantity }]
    })
  }

  function removeItem(courseId: string) {
    setItems((prev) => prev.filter((line) => line.courseId !== courseId))
  }

  function setQuantity(courseId: string, quantity: number) {
    setItems((prev) =>
      prev.map((line) => (line.courseId === courseId ? { ...line, quantity: Math.max(1, quantity) } : line)),
    )
  }

  function isInCart(courseId: string) {
    return items.some((line) => line.courseId === courseId)
  }

  function clear() {
    setItems([])
  }

  const count = items.reduce((sum, line) => sum + line.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, addItem, removeItem, setQuantity, isInCart, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}

/**
 * Precio de demostración calculado a partir de la duración del curso.
 * Reemplazar por precios reales del catálogo cuando exista backend/pricing.
 */
const DEMO_RATE_MXN_PER_HOUR = 300

export function estimateCoursePrice(durationLabel: string): number {
  const hours = parseInt(durationLabel, 10) || 0
  return hours * DEMO_RATE_MXN_PER_HOUR
}
