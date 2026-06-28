type BadgeProps = { className?: string }

function Badge({ label, className }: { label: string; className?: string } & BadgeProps) {
  return (
    <span
      className={`flex h-7 w-11 items-center justify-center rounded-md border border-border bg-card text-[10px] font-bold tracking-tight ${className ?? ""}`}
    >
      {label}
    </span>
  )
}

export function PaymentMethods() {
  return (
    <div className="flex items-center gap-2" aria-label="Métodos de pago aceptados">
      <Badge label="VISA" className="text-[#1a1f71]" />
      <Badge label="MC" className="text-[#eb001b]" />
      <Badge label="AMEX" className="text-[#006fcf]" />
      <Badge label="PayPal" className="text-[#003087]" />
    </div>
  )
}
