export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${dark ? "bg-white p-1" : ""}`}
      >
        <img
          src="/images/logo-emerge.png"
          alt="Universidad Emerge"
          className="h-full w-full object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-tight ${dark ? "text-white" : "text-foreground"}`}>
          EMERGE
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-white/60" : "text-primary"}`}>
          Universidad
        </span>
      </span>
    </span>
  )
}
