import { Link } from "react-router-dom"
import type { Course } from "../../data/courses"

export function EnrolledCourseCard({ course }: { course: Course }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <img src={course.image} alt={course.title} className="h-32 w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit rounded-md bg-muted-surface px-2 py-1 text-xs font-medium text-muted">
          {course.type}
        </span>
        <h3 className="mt-3 text-base font-semibold text-foreground text-pretty">{course.title}</h3>
        <p className="mt-1 text-xs text-muted">{course.standard}</p>

        <div className="mt-4 flex items-center gap-2">
          <Link
            to={`/cursos/${course.id}`}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Ver curso
          </Link>
        </div>
      </div>
    </article>
  )
}
