import { Link, useNavigate } from "react-router-dom"
import type { Course } from "../../data/courses"
import { ClockIcon, GraduationCapIcon, MonitorIcon, CalendarIcon } from "../icons"
import { useCart } from "../../lib/cart"
import { useAuth } from "../../lib/auth"

export function CourseCard({ course }: { course: Course }) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  function handleEnroll() {
    if (!user) {
      // Sin cuenta no se puede comprar: mandamos a iniciar sesión y de ahí de regreso al curso.
      navigate("/login", { state: { from: `/cursos/${course.id}` } })
      return
    }
    addItem(course.id)
    navigate("/carrito")
  }
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md">
      <div className="aspect-[16/10] w-full overflow-hidden bg-muted-surface">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            {course.type}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-500">
            {course.standard}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold leading-snug text-foreground text-balance">{course.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{course.description}</p>

        <ul className="mt-4 flex flex-1 flex-col gap-2.5">
          <li className="flex items-center gap-2.5 text-sm text-foreground">
            <ClockIcon className="h-4 w-4 shrink-0 text-muted" />
            {course.duration}
          </li>
          <li className="flex items-center gap-2.5 text-sm text-foreground">
            <GraduationCapIcon className="h-4 w-4 shrink-0 text-muted" />
            {course.requirement}
          </li>
          <li className="flex items-center gap-2.5 text-sm font-semibold text-primary">
            {course.online ? (
              <MonitorIcon className="h-4 w-4 shrink-0" />
            ) : (
              <CalendarIcon className="h-4 w-4 shrink-0" />
            )}
            {course.venue}
          </li>
        </ul>

        <div className="mt-5 flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleEnroll}
            className="rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            {course.action}
          </button>
          <Link
            to={`/cursos/${course.id}`}
            className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
          >
            Ver temario
          </Link>
        </div>
      </div>
    </article>
  )
}
