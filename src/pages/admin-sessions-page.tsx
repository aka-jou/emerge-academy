import { type FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import { AdminHeader } from "../components/admin/admin-header"
import { ChevronRightIcon, PlusIcon, TrashIcon, VideoIcon, ClockIcon } from "../components/icons"
import { courses } from "../data/courses"
import { useAdminSessions } from "../lib/sessions"

// Convierte un valor de <input type="datetime-local"> (hora local del navegador) a un ISO
// string en UTC, que es lo que espera el backend.
function localDateTimeToISO(value: string) {
  if (!value) return ""
  return new Date(value).toISOString()
}

export function AdminSessionsPage() {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "")
  const [title, setTitle] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [meetingUrl, setMeetingUrl] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const { sessions, loading, error, createSession, deleteSession } = useAdminSessions(courseId)

  const selectedCourse = courses.find((c) => c.id === courseId)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError(null)

    if (!title.trim()) {
      setFormError("Ingresa un título para la sesión.")
      return
    }
    if (!scheduledAt) {
      setFormError("Elige la fecha y hora de la sesión.")
      return
    }
    if (!/^https?:\/\/\S+$/.test(meetingUrl)) {
      setFormError("Ingresa un link de Google Meet válido (debe empezar con https://).")
      return
    }

    setSubmitting(true)
    const result = await createSession({
      courseId,
      title: title.trim(),
      scheduledAt: localDateTimeToISO(scheduledAt),
      meetingUrl: meetingUrl.trim(),
    })
    setSubmitting(false)

    if (result.ok) {
      setTitle("")
      setScheduledAt("")
      setMeetingUrl("")
    } else {
      setFormError(result.error ?? "No se pudo crear la sesión.")
    }
  }

  async function handleDelete(id: string) {
    await deleteSession(id)
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <AdminHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-sm text-muted">
          <Link to="/admin" className="transition hover:text-foreground">
            Panel de administrador
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="font-medium text-foreground">Programar sesiones en vivo</span>
        </nav>

        <div className="mt-4 flex items-center gap-2 text-primary">
          <VideoIcon className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">Panel de administrador</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Sesiones en vivo</h1>
        <p className="mt-1 text-sm text-muted">
          Crea la reunión en Google Meet como de costumbre, pega aquí el link y aparecerá
          automáticamente en el calendario de todos los alumnos inscritos en el curso.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* Formulario para programar una nueva sesión */}
          <section className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <h2 className="text-sm font-bold text-foreground">Nueva sesión</h2>

              {formError && (
                <p
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive"
                >
                  {formError}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="courseId" className="text-sm font-medium text-foreground">
                  Curso
                </label>
                <select
                  id="courseId"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-medium text-foreground">
                  Título de la sesión
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Clase en vivo: Módulo 1"
                  className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="scheduledAt" className="text-sm font-medium text-foreground">
                  Fecha y hora
                </label>
                <input
                  id="scheduledAt"
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="meetingUrl" className="text-sm font-medium text-foreground">
                  Link de Google Meet
                </label>
                <input
                  id="meetingUrl"
                  type="url"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  placeholder="https://meet.google.com/abc-defg-hij"
                  className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
                <p className="text-xs text-muted">
                  Crea la reunión en{" "}
                  <a
                    href="https://meet.google.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-primary-hover"
                  >
                    meet.google.com
                  </a>{" "}
                  y pega aquí el link generado.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                <PlusIcon className="h-4 w-4" />
                {submitting ? "Programando…" : "Programar sesión"}
              </button>
            </form>
          </section>

          {/* Sesiones ya programadas para el curso seleccionado */}
          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-bold text-foreground">
                Sesiones de "{selectedCourse?.title ?? courseId}"
              </h2>

              {error && (
                <p role="alert" className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive">
                  {error}
                </p>
              )}

              {loading && <p className="mt-4 text-sm text-muted">Cargando sesiones…</p>}

              {!loading && sessions.length === 0 && (
                <p className="mt-4 rounded-lg bg-muted-surface px-3 py-6 text-center text-sm text-muted">
                  Aún no hay sesiones programadas para este curso.
                </p>
              )}

              {!loading && sessions.length > 0 && (
                <ul className="mt-4 flex flex-col gap-3">
                  {sessions.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-start justify-between gap-3 rounded-xl border border-border p-3.5"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">{s.title}</p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                          <ClockIcon className="h-3.5 w-3.5 text-primary" />
                          {new Date(s.scheduledAt).toLocaleString("es-MX", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                        <a
                          href={s.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block truncate text-xs font-medium text-primary hover:text-primary-hover"
                        >
                          {s.meetingUrl}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        aria-label={`Eliminar sesión ${s.title}`}
                        className="shrink-0 rounded-lg border border-border p-2 text-muted transition hover:bg-destructive/10 hover:text-destructive"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
