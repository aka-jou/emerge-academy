import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard/dashboard-header"
import { PageLoader } from "../components/page-loader"
import { ArrowRightIcon, PlayIcon, ShoppingCartIcon, FileTextIcon } from "../components/icons"
import { courses } from "../data/courses"
import type { Order } from "../lib/cart"
import { useMyOrders } from "../lib/orders"
import { useAuth } from "../lib/auth"

const money = new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function fmt(value: number) {
  return `$${money.format(value)}`
}

// Resumen de compra con estilo de ticket impreso. Llega con la orden recién creada por
// navigation state (desde el carrito) o, si se recarga o se abre desde el historial de
// pagos, la busca por id (?orden=...) entre las órdenes del usuario.
export function ThankYouPage() {
  const location = useLocation()
  const [params] = useSearchParams()
  const stateOrder = (location.state as { order?: Order; justPurchased?: boolean } | null)?.order
  const justPurchased = Boolean((location.state as { justPurchased?: boolean } | null)?.justPurchased)
  const orderId = params.get("orden")
  const { orders, loading } = useMyOrders()

  const order = stateOrder ?? (orderId ? orders.find((o) => o.id === orderId || o.folio === orderId) : undefined)

  if (!order) {
    if (orderId && loading) return <PageLoader label="Cargando ticket…" />
    return <Navigate to="/dashboard" replace />
  }

  return <TicketView order={order} justPurchased={justPurchased} />
}

function TicketView({ order, justPurchased }: { order: Order; justPurchased: boolean }) {
  const { user } = useAuth()
  const date = new Date(order.createdAt)
  const taxable = order.subtotalMxn - order.discountMxn
  const taxes = order.totalMxn - taxable
  const units = order.items.reduce((sum, item) => sum + item.quantity, 0)
  const firstCourseId = order.items[0]?.courseId

  const lines = order.items.map((item) => ({
    ...item,
    title: item.course?.title ?? courses.find((c) => c.id === item.courseId)?.title ?? item.courseId,
  }))

  return (
    <div className="flex min-h-full flex-col bg-background">
      <div className="print:hidden">
        <DashboardHeader />
      </div>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 py-8 sm:py-12">
        <div className="text-center print:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {justPurchased ? "Compra realizada" : "Comprobante de compra"}
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground text-balance sm:text-3xl">
            {justPurchased ? "¡Tu inscripción está confirmada!" : `Ticket ${order.folio}`}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {justPurchased
              ? "Aquí está tu ticket. Tus cursos ya están disponibles en tu dashboard."
              : "Resumen de tu compra en Universidad Emerge."}
          </p>
        </div>

        {/* Impresora: el ticket "sale" de la ranura al cargar la página. */}
        <div className="mt-8 w-full max-w-[22rem] print:mt-0">
          <div aria-hidden="true" className="relative z-10 mx-auto h-3 w-[calc(100%+1.25rem)] -translate-x-2.5 rounded-full bg-ink shadow-[0_6px_10px_-4px_rgba(0,0,0,0.5)] print:hidden" />
          <div className="-mt-1.5 overflow-hidden px-1 pb-6 drop-shadow-[0_10px_14px_rgb(14_43_33/0.18)] print:overflow-visible print:p-0 print:drop-shadow-none">
            <article
              aria-label="Ticket de compra"
              className="ticket-paper ticket-print animate-ticket-print relative font-ticket text-[13px] leading-[1.45] text-[#1d1d1b]"
            >
              <div className="px-5 pb-4 pt-6">
                <header className="text-center">
                  <img
                    src="/images/logo-emerge.png"
                    alt=""
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 object-contain grayscale contrast-125"
                  />
                  <p className="mt-2 text-base font-bold tracking-[0.15em]">UNIVERSIDAD EMERGE</p>
                  <p className="text-xs uppercase">Grupo Emerge RM</p>
                  <p className="text-xs">Capacitación certificada</p>
                </header>

                <Rule />

                <dl className="grid grid-cols-[auto_1fr] gap-x-3">
                  <dt>FOLIO:</dt>
                  <dd className="text-right font-bold">{order.folio}</dd>
                  <dt>FECHA:</dt>
                  <dd className="text-right">
                    {date.toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </dd>
                  <dt>HORA:</dt>
                  <dd className="text-right">
                    {date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: false })}
                  </dd>
                  {user?.name && (
                    <>
                      <dt>CLIENTE:</dt>
                      <dd className="min-w-0 break-words text-right uppercase">{user.name}</dd>
                    </>
                  )}
                </dl>

                <Rule />

                <div className="flex justify-between text-xs font-bold">
                  <span>CANT DESCRIPCIÓN</span>
                  <span>IMPORTE</span>
                </div>
                <Rule light />

                <ul className="flex flex-col gap-2">
                  {lines.map((line) => (
                    <li key={line.courseId}>
                      <p className="uppercase">
                        <span className="mr-2 inline-block w-5">{line.quantity}</span>
                        {line.title}
                      </p>
                      <p className="flex justify-between pl-7 text-xs">
                        <span>
                          {line.quantity} x {fmt(line.unitPriceMxn)}
                        </span>
                        <span className="text-[13px]">{fmt(line.unitPriceMxn * line.quantity)}</span>
                      </p>
                    </li>
                  ))}
                </ul>

                <Rule />

                <dl className="grid grid-cols-[1fr_auto] gap-x-3">
                  <dt>SUBTOTAL</dt>
                  <dd className="text-right">{fmt(order.subtotalMxn)}</dd>
                  {order.discountMxn > 0 && (
                    <>
                      <dt>DESCUENTO{order.couponCode ? ` (${order.couponCode})` : ""}</dt>
                      <dd className="text-right">-{fmt(order.discountMxn)}</dd>
                    </>
                  )}
                  <dt>IVA {Math.round(order.taxRate * 100)}%</dt>
                  <dd className="text-right">{fmt(taxes)}</dd>
                </dl>

                <div className="mt-2 flex items-baseline justify-between border-y-2 border-double border-[#1d1d1b] py-1.5 text-lg font-bold">
                  <span>TOTAL</span>
                  <span>{fmt(order.totalMxn)} MXN</span>
                </div>

                <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-3 text-xs">
                  <dt>ARTÍCULOS:</dt>
                  <dd className="text-right">{units}</dd>
                  <dt>FORMA DE PAGO:</dt>
                  <dd className="text-right">PAGO EN LÍNEA</dd>
                  <dt>ESTATUS:</dt>
                  <dd className="text-right font-bold">{order.status === "paid" ? "PAGADO" : "CANCELADO"}</dd>
                </dl>

                <Rule />

                <p className="text-center text-xs leading-relaxed">
                  TU FACTURA (CFDI 4.0) SE ENVÍA
                  <br />
                  AL CORREO DE TU CUENTA.
                </p>

                <Barcode value={order.folio} />
                <p className="mt-1 text-center text-xs tracking-[0.3em]">{order.folio}</p>

                <p className="mt-4 text-center font-bold tracking-wider">¡GRACIAS POR SU COMPRA!</p>
                <p className="text-center text-xs">CONSERVE ESTE TICKET</p>
                <p className="mt-2 text-center text-xs">*** ACCESO INMEDIATO A SUS CURSOS ***</p>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-2 flex w-full flex-col gap-3 print:hidden">
          {firstCourseId && (
            <Link
              to={`/dashboard/curso/${firstCourseId}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
            >
              <PlayIcon className="h-4 w-4" />
              Comenzar mi curso
            </Link>
          )}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
            >
              <FileTextIcon className="h-4 w-4" />
              Imprimir
            </button>
            <Link
              to="/cursos"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card whitespace-nowrap px-3 py-3 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              Seguir comprando
            </Link>
          </div>
          <Link
            to="/dashboard"
            className="mt-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-muted transition hover:text-foreground"
          >
            Ir a mi dashboard
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  )
}

function Rule({ light = false }: { light?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`my-3 border-t-2 border-dashed ${light ? "border-[#1d1d1b]/30" : "border-[#1d1d1b]/70"}`}
    />
  )
}

// Código de barras decorativo generado a partir del folio (siempre el mismo para el mismo folio).
function Barcode({ value }: { value: string }) {
  const bars: number[] = []
  for (const char of `*${value}*`) {
    const code = char.charCodeAt(0)
    for (let i = 0; i < 5; i++) bars.push(((code >> i) & 1) + 1, ((code >> (i + 1)) & 1) + 1)
  }
  let x = 0
  const rects = bars.map((w, i) => {
    const rect = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={44} /> : null
    x += w
    return rect
  })
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${x} 44`}
      preserveAspectRatio="none"
      className="mx-auto mt-4 h-12 w-full max-w-[15rem] fill-[#1d1d1b]"
    >
      {rects}
    </svg>
  )
}
