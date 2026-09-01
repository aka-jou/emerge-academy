import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api, ApiError } from "./api"

export type CartLine = {
  courseId: string
  quantity: number
}

export type OrderItem = {
  courseId: string
  quantity: number
  unitPriceMxn: number
  course?: { id: string; title: string; image: string }
}

export type Order = {
  id: string
  folio: string
  subtotalMxn: number
  discountMxn: number
  taxRate: number
  totalMxn: number
  couponCode?: string
  status: "paid" | "cancelled"
  items: OrderItem[]
  createdAt: string
}

type CheckoutResult = { ok: true; order: Order } | { ok: false; error: string }

type CartContextValue = {
  items: CartLine[]
  count: number
  addItem: (courseId: string, quantity?: number) => void
  removeItem: (courseId: string) => void
  setQuantity: (courseId: string, quantity: number) => void
  isInCart: (courseId: string) => boolean
  clear: () => void
  checkout: (couponCode?: string) => Promise<CheckoutResult>
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

  // Checkout real contra el backend: crea la orden (pago simulado, se confirma
  // de inmediato) y deja al usuario inscrito en los cursos comprados.
  async function checkout(couponCode?: string): Promise<CheckoutResult> {
    try {
      const order = await api.post<Order>("/orders", {
        items: items.map((line) => ({ courseId: line.courseId, quantity: line.quantity })),
        couponCode: couponCode || undefined,
      })
      return { ok: true, order }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "No se pudo procesar tu compra. Intenta de nuevo."
      return { ok: false, error: message }
    }
  }

  const count = items.reduce((sum, line) => sum + line.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, count, addItem, removeItem, setQuantity, isInCart, clear, checkout }}
    >
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
 * Precio estimado para mostrar en el carrito antes de pagar (misma tarifa usada
 * para sembrar el catálogo real en el backend). El precio que realmente se cobra
 * es el que calcula el servidor a partir de `Course.priceMxn` en la base de datos,
 * no este valor del cliente.
 */
const DEMO_RATE_MXN_PER_HOUR = 300

export function estimateCoursePrice(durationLabel: string): number {
  const hours = parseInt(durationLabel, 10) || 0
  return hours * DEMO_RATE_MXN_PER_HOUR
}
