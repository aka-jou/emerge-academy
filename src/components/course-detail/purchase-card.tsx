import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { CourseDetail } from "../../data/courses"
import { useCart } from "../../lib/cart"
import { useAuth } from "../../lib/auth"
import { useMyCourses } from "../../lib/orders"
import { CourseEquipment } from "./course-equipment"
import { ShoppingCartIcon, ChevronDownIcon, PlusIcon, MinusIcon, CheckIcon, ArrowRightIcon } from "../icons"

export function PurchaseCard({ courseId, detail }: { courseId: string; detail: CourseDetail }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { user } = useAuth()
  const { courses: enrolledCourses, loading: loadingEnrollment } = useMyCourses()
  const navigate = useNavigate()

  const isEnrolled = !!user && enrolledCourses.some((c) => c.id === courseId)

  function requireLoginOrProceed(after: () => void) {
    if (!user) {
      // Sin cuenta no se puede comprar ni agregar al carrito: primero inicia sesión.
      navigate("/login", { state: { from: `/cursos/${courseId}` } })
      return
    }
    after()
  }

  function handleAddToCart() {
    requireLoginOrProceed(() => {
      addItem(courseId, quantity)
      navigate("/carrito")
    })
  }

  function handleBuyNow() {
    requireLoginOrProceed(() => {
      addItem(courseId, quantity)
      navigate("/carrito")
    })
  }

  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-2xl bg-card shadow-[0_28px_60px_-32px_rgba(14,43,33,0.5)] ring-1 ring-border">
        <div aria-hidden="true" className="tape h-2" />
        <div className="p-6">
          <p className="text-xs font-semibold text-muted">Inversión</p>
          <p className="mt-1 font-display text-5xl font-semibold leading-none tracking-tight text-foreground">
            {detail.price}
          </p>
          <p className="mt-2 text-sm text-muted">{detail.priceNote}</p>

          <label className="mt-6 flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">Fecha y sede</span>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-border bg-card py-2.5 pl-3 pr-9 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
                defaultValue={detail.venues[0]}
              >
                {detail.venues.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
          </label>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Participantes</span>
            <div className="flex items-center gap-1 rounded-full bg-background p-1 ring-1 ring-border">
              <button
                type="button"
                aria-label="Disminuir participantes"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition hover:bg-card disabled:opacity-40"
                disabled={quantity <= 1}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span
                className="min-w-[2rem] text-center font-display text-xl font-semibold tabular-nums text-foreground"
                aria-live="polite"
              >
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Aumentar participantes"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition hover:bg-card"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {isEnrolled ? (
            <Link
              to={`/dashboard/curso/${courseId}`}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Ir a mis lecciones
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={loadingEnrollment}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Agregar al carrito
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={loadingEnrollment}
                className="mt-2.5 block w-full rounded-full px-5 py-3 text-center text-sm font-semibold text-foreground ring-1 ring-border transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
              >
                Comprar ahora
              </button>
            </>
          )}
          <a
            href="mailto:contacto@emerge.academy?subject=Cotizaci%C3%B3n%20para%20empresa"
            className="mt-4 block text-center text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
          >
            Cotizar para empresa
          </a>
        </div>
      </div>

      {detail.physicalRequirements.length > 0 && (
        <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
          <h3 className="text-sm font-semibold text-foreground">Requisitos físicos</h3>
          <ul className="mt-3 flex flex-col gap-2.5">
            {detail.physicalRequirements.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <CourseEquipment equipment={detail.equipment} />
    </div>
  )
}
