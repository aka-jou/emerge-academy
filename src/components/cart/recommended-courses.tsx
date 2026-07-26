import { PlusIcon, ClockIcon } from "../icons"
import type { Course } from "../../data/courses"
import { estimateCoursePrice } from "../../lib/cart"

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
})

type RecommendedCoursesProps = {
  courses: Course[]
  onAdd: (id: string) => void
}

export function RecommendedCourses({ courses, onAdd }: RecommendedCoursesProps) {
  if (courses.length === 0) return null

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-bold text-foreground">Cursos recomendados</h2>
      <p className="mt-1 text-sm text-muted">Complementa tu certificación añadiéndolos al carrito.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-background p-3"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-16 w-16 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-foreground">{course.title}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <ClockIcon className="h-3.5 w-3.5" />
                {course.duration}
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">
                {currency.format(estimateCoursePrice(course.duration))}
              </p>
            </div>
            <button
              type="button"
              aria-label={`Añadir ${course.title} al carrito`}
              onClick={() => onAdd(course.id)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-hover"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
