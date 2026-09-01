import { useState } from "react"
import { LockIcon, ShieldIcon, FileTextIcon, CheckIcon } from "../icons"
import { PaymentMethods } from "./payment-methods"

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
})

type OrderSummaryProps = {
  subtotal: number
  discount: number
  taxRate: number
  onApplyCoupon: (code: string) => void
  onCheckout: () => void
  submitting: boolean
  error: string | null
}

export function OrderSummary({
  subtotal,
  discount,
  taxRate,
  onApplyCoupon,
  onCheckout,
  submitting,
  error,
}: OrderSummaryProps) {
  const [coupon, setCoupon] = useState("")
  const taxable = subtotal - discount
  const taxes = taxable * taxRate
  const total = taxable + taxes

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-foreground">Resumen del pedido</h2>

      <dl className="mt-5 flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-medium text-foreground">{currency.format(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <dt className="text-muted">Descuento</dt>
            <dd className="font-semibold text-primary">-{currency.format(discount)}</dd>
          </div>
        )}
        <div className="flex items-center justify-between">
          <dt className="text-muted">Impuestos (IVA {Math.round(taxRate * 100)}%)</dt>
          <dd className="font-medium text-foreground">{currency.format(taxes)}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-border pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-base font-bold text-foreground">Total</span>
          <span className="text-2xl font-extrabold text-primary">{currency.format(total)}</span>
        </div>
      </div>

      {/* Cupón */}
      <div className="mt-5 flex flex-col gap-1.5">
        <div className="flex gap-2">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Código de cupón"
            aria-label="Código de cupón"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
          <button
            type="button"
            onClick={() => onApplyCoupon(coupon.trim().toUpperCase())}
            className="shrink-0 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
          >
            Aplicar
          </button>
        </div>
        <p className="text-xs text-muted">Prueba el código BIENVENIDA10 para 10% de descuento.</p>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={onCheckout}
        disabled={submitting}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LockIcon className="h-5 w-5" />
        {submitting ? "Procesando pago…" : `Proceder al pago - ${currency.format(total)}`}
      </button>

      {/* Pie */}
      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
        <PaymentMethods />
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <ShieldIcon className="h-4 w-4 text-primary" />
          Pago 100% seguro
        </p>
        <ul className="flex flex-col gap-2 text-xs text-muted">
          <li className="flex items-center gap-2">
            <CheckIcon className="h-3.5 w-3.5 text-primary" />
            Cancelación gratuita hasta 7 días antes del inicio
          </li>
          <li className="flex items-center gap-2">
            <FileTextIcon className="h-3.5 w-3.5 text-primary" />
            Factura disponible (CFDI 4.0)
          </li>
        </ul>
      </div>
    </div>
  )
}
