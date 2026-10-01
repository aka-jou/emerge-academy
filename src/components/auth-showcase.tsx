import { useRef } from "react"
import { Link } from "react-router-dom"
import { Logo } from "./landing/logo"
import { courses } from "../data/courses"
import { AREAS, areaStyle } from "../lib/course-areas"
import { gsap, useGSAP } from "../lib/gsap"

// Fotos más ligeras del catálogo, repartidas en tres columnas que se desplazan en bucle.
const PHOTO_IDS = [
  "primeros-auxilios",
  "loto",
  "manejo-cargas",
  "comandante-emergencias",
  "espacios-confinados",
  "contraincendios",
  "rcp",
  "torque-tension",
  "mando-unico",
  "prl",
  "brigadas-teorico",
  "sustancias-quimicas",
]
const photos = PHOTO_IDS.map((id) => courses.find((c) => c.id === id)).filter((c) => c !== undefined)
const columns = [photos.slice(0, 4), photos.slice(4, 8), photos.slice(8, 12)]

/** Panel de marca para login y registro: mosaico de cursos en movimiento y mensaje. */
export function AuthShowcase() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Columnas alternas suben y bajan; el contenido va duplicado para que el bucle no tenga corte.
        q("[data-marquee]").forEach((track, i) => {
          const up = i % 2 === 0
          gsap.fromTo(
            track,
            { yPercent: up ? 0 : -50 },
            { yPercent: up ? -50 : 0, duration: 50 + i * 8, ease: "none", repeat: -1 },
          )
        })

        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q("[data-show='col']"), { autoAlpha: 0, y: 80, duration: 1.6, stagger: 0.12 })
          .from(q("[data-show='line']"), { yPercent: 110, duration: 1.1, stagger: 0.1 }, 0.25)
          .from(q("[data-show='tape']"), { scaleX: 0, duration: 1.3, ease: "expo.inOut" }, 0.3)
          .from(q("[data-show='fade']"), { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.08 }, 0.6)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <aside ref={root} className="relative hidden overflow-hidden bg-ink text-white lg:flex lg:w-[52%] lg:flex-col">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-3 gap-3 px-3 [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)]"
      >
        {columns.map((column, i) => (
          <div key={i} data-show="col" className="overflow-hidden">
            <div data-marquee className="flex flex-col">
              {[...column, ...column].map((course, j) => (
                <div key={`${course.id}-${j}`} className="pb-3" style={areaStyle(course.type)}>
                  <figure className="relative overflow-hidden rounded-xl">
                    <img src={course.image} alt="" className="aspect-[3/4] w-full object-cover" />
                    <span className="absolute inset-x-0 top-0 h-1 bg-(--area)" />
                  </figure>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/30" />

      <div className="relative z-10 flex flex-1 flex-col justify-between p-10 xl:p-14">
        <Link to="/" data-show="fade" aria-label="Universidad Emerge inicio" className="self-start">
          <Logo dark />
        </Link>

        <div>
          <h2 className="font-display text-6xl font-semibold uppercase leading-[0.9] tracking-tight xl:text-7xl">
            <span className="block overflow-hidden">
              <span data-show="line" className="block">
                Capacitamos hoy,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-show="line" className="block">
                protegemos
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-show="line" className="block text-white/40">
                siempre.
              </span>
            </span>
          </h2>
          <p data-show="fade" className="mt-6 max-w-md text-pretty leading-relaxed text-white/70">
            Certificaciones en seguridad industrial, protección civil y atención de emergencias para
            el sector energético, industrial y de la construcción en México.
          </p>
          <ul data-show="fade" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white/75">
            {AREAS.map((area) => (
              <li key={area.type} className="flex items-center gap-2" style={areaStyle(area.type)}>
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-[3px] bg-(--area)" />
                {area.type}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-show="tape" aria-hidden="true" className="tape relative z-10 h-3 shrink-0 origin-left" />
    </aside>
  )
}

/** Franja de marca para pantallas pequeñas, donde el panel no cabe. */
export function AuthMobileBar() {
  return (
    <div className="bg-ink lg:hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <Link to="/" aria-label="Universidad Emerge inicio">
          <Logo dark />
        </Link>
        <Link to="/" className="text-sm font-medium text-white/70 transition hover:text-white">
          Volver al inicio
        </Link>
      </div>
      <div aria-hidden="true" className="tape h-2.5" />
    </div>
  )
}
