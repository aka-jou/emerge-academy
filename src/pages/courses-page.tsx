import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { CoursesHeader } from "../components/courses/courses-header"
import { CourseFilters } from "../components/courses/course-filters"
import { CourseCard } from "../components/courses/course-card"
import { EnterpriseBanner } from "../components/courses/enterprise-banner"
import { courses, type CourseType } from "../data/courses"
import { useMyCourses } from "../lib/orders"
import { AREAS, areaStyle, courseLevel, hoursOf, type Level } from "../lib/course-areas"
import { Flip, gsap, useGSAP } from "../lib/gsap"

const DURATIONS = [...new Set(courses.map((c) => c.duration))].sort((a, b) => hoursOf(a) - hoursOf(b))

function normalize(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function CoursesPage() {
  const { courses: enrolledCourses } = useMyCourses()
  const enrolledIds = useMemo(() => new Set(enrolledCourses.map((c) => c.id)), [enrolledCourses])
  const [searchParams] = useSearchParams()

  const [area, setArea] = useState<CourseType | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const [duration, setDuration] = useState<string | null>(null)
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "")

  const visible = useMemo(() => {
    const search = normalize(query.trim())
    return courses.filter(
      (c) =>
        (!area || c.type === area) &&
        (!level || courseLevel(c.id) === level) &&
        (!duration || c.duration === duration) &&
        (!search || normalize(`${c.title} ${c.description} ${c.type}`).includes(search)),
    )
  }, [area, level, duration, query])

  const hasFilters = Boolean(area || level || duration || query)
  const root = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const flipState = useRef<Flip.FlipState | null>(null)

  // Guarda la posición de cada tarjeta antes de filtrar para animar el reacomodo.
  function withFlip(change: () => void) {
    if (grid.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(grid.current.querySelectorAll("[data-flip-id]"))
    }
    change()
  }

  useLayoutEffect(() => {
    const state = flipState.current
    if (!state || !grid.current) return
    flipState.current = null
    Flip.from(state, {
      targets: grid.current.querySelectorAll("[data-flip-id]"),
      duration: 0.6,
      ease: "power3.inOut",
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.2, stagger: 0.04, ease: "power3.out" },
        ),
    })
  }, [visible])

  // Entrada del encabezado: el titular sube línea por línea, la cinta se tiende y aparecen las áreas.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from("[data-anim='line']", { yPercent: 110, duration: 1.1, stagger: 0.1 })
          .from("[data-anim='fade']", { autoAlpha: 0, y: 16, duration: 0.8 }, 0.3)
          .from("[data-anim='tape']", { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, 0.2)
          .from("[data-anim='area']", { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.07 }, 0.6)
          .from("[data-flip-id]", { autoAlpha: 0, y: 32, duration: 0.9, stagger: 0.05 }, 0.8)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  function clearFilters() {
    withFlip(() => {
      setArea(null)
      setLevel(null)
      setDuration(null)
      setQuery("")
    })
  }

  return (
    <div ref={root} className="flex min-h-full flex-col bg-background">
      <CoursesHeader showSearch={false} />

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pb-12 lg:pt-16">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
            <h1 className="font-display text-6xl font-semibold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="block overflow-hidden">
                <span data-anim="line" className="block">
                  Capacitación
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-anim="line" className="block">
                  que se practica
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-anim="line" className="block text-white/40">
                  en campo.
                </span>
              </span>
            </h1>
            <div data-anim="fade" className="max-w-sm lg:pb-3">
              <p className="text-pretty leading-relaxed text-white/75">
                {courses.length} cursos certificados en cuatro áreas. Filtra por área, nivel o
                duración para encontrar el que necesita tu equipo.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Cada área lleva un color inspirado en la señalización de seguridad NOM-026-STPS.
              </p>
            </div>
          </div>

          <div data-anim="tape" aria-hidden="true" className="tape mt-10 h-4 origin-left rounded-[2px]" />

          <div role="group" aria-label="Filtrar por área" className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {AREAS.map((a) => {
              const active = area === a.type
              const count = courses.filter((c) => c.type === a.type).length
              return (
                <button
                  key={a.type}
                  type="button"
                  data-anim="area"
                  aria-pressed={active}
                  onClick={() => withFlip(() => setArea(active ? null : a.type))}
                  style={areaStyle(a.type)}
                  className={`relative overflow-hidden rounded-xl p-4 pt-6 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5 sm:pt-7 ${
                    active ? "bg-(--area) text-(--area-ink)" : "bg-white/[0.06] text-white hover:bg-white/[0.11]"
                  }`}
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-(--area)" />
                  <span className="block font-display text-5xl font-semibold leading-none tabular-nums">
                    {count}
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-tight">{a.type}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-20 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <CourseFilters
            query={query}
            onQueryChange={(v) => withFlip(() => setQuery(v))}
            level={level}
            onLevelChange={(v) => withFlip(() => setLevel(v))}
            duration={duration}
            onDurationChange={(v) => withFlip(() => setDuration(v))}
            durations={DURATIONS}
            total={courses.length}
            shown={visible.length}
            onClear={clearFilters}
            hasFilters={hasFilters}
          />
        </div>
      </div>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div ref={grid} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((course) => (
              <CourseCard key={course.id} course={course} isEnrolled={enrolledIds.has(course.id)} />
            ))}
          </div>

          {visible.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
              <p className="font-display text-3xl font-semibold text-foreground">
                Ningún curso coincide con esos filtros
              </p>
              <p className="mt-2 text-sm text-muted">Prueba con otra área, nivel o duración.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Quitar filtros
              </button>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <EnterpriseBanner />
        </div>
      </main>
    </div>
  )
}
