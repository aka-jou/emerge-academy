import { Link } from "react-router-dom"
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon } from "../icons"

const courses = [
  {
    code: "BST",
    name: "Basic Safety Training",
    date: "12 – 16 May 2026",
    location: "Sede Oaxaca",
    schedule: "08:00 – 17:00",
    seats: "6 cupos disponibles",
  },
  {
    code: "BTT",
    name: "Basic Technical Training",
    date: "19 – 22 May 2026",
    location: "Sede Tamaulipas",
    schedule: "08:00 – 16:00",
    seats: "4 cupos disponibles",
  },
  {
    code: "ART",
    name: "Advanced Rescue Training",
    date: "26 – 28 May 2026",
    location: "Sede Oaxaca",
    schedule: "08:00 – 17:00",
    seats: "3 cupos disponibles",
  },
]

export function UpcomingDates() {
  return (
    <section id="fechas" className="scroll-mt-16 bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Próximas fechas
          </h2>
          <p className="mt-4 text-pretty text-muted">
            Reserva tu lugar en nuestros próximos cursos GWO. Cupos limitados por grupo.
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
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <dd>{course.date}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPinIcon className="h-4 w-4 text-primary" />
                  <dd>{course.location}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <ClockIcon className="h-4 w-4 text-primary" />
                  <dd>{course.schedule}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <UsersIcon className="h-4 w-4 text-primary" />
                  <dd>Grupos reducidos</dd>
                </div>
              </dl>

              <Link
                to="/login"
                className="mt-6 rounded-lg bg-foreground px-4 py-2.5 text-center text-sm font-semibold text-background transition hover:opacity-90"
              >
                Inscribirme
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
