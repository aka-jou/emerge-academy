import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard/dashboard-header"
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BellIcon,
  ClockIcon,
  MapPinIcon,
} from "../components/icons"
import {
  calendarEvents,
  calendarNotifications,
  calendarMonth,
  eventTypeMeta,
  type CalendarEvent,
} from "../data/calendar"
import { api } from "../lib/api"

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

function toISO(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, "0")
  const d = String(day).padStart(2, "0")
  return `${year}-${m}-${d}`
}

export function CalendarPage() {
  const [{ year, month }, setView] = useState(calendarMonth)
  // Día seleccionado por defecto: el de la sesión en vivo destacada.
  const [selectedDate, setSelectedDate] = useState("2026-11-25")
  // Igual que en Logros y Certificaciones: mientras no exista una agenda real por curso en el
  // backend, solo mostramos las sesiones y notificaciones de ejemplo si el usuario ya tiene al
  // menos un curso inscrito de verdad. Una cuenta nueva sin compras ve el calendario vacío.
  const [hasEnrolledCourses, setHasEnrolledCourses] = useState<boolean | null>(null)

  useEffect(() => {
    api
      .get<unknown[]>("/orders/me/courses")
      .then((courses) => setHasEnrolledCourses(courses.length > 0))
      .catch(() => setHasEnrolledCourses(false))
  }, [])

  const events = hasEnrolledCourses ? calendarEvents : []
  const notifications = hasEnrolledCourses ? calendarNotifications : []

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const ev of events) {
      const list = map.get(ev.date) ?? []
      list.push(ev)
      map.set(ev.date, list)
    }
    return map
  }, [events])

  const grid = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    // Convertir getDay() (0=Dom) a una semana que empieza en Lunes.
    const offset = (firstDay.getDay() + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: (number | null)[] = []
    for (let i = 0; i < offset; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [year, month])

  const selectedEvents = eventsByDate.get(selectedDate) ?? []
  const selectedDay = Number(selectedDate.split("-")[2])

  function changeMonth(dir: -1 | 1) {
    setView((v) => {
      const next = new Date(v.year, v.month + dir, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="flex min-h-full flex-col bg-background">
      <DashboardHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-primary">
            <CalendarIcon className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Calendario</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Tu agenda de formación</h1>
          <p className="text-sm text-muted">
            Sesiones en vivo, prácticas presenciales, evaluaciones y entregas de tus cursos.
          </p>
          {hasEnrolledCourses === false && (
            <p className="mt-2 text-sm text-muted">
              Aún no tienes cursos inscritos.{" "}
              <Link to="/cursos" className="font-semibold text-primary transition hover:text-primary-hover">
                Explora el catálogo
              </Link>{" "}
              para empezar.
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Calendario */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">
                  {monthNames[month]} {year}
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition hover:bg-muted-surface hover:text-foreground"
                    aria-label="Mes anterior"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition hover:bg-muted-surface hover:text-foreground"
                    aria-label="Mes siguiente"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-1.5">
                {weekDays.map((d) => (
                  <div key={d} className="pb-2 text-center text-xs font-semibold text-muted">
                    {d}
                  </div>
                ))}

                {grid.map((day, i) => {
                  if (day === null) return <div key={`empty-${i}`} />
                  const iso = toISO(year, month, day)
                  const dayEvents = eventsByDate.get(iso) ?? []
                  const isSelected = iso === selectedDate
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => setSelectedDate(iso)}
                      className={`flex min-h-16 flex-col rounded-lg border p-1.5 text-left transition ${
                        isSelected
                          ? "border-primary bg-primary/8 ring-1 ring-primary"
                          : "border-border hover:bg-muted-surface"
                      }`}
                      aria-pressed={isSelected}
                      aria-label={`${day} de ${monthNames[month]}, ${dayEvents.length} actividades`}
                    >
                      <span
                        className={`text-xs font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}
                      >
                        {day}
                      </span>
                      <span className="mt-auto flex flex-wrap gap-1">
                        {dayEvents.slice(0, 3).map((ev) => (
                          <span
                            key={ev.id}
                            className={`h-1.5 w-1.5 rounded-full ${eventTypeMeta[ev.type].dot}`}
                          />
                        ))}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Leyenda */}
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4">
                {Object.entries(eventTypeMeta).map(([key, meta]) => (
                  <span key={key} className="flex items-center gap-1.5 text-xs text-muted">
                    <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                    {meta.label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Agenda del día + Notificaciones */}
          <div className="flex flex-col gap-6">
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-bold text-foreground">
                Actividades del {selectedDay} de {monthNames[month]}
              </h2>
              {selectedEvents.length === 0 ? (
                <p className="mt-4 rounded-lg bg-muted-surface px-3 py-6 text-center text-sm text-muted">
                  No tienes actividades agendadas este día.
                </p>
              ) : (
                <ul className="mt-4 flex flex-col gap-3">
                  {selectedEvents.map((ev) => (
                    <li
                      key={ev.id}
                      className="rounded-xl border border-border p-3.5 transition hover:bg-muted-surface"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${eventTypeMeta[ev.type].chip}`}
                        >
                          {eventTypeMeta[ev.type].label}
                        </span>
                        <span className="rounded-md bg-primary/12 px-2 py-0.5 text-[11px] font-bold text-primary">
                          {ev.course}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-foreground">{ev.title}</p>
                      <div className="mt-2 flex flex-col gap-1 text-xs text-muted">
                        <span className="flex items-center gap-1.5">
                          <ClockIcon className="h-3.5 w-3.5 text-primary" />
                          {ev.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPinIcon className="h-3.5 w-3.5 text-primary" />
                          {ev.location}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <BellIcon className="h-4 w-4 text-primary" />
                  Notificaciones
                </h2>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
                    {unreadCount} nuevas
                  </span>
                )}
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {notifications.length === 0 ? (
                  <li className="rounded-lg bg-muted-surface px-3 py-6 text-center text-sm text-muted">
                    No tienes notificaciones.
                  </li>
                ) : (
                  notifications.map((n) => (
                    <li
                      key={n.id}
                      className={`relative rounded-xl border p-3.5 ${
                        n.unread ? "border-primary/30 bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${eventTypeMeta[n.type].dot}`} />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{n.title}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted">{n.detail}</p>
                          <p className="mt-1.5 text-[11px] font-medium text-muted">{n.time}</p>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
