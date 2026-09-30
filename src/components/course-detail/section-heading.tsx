import type { ReactNode } from "react"

export function SectionHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-balance font-display text-4xl font-semibold leading-none tracking-tight text-foreground sm:text-5xl"
    >
      {children}
    </h2>
  )
}
