import { useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { CoursesHeader } from "../components/courses/courses-header"
import { PurchaseCard } from "../components/course-detail/purchase-card"
import { CourseObjective } from "../components/course-detail/course-objective"
import { CourseSyllabus } from "../components/course-detail/course-syllabus"
import { Prerequisites, PpeRequirements, StandardsList } from "../components/course-detail/course-safety"
import { EvaluationCriteria } from "../components/course-detail/evaluation-criteria"
import { CourseReferences } from "../components/course-detail/course-references"
import { courseDetails, courses, type CourseDetail } from "../data/courses"
import { areaStyle, courseLevel, courseModality } from "../lib/course-areas"
import { countUp, gsap, useGSAP } from "../lib/gsap"
import { ChevronRightIcon } from "../components/icons"

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const detail = id ? courseDetails[id] : undefined

  if (!id || !detail) {
    return (
      <div className="flex min-h-full flex-col bg-background">
        <CoursesHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
            <h1 className="font-display text-5xl font-semibold text-foreground">Curso no encontrado</h1>
            <p className="mt-3 text-sm text-muted">El curso que buscas no existe o fue movido.</p>
            <Link
              to="/cursos"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Ver todos los cursos
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return <CourseDetailContent key={id} id={id} detail={detail} />
}

function CourseDetailContent({ id, detail }: { id: string; detail: CourseDetail }) {
  const root = useRef<HTMLDivElement>(null)
  const course = courses.find((c) => c.id === id)
  const area = course?.type ?? "Seguridad Industrial"
  const hours = detail.modules.reduce((sum, m) => sum + m.hours, 0)
  const lessons = detail.modules.reduce((sum, m) => sum + m.lessons, 0)

  const plate: { label: string; value: number | string; unit?: string }[] = [
    { label: "Duración", value: hours, unit: "h" },
    { label: "Módulos", value: detail.modules.length },
    { label: "Lecciones", value: lessons },
    { label: "Nivel", value: courseLevel(id) ?? "Básico" },
    { label: "Modalidad", value: courseModality(id) ?? "Presencial" },
  ]

  // Entrada: título, foto que se abre, cinta que se tiende y cifras de la placa que suben.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } })
        tl.from("[data-anim='title']", { autoAlpha: 0, y: 40, duration: 1.1 })
          .from("[data-anim='fade']", { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.15)
          .fromTo(
            "[data-anim='media']",
            { clipPath: "inset(0% 0% 100% 0% round 1rem)" },
            { clipPath: "inset(0% 0% 0% 0% round 1rem)", duration: 1.3, ease: "expo.inOut", clearProps: "clipPath" },
            0.1,
          )
          .from("[data-anim='media'] img", { scale: 1.25, duration: 1.6 }, 0.1)
          .from("[data-anim='tape']", { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, 0.4)
          .from("[data-anim='plate']", { autoAlpha: 0, y: 30, duration: 0.9 }, 0.6)

        gsap.utils.toArray<HTMLElement>("[data-count]", root.current).forEach((el) => {
          tl.add(countUp(el, Number(el.dataset.count), { duration: 1.2 }), 0.8)
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} style={areaStyle(area)} className="flex min-h-full flex-col bg-background">
      <CoursesHeader />

      <section className="relative bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-10">
          <div className="min-w-0">
            <nav aria-label="Ruta" className="flex items-center gap-1.5 text-sm text-white/55">
              <Link to="/cursos" className="transition hover:text-white">
                Cursos
              </Link>
              <ChevronRightIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate text-white/85">{detail.title}</span>
            </nav>

            <p
              data-anim="fade"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/[0.08] py-1 pl-1 pr-3 text-xs font-semibold text-white/85"
            >
              <span aria-hidden="true" className="h-5 w-5 rounded-full bg-(--area)" />
              {area}
            </p>

            <h1
              data-anim="title"
              className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            >
              {detail.title}
            </h1>
            <p data-anim="fade" className="mt-6 max-w-xl text-pretty leading-relaxed text-white/70">
              {detail.description}
            </p>

            <div data-anim="fade" className="mt-8 flex flex-wrap gap-3">
              <a
                href="#temario"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent/85"
              >
                Ver temario
              </a>
              <a
                href="#inscripcion"
                className="rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10"
              >
                Inscribirme
              </a>
            </div>
          </div>

          <div data-anim="media" className="relative overflow-hidden rounded-2xl">
            <img src={detail.image} alt={detail.title} className="aspect-[4/3] w-full object-cover" />
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-(--area)" />
          </div>
        </div>

        <div data-anim="tape" aria-hidden="true" className="tape h-4 origin-left" />
      </section>

      <section aria-label="Ficha técnica" className="relative z-10 mx-auto -mt-9 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-anim="plate" className="relative">
          <dl
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border shadow-[0_24px_50px_-30px_rgba(14,43,33,0.55)] ring-1 ring-border sm:grid-cols-5"
          >
            {plate.map((cell) => (
              <div key={cell.label} className="bg-card px-5 py-5 last:col-span-2 sm:px-6 sm:last:col-span-1">
                <dt className="text-xs font-semibold text-muted">{cell.label}</dt>
                <dd className="mt-2 font-display font-semibold leading-none text-foreground">
                  {typeof cell.value === "number" ? (
                    <span className="text-5xl tabular-nums">
                      <span data-count={cell.value}>{cell.value}</span>
                      {cell.unit && <span className="ml-1 text-2xl text-muted">{cell.unit}</span>}
                    </span>
                  ) : (
                    <span className="text-3xl">{cell.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {["left-2.5 top-2.5", "right-2.5 top-2.5", "bottom-2.5 left-2.5", "bottom-2.5 right-2.5"].map((pos) => (
            <span key={pos} aria-hidden="true" className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-border`} />
          ))}
        </div>
      </section>

      <main className="flex-1">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:px-8 lg:py-20">
          <div className="flex min-w-0 flex-col gap-16">
            <CourseObjective objective={detail.objective} instructor={detail.instructor} />
            <Prerequisites items={detail.prerequisites} />
            <CourseSyllabus modules={detail.modules} />
            <PpeRequirements items={detail.ppeRequirements} />
            <EvaluationCriteria criteria={detail.evaluationCriteria} note={detail.evaluationNote} />
            <StandardsList standards={detail.standards} />
            <CourseReferences references={detail.references} />
          </div>

          <aside id="inscripcion" className="scroll-mt-20">
            <PurchaseCard courseId={id} detail={detail} />
          </aside>
        </div>
      </main>
    </div>
  )
}
