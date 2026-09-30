import { useRef } from "react"
import { Link } from "react-router-dom"
import { CheckIcon } from "../icons"
import { countUp, gsap, useGSAP } from "../../lib/gsap"

const pillars = [
  "Seguridad Industrial",
  "Protección Civil",
  "Atención Prehospitalaria",
  "Gestión de Emergencias",
]

const PROGRAMS = 20

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const programs = useRef<HTMLSpanElement>(null)

  // Secuencia de entrada: titular línea por línea, la foto se abre y el contador sube.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.from("[data-hero='badge']", { autoAlpha: 0, y: 12, duration: 0.6 })
          .from(
            "[data-hero='line']",
            { yPercent: 115, duration: 1.1, stagger: 0.12, ease: "expo.out" },
            "-=0.35",
          )
          .fromTo(
            "[data-hero='media']",
            { clipPath: "inset(18% 10% 18% 10% round 1rem)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 1rem)",
              duration: 1.4,
              ease: "expo.inOut",
              clearProps: "clipPath",
            },
            0.2,
          )
          .from("[data-hero='media'] img", { scale: 1.25, duration: 1.6, ease: "expo.out" }, "<")
          .from("[data-hero='fade']", { autoAlpha: 0, y: 18, duration: 0.8, stagger: 0.07 }, 0.6)
          .from("[data-hero='stat']", { autoAlpha: 0, y: 20, duration: 0.7 }, 1.1)

        if (programs.current) tl.add(countUp(programs.current, PROGRAMS), "<")
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-24 lg:pt-36">
        <div>
          <span
            data-hero="badge"
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
          >
            Respaldados por Grupo Emerge RM
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-[#0F3D2E] sm:text-5xl">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero="line" className="block">
                Universidad Emerge
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero="line" className="block text-muted">
                Capacitación especializada
              </span>
            </span>
          </h1>
          <p
            data-hero="fade"
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            Formamos profesionales, brigadistas y equipos de respuesta para empresas privadas,
            organismos públicos y gobiernos municipales del sureste de México, con capacitación
            basada en escenarios reales e instructores certificados.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <li
                key={pillar}
                data-hero="fade"
                className="flex items-center gap-2.5 text-sm font-medium text-foreground"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {pillar}
              </li>
            ))}
          </ul>

          <div data-hero="fade" className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/cursos"
              className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Ver cursos
            </Link>
            <a
              href="#fechas"
              className="rounded-full border border-border bg-card px-6 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-background"
            >
              Cursos destacados
            </a>
          </div>
        </div>

        <div className="relative">
          <div
            data-hero="media"
            className="overflow-hidden rounded-2xl border border-border shadow-[0_12px_40px_rgba(20,83,45,0.12)]"
          >
            <img
              src="/images/courses/alturas.jpg"
              alt="Brigadista de Universidad Emerge en una práctica de trabajo seguro en alturas"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-hero="stat"
            className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card px-5 py-3 shadow-lg sm:block"
          >
            <p className="text-2xl font-extrabold tabular-nums text-primary">
              <span ref={programs}>{PROGRAMS}</span>+
            </p>
            <p className="text-xs font-medium text-muted">programas de capacitación</p>
          </div>
        </div>
      </div>
    </section>
  )
}
