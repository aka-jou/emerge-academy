import { Link, useParams } from "react-router-dom"
import { CoursesHeader } from "../components/courses/courses-header"
import { CourseTabs } from "../components/course-detail/course-tabs"
import { PurchaseCard } from "../components/course-detail/purchase-card"
import { CourseObjective } from "../components/course-detail/course-objective"
import { CourseReferences } from "../components/course-detail/course-references"
import { courseDetails } from "../data/courses"
import { ClockIcon, GraduationCapIcon, UsersIcon, CertificateIcon } from "../components/icons"

const specIcons = {
  clock: ClockIcon,
  graduation: GraduationCapIcon,
  users: UsersIcon,
  certificate: CertificateIcon,
}

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const courseDetail = id ? courseDetails[id] : undefined

  if (!courseDetail) {
    return (
      <div className="flex min-h-full flex-col bg-background">
        <CoursesHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
            <h1 className="text-2xl font-bold text-foreground">Curso no encontrado</h1>
            <p className="mt-3 text-sm text-muted">El curso que buscas no existe o fue movido.</p>
            <Link
              to="/cursos"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Ver todos los cursos
            </Link>
          </div>
        </main>
      </div>
    )
  }
  return (
    <div className="flex min-h-full flex-col bg-background">
      <CoursesHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link to="/cursos" className="transition hover:text-primary">
              Cursos
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{courseDetail.title}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[7fr_3fr]">
            {/* Columna izquierda */}
            <div>
              <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                Certificación Universidad Emerge
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
                {courseDetail.title}
              </h1>

              <div className="mt-5 overflow-hidden rounded-2xl border border-border shadow-sm">
                <img
                  src={courseDetail.image}
                  alt={courseDetail.title}
                  className="h-64 w-full object-cover sm:h-80"
                />
              </div>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                {courseDetail.description}
              </p>

              <CourseObjective objective={courseDetail.objective} instructor={courseDetail.instructor} />

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {courseDetail.specs.map((spec) => {
                  const Icon = specIcons[spec.icon]
                  return (
                    <li key={spec.label} className="flex items-center gap-2 text-sm text-muted">
                      <Icon className="h-4 w-4 text-muted" />
                      {spec.label}
                    </li>
                  )
                })}
              </ul>

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h2 className="text-sm font-bold text-amber-900">Requisitos previos obligatorios</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-amber-900/90">
                  {courseDetail.prerequisites.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">{courseDetail.price}</span>
                <span className="text-sm text-muted">{courseDetail.priceNote}</span>
              </div>

              <CourseTabs modules={courseDetail.modules} />

              <CourseReferences references={courseDetail.references} />
            </div>

            {/* Sidebar */}
            <aside>
              <PurchaseCard courseId={id!} detail={courseDetail} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
