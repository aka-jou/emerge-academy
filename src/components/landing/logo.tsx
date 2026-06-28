import { WindIcon } from "../icons"

export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <WindIcon className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-tight ${dark ? "text-white" : "text-foreground"}`}>
          EMERGE
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Academy</span>
      </span>
    </span>
  )
}
