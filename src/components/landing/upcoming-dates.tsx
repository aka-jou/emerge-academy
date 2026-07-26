import { Link } from "react-router-dom"
import { MapPinIcon, ClockIcon, UsersIcon } from "../icons"

const courses = [
  {
    code: "SI",
    name: "Trabajo Seguro en Alturas",
    duration: "8 horas",
    location: "Capacitación en sitio",
    schedule: "Programación a solicitud",
    seats: "Sector Energías Renovables",
  },
  {
    code: "PC",
    name: "Líder de Brigada Contra Incendio Industrial",
    duration: "32 horas",
    location: "Capacitación en sitio",
    schedule: "Programación a solicitud",
    seats: "Sector Industrial y Gobierno",
  },
  {
    code: "AP",
    name: "Técnico Básico en Urgencias Médicas",
    duration: "32 horas",
    location: "Capacitación en sitio",
    schedule: "Programación a solicitud",
    seats: "Sector Gobierno Municipal",
  },
]

export function UpcomingDates() {
  return (
    <section id="fechas" className="scroll-mt-16 bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Cursos destacados
          </h2>
          <p className="mt-4 text-pretty text-muted">
            Programas de capacitación en sitio, adaptados a las necesidades de tu empresa o dependencia.
          </p>
        </div>

        <div id="cursos" className="mt-12 grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.code}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary">
                  {course.code}
                </span>
                <span className="text-xs font-semibold text-primary">{course.seats}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{course.name}</h3>

              <dl className="mt-5 flex flex-col gap-3 text-sm text-muted">
                <div className="flex items-center gap-2.5">
                  <ClockIcon className="h-4 w-4 text-primary" />
                  <dd>{course.duration}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPinIcon className="h-4 w-4 text-primary" />
                  <dd>{course.location}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <UsersIcon className="h-4 w-4 text-primary" />
                  <dd>{course.schedule}</dd>
                </div>
              </dl>

              <Link
                to="/login"
                className="mt-6 rounded-lg bg-foreground px-4 py-2.5 text-center text-sm font-semibold text-background transition hover:opacity-90"
              >
                Solicitar información
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
