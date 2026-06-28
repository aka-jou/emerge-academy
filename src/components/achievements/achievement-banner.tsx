import { certificate } from "../../data/dashboard"

// Confeti decorativo sutil: piezas pequeñas posicionadas de forma fija sobre el banner.
const confetti = [
  { left: "6%", top: "18%", color: "bg-amber-300", size: "h-2 w-2", rotate: "rotate-12" },
  { left: "14%", top: "62%", color: "bg-card", size: "h-1.5 w-3", rotate: "-rotate-12" },
  { left: "22%", top: "30%", color: "bg-emerald-200", size: "h-2 w-2", rotate: "rotate-45" },
  { left: "33%", top: "75%", color: "bg-amber-300", size: "h-1.5 w-1.5", rotate: "rotate-6" },
  { left: "44%", top: "16%", color: "bg-card", size: "h-2 w-2", rotate: "-rotate-45" },
  { left: "58%", top: "70%", color: "bg-emerald-200", size: "h-1.5 w-3", rotate: "rotate-12" },
  { left: "67%", top: "26%", color: "bg-amber-300", size: "h-2 w-2", rotate: "-rotate-6" },
  { left: "78%", top: "60%", color: "bg-card", size: "h-1.5 w-1.5", rotate: "rotate-45" },
  { left: "88%", top: "34%", color: "bg-emerald-200", size: "h-2 w-2", rotate: "-rotate-12" },
  { left: "94%", top: "70%", color: "bg-amber-300", size: "h-1.5 w-3", rotate: "rotate-6" },
]

export function AchievementBanner() {
  return (
    <section
      aria-label="Felicitación por certificación completada"
      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary via-primary to-emerald-700 px-6 py-8 shadow-sm sm:px-10 sm:py-10"
    >
      {/* Confeti decorativo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {confetti.map((c, i) => (
          <span
            key={i}
            className={`absolute rounded-sm opacity-70 ${c.color} ${c.size} ${c.rotate}`}
            style={{ left: c.left, top: c.top }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <img
          src="/images/gold-medal.png"
          alt="Medalla dorada de certificación"
          className="h-24 w-24 shrink-0 drop-shadow-lg sm:h-28 sm:w-28"
        />
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full bg-card/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
            Certificación desbloqueada · 100% completado
          </span>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-primary-foreground text-balance sm:text-3xl">
            ¡Felicidades, has completado con éxito tu certificación!
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-foreground/85">
            Has cumplido el 100% de los módulos y evaluaciones del {certificate.courseTitle}. Tu credencial{" "}
            {certificate.standard} ya está disponible para descargar y compartir.
          </p>
        </div>
      </div>
    </section>
  )
}
