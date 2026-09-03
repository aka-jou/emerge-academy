import { Link } from "react-router-dom"
import type { Course } from "../../data/courses"
import { courseDetails } from "../../data/courses"
import type { CourseProgress } from "../../lib/progress"

export function EnrolledCourseCard({ course, progress }: { course: Course; progress: CourseProgress[] }) {
  const totalModules = courseDetails[course.id]?.modules.length ?? 0
  const completedModules = progress.find((p) => p.courseId === course.id)?.completedModules.length ?? 0
  const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <img src={course.image} alt={course.title} className="h-32 w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit rounded-md bg-muted-surface px-2 py-1 text-xs font-medium text-muted">
          {course.type}
        </span>
        <h3 className="mt-3 text-base font-semibold text-foreground text-pretty">{course.title}</h3>
        <p className="mt-1 text-xs text-muted">{course.standard}</p>

        {totalModules > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted">Progreso</span>
              <span className="text-primary">{percent}%</span>
            </div>
            <div
              className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted-surface"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progreso de ${course.title}`}
            >
              <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <Link
            to={`/dashboard/curso/${course.id}`}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Ver curso
          </Link>
        </div>
      </div>
    </article>
  )
}
