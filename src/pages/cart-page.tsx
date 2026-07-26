import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { CoursesHeader } from "../components/courses/courses-header"
import { CartItem, type CartItemData } from "../components/cart/cart-item"
import { OrderSummary } from "../components/cart/order-summary"
import { RecommendedCourses } from "../components/cart/recommended-courses"
import { ShoppingCartIcon, ArrowRightIcon } from "../components/icons"

const initialItems: CartItemData[] = [
  {
    id: "alturas",
    title: "Trabajo Seguro en Alturas",
    module: "Módulo: Seguridad Industrial",
    startDate: "A solicitud",
    modality: "Capacitación en sitio",
    unitPrice: 2450,
    quantity: 1,
  },
]

const recommendedCatalog: Record<string, Omit<CartItemData, "quantity">> = {
  contraincendios: {
    id: "contraincendios",
    title: "Prevención y Combate Contra Incendios",
    module: "Módulo: Protección Civil",
    startDate: "A solicitud",
    modality: "Capacitación en sitio",
    unitPrice: 1200,
  },
  "primeros-auxilios": {
    id: "primeros-auxilios",
    title: "Primeros Auxilios",
    module: "Módulo: Atención Prehospitalaria",
    startDate: "A solicitud",
    modality: "Capacitación en sitio",
    unitPrice: 1800,
  },
  prl: {
    id: "prl",
    title: "PRL (Prevención de Riesgos Laborales)",
    module: "Módulo: Seguridad Industrial",
    startDate: "En línea",
    modality: "En línea",
    unitPrice: 1500,
  },
}

const DISCOUNT = 250
const TAX_RATE = 0.21

export function CartPage() {
  const [items, setItems] = useState<CartItemData[]>(initialItems)

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  )
  const discount = items.length > 0 ? DISCOUNT : 0

  function handleQuantityChange(id: string, quantity: number) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  function handleRemove(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function handleAdd(id: string) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      const course = recommendedCatalog[id]
      if (!course) return prev
      return [...prev, { ...course, quantity: 1 }]
    })
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <CoursesHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link to="/cursos" className="transition hover:text-primary">
              Cursos
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Carrito de compras</span>
          </nav>

          <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            <ShoppingCartIcon className="h-7 w-7 text-primary" />
            Carrito de compras
          </h1>

          {items.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
              <p className="text-base font-medium text-foreground">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-muted">Explora nuestro catálogo de cursos.</p>
              <Link
                to="/cursos"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Ver cursos
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid items-start gap-8 lg:grid-cols-[7fr_4fr]">
              {/* Columna izquierda: productos */}
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              {/* Columna derecha: pago */}
              <OrderSummary subtotal={subtotal} discount={discount} taxRate={TAX_RATE} />
            </div>
          )}

          {/* Sección inferior */}
          <RecommendedCourses onAdd={handleAdd} />
        </div>
      </main>
    </div>
  )
}
