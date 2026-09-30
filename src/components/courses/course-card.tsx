import { Link, useNavigate } from "react-router-dom"
import type { Course } from "../../data/courses"
import { ArrowRightIcon, CalendarIcon, GraduationCapIcon, MonitorIcon } from "../icons"
import { useCart } from "../../lib/cart"
import { useAuth } from "../../lib/auth"
import { areaStyle, courseLevel, hoursOf } from "../../lib/course-areas"

export function CourseCard({ course, isEnrolled = false }: { course: Course; isEnrolled?: boolean }) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const level = courseLevel(course.id)
  const detailUrl = `/cursos/${course.id}`

  function handleEnroll() {
    if (!user) {
      // Sin cuenta no se puede comprar: mandamos a iniciar sesión y de ahí de regreso al curso.
      navigate("/login", { state: { from: detailUrl } })
      return
    }
    if (isEnrolled) {
      navigate(`/dashboard/curso/${course.id}`)
      return
    }
    addItem(course.id)
    navigate("/carrito")
  }

  return (
    <article
      data-flip-id={course.id}
      style={areaStyle(course.type)}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-shadow duration-500 hover:shadow-[0_22px_45px_-24px_rgba(14,43,33,0.45)]"
    >
      <span aria-hidden="true" className="h-1.5 shrink-0 bg-(--area)" />

      <Link
        to={detailUrl}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/10] overflow-hidden bg-muted-surface"
      >
        <img
          src={course.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute bottom-3 left-3 flex items-baseline gap-0.5 rounded-lg bg-ink/85 px-2.5 py-1.5 font-display text-white backdrop-blur-sm">
          <span className="text-3xl font-semibold leading-none">{hoursOf(course.duration)}</span>
          <span className="text-sm font-medium">h</span>
        </span>
        {isEnrolled && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            Inscrito
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 text-foreground">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-[3px] bg-(--area)" />
            {course.type}
          </span>
          {level && (
            <span className="rounded-full bg-muted-surface px-2 py-0.5 text-muted ring-1 ring-border">{level}</span>
          )}
        </div>

        <h3 className="mt-3 text-balance font-display text-[1.7rem] font-semibold leading-[1.02] tracking-tight text-foreground">
          <Link to={detailUrl} className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{course.description}</p>

        <ul className="mt-4 flex flex-col gap-2 text-xs text-muted">
          <li className="flex items-start gap-2">
            <GraduationCapIcon className="mt-px h-4 w-4 shrink-0" />
            {course.requirement}
          </li>
          <li className="flex items-start gap-2">
            {course.online ? (
              <MonitorIcon className="mt-px h-4 w-4 shrink-0" />
            ) : (
              <CalendarIcon className="mt-px h-4 w-4 shrink-0" />
            )}
            {course.venue}
          </li>
        </ul>

        <div className="mt-auto flex items-center gap-1 pt-6">
          <button
            type="button"
            onClick={handleEnroll}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            {isEnrolled ? "Ir al curso" : course.action}
          </button>
          <Link
            to={detailUrl}
            className="group/link inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
          >
            Ver temario
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
