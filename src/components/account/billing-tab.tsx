import { FileTextIcon } from "../icons"
import { useMyOrders } from "../../lib/orders"

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
})

export function BillingTab() {
  const { orders, loading, error } = useMyOrders()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-foreground">Historial de pagos y facturación</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Consulta tus órdenes de compra reales. Emitimos la factura fiscal (CFDI 4.0) por correo tras cada pago.
        </p>
      </div>

      {loading && <p className="text-sm text-muted">Cargando historial…</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="rounded-xl border border-border bg-muted-surface/50 p-4 text-sm text-muted">
          Aún no tienes compras registradas.
        </p>
      )}

      {!loading && orders.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted-surface text-left">
                  <th className="px-4 py-3 font-semibold text-foreground">Folio de orden</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Fecha de compra</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Curso(s)</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Estado</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Monto total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 transition hover:bg-muted-surface/60">
                    <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{order.folio}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {new Date(order.createdAt).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {order.items.map((item) => item.course?.title ?? item.courseId).join(", ")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        {order.status === "paid" ? "Pagado" : "Cancelado"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-foreground">
                      {currency.format(order.totalMxn)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="flex items-center gap-2 text-xs leading-relaxed text-muted">
        <FileTextIcon className="h-3.5 w-3.5" />
        ¿Necesitas una factura con datos fiscales específicos? Escríbenos a{" "}
        <span className="font-medium text-foreground">facturacion@emergeacademy.mx</span> con tu folio de orden.
      </p>
    </div>
  )
}
