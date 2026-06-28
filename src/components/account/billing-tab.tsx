import { DownloadIcon, FileTextIcon } from "../icons"
import { invoices } from "../../data/account"

export function BillingTab() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-foreground">Historial de pagos y facturación</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Consulta y descarga los comprobantes de tus capacitaciones para control de gastos personales y empresariales.
        </p>
      </div>

      {/* Tabla de datos */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted-surface text-left">
                <th className="px-4 py-3 font-semibold text-foreground">ID de Factura / Orden</th>
                <th className="px-4 py-3 font-semibold text-foreground">Fecha de compra</th>
                <th className="px-4 py-3 font-semibold text-foreground">Curso certificado</th>
                <th className="px-4 py-3 font-semibold text-foreground">Método de pago</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Monto total</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border last:border-0 transition hover:bg-muted-surface/60">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{invoice.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{invoice.date}</td>
                  <td className="px-4 py-3 text-foreground">{invoice.course}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{invoice.method}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-foreground">
                    {invoice.amount}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted-surface"
                        aria-label={`Descargar recibo de la factura ${invoice.id}`}
                      >
                        <DownloadIcon className="h-3.5 w-3.5" />
                        Descargar Recibo
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted-surface"
                        aria-label={`Bajar factura XML/PDF de la factura ${invoice.id}`}
                      >
                        <FileTextIcon className="h-3.5 w-3.5" />
                        Bajar Factura XML/PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted">
        ¿Necesitas una factura con datos fiscales específicos? Escríbenos a{" "}
        <span className="font-medium text-foreground">facturacion@emergeacademy.mx</span> con tu ID de orden.
      </p>
    </div>
  )
}
