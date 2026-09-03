import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { CourseDetail } from "../../data/courses"
import { useCart } from "../../lib/cart"
import { useAuth } from "../../lib/auth"
import { CourseEquipment } from "./course-equipment"
import { EvaluationCriteria } from "./evaluation-criteria"
import {
  ShoppingCartIcon,
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  HardHatIcon,
  ShieldIcon,
  CertificateIcon,
} from "../icons"

function RequirementCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PurchaseCard({ courseId, detail }: { courseId: string; detail: CourseDetail }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

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
      <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Fecha y sede</span>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border border-border bg-card py-2.5 pl-3 pr-9 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
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

        <div className="mt-4 flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Cantidad</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Disminuir cantidad"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition hover:bg-background disabled:opacity-40"
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="min-w-[2rem] text-center text-lg font-bold text-foreground" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Aumentar cantidad"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition hover:bg-background"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          Agregar al carrito
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="mt-2.5 block w-full rounded-lg border border-border bg-transparent px-5 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-background"
        >
          Comprar ahora
        </button>
        <button
          type="button"
          className="mt-4 w-full text-center text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
        >
          Cotizar para empresa
        </button>
      </div>

      <RequirementCard title="Requisitos físicos" items={detail.physicalRequirements} />

      <CourseEquipment equipment={detail.equipment} />

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <HardHatIcon className="h-4 w-4 text-primary" />
          Equipo de protección personal (EPP)
        </h3>
        <ul className="mt-3 flex flex-col gap-2.5">
          {detail.ppeRequirements.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <EvaluationCriteria criteria={detail.evaluationCriteria} note={detail.evaluationNote} />

      <div className="rounded-xl border border-border bg-muted-surface p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <ShieldIcon className="h-4 w-4 text-primary" />
          Normativas que cubre
        </h3>
        <ul className="mt-3 flex flex-col gap-3">
          {detail.standards.map((std) => (
            <li key={std.code} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
                <CertificateIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{std.code}</span>
                <span className="block text-xs text-muted">{std.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
