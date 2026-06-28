import { CalendarIcon, MonitorIcon, FileTextIcon, PlusIcon, MinusIcon, TrashIcon, PencilIcon } from "../icons"

export type CartItemData = {
  id: string
  title: string
  module: string
  startDate: string
  modality: string
  unitPrice: number
  quantity: number
}

type CartItemProps = {
  item: CartItemData
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
})

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Miniatura con degradado */}
        <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 sm:w-40">
          <FileTextIcon className="h-10 w-10 text-white/90" />
        </div>

        {/* Detalles */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold leading-snug text-foreground text-pretty">{item.title}</h3>
              <p className="mt-1 text-sm font-medium text-muted">{item.module}</p>
            </div>
            <button
              type="button"
              aria-label={`Eliminar ${item.title}`}
              onClick={() => onRemove(item.id)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-background hover:text-foreground"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>

          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <li className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4" />
              Inicio: {item.startDate}
            </li>
            <li className="flex items-center gap-1.5">
              <MonitorIcon className="h-4 w-4" />
              {item.modality}
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Disminuir cantidad"
                onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                disabled={item.quantity <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition hover:bg-background disabled:opacity-40"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="min-w-[1.5rem] text-center text-base font-bold text-foreground" aria-live="polite">
                {item.quantity}
              </span>
              <button
                type="button"
                aria-label="Aumentar cantidad"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition hover:bg-background"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            <span className="text-xl font-extrabold text-foreground">{currency.format(item.unitPrice)}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-hover"
        >
          <PencilIcon className="h-4 w-4" />
          Editar fechas y horarios
        </button>
      </div>
    </div>
  )
}
