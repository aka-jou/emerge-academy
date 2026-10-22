import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CoursesHeader } from "../components/courses/courses-header"
import { CartItem, type CartItemData } from "../components/cart/cart-item"
import { OrderSummary } from "../components/cart/order-summary"
import { RecommendedCourses } from "../components/cart/recommended-courses"
import { ShoppingCartIcon, ArrowRightIcon } from "../components/icons"
import { useCart, estimateCoursePrice } from "../lib/cart"
import { useAuth } from "../lib/auth"
import { courses } from "../data/courses"

const TAX_RATE = 0.16 // IVA México

export function CartPage() {
  const { items, addItem, removeItem, setQuantity, checkout, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const cartItems: CartItemData[] = useMemo(
    () =>
      items
        .map((line): CartItemData | null => {
          const course = courses.find((c) => c.id === line.courseId)
          if (!course) return null
          return {
            id: course.id,
            title: course.title,
            module: `Módulo: ${course.type}`,
            startDate: course.online ? "En línea" : "A solicitud",
            modality: course.venue,
            unitPrice: estimateCoursePrice(course.duration),
            quantity: line.quantity,
            image: course.image,
          }
        })
        .filter((item): item is CartItemData => item !== null),
    [items],
  )

  const recommendedCourses = useMemo(
    () => courses.filter((c) => !items.some((line) => line.courseId === c.id)).slice(0, 3),
    [items],
  )

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const discount = couponCode === "BIENVENIDA10" ? Math.round(subtotal * 0.1) : 0

  async function handleCheckout() {
    setCheckoutError(null)

    if (!user) {
      navigate("/login", { state: { from: "/carrito" } })
      return
    }
    if (items.length === 0) return

    setSubmitting(true)
    const result = await checkout(couponCode ?? undefined)
    setSubmitting(false)

    if (result.ok) {
      clear()
      // Compra simulada: el pedido queda pagado al instante y el alumno va directo a su
      // dashboard, donde ya ve el curso en "Mis cursos" listo para empezar.
      navigate("/dashboard", { replace: true })
    } else {
      setCheckoutError(result.error)
    }
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

          {cartItems.length === 0 ? (
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
              {/* Columna izquierda: cursos */}
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={setQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              {/* Columna derecha: pago */}
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                taxRate={TAX_RATE}
                onApplyCoupon={(code) => setCouponCode(code)}
                onCheckout={handleCheckout}
                submitting={submitting}
                error={checkoutError}
              />
            </div>
          )}

          {/* Recomendados */}
          <RecommendedCourses courses={recommendedCourses} onAdd={(id) => addItem(id)} />
        </div>
      </main>
    </div>
  )
}
