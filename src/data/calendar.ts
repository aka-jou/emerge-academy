export type CalendarEventType = "live" | "session" | "evaluation" | "task" | "practice"

export type CalendarEvent = {
  id: string
  // Fecha en formato ISO (YYYY-MM-DD) para facilitar el agrupado por día.
  date: string
  time: string
  title: string
  course: string
  location: string
  type: CalendarEventType
}

export const eventTypeMeta: Record<
  CalendarEventType,
  { label: string; dot: string; chip: string }
> = {
  live: {
    label: "Sesión en vivo",
    dot: "bg-primary",
    chip: "bg-primary/12 text-primary",
  },
  session: {
    label: "Sesión presencial",
    dot: "bg-sky-500",
    chip: "bg-sky-500/12 text-sky-700",
  },
  evaluation: {
    label: "Evaluación",
    dot: "bg-amber-500",
    chip: "bg-amber-500/15 text-amber-700",
  },
  task: {
    label: "Tarea / Entrega",
    dot: "bg-violet-500",
    chip: "bg-violet-500/12 text-violet-700",
  },
  practice: {
    label: "Práctica de campo",
    dot: "bg-emerald-500",
    chip: "bg-emerald-500/12 text-emerald-700",
  },
}

// Mes simulado del calendario del alumno: Noviembre 2026.
export const calendarMonth = { year: 2026, month: 10 } // month es 0-indexado (10 = noviembre)

export const calendarEvents: CalendarEvent[] = [
  {
    id: "ev-1",
    date: "2026-11-05",
    time: "10:00",
    title: "Inducción: uso correcto del EPP",
    course: "BST",
    location: "Aula virtual",
    type: "session",
  },
  {
    id: "ev-2",
    date: "2026-11-10",
    time: "08:00 – 16:00",
    title: "Práctica presencial: ascenso a torre",
    course: "BST",
    location: "Sede Oaxaca",
    type: "practice",
  },
  {
    id: "ev-3",
    date: "2026-11-14",
    time: "23:59",
    title: "Evaluación módulo 3: Primeros auxilios",
    course: "BST",
    location: "Plataforma EMERGE",
    type: "evaluation",
  },
  {
    id: "ev-4",
    date: "2026-11-16",
    time: "Todo el día",
    title: "Entrega tarea práctica: inspección de arnés",
    course: "BST",
    location: "Plataforma EMERGE",
    type: "task",
  },
  {
    id: "ev-5",
    date: "2026-11-18",
    time: "17:00",
    title: "Sesión en vivo: Manejo manual de cargas",
    course: "BTT",
    location: "Google Meet",
    type: "live",
  },
  {
    id: "ev-6",
    date: "2026-11-20",
    time: "23:59",
    title: "Quiz final: Manipulación manual",
    course: "BTT",
    location: "Plataforma EMERGE",
    type: "evaluation",
  },
  {
    id: "ev-7",
    date: "2026-11-22",
    time: "08:00 – 17:00",
    title: "Práctica presencial: rescate en altura",
    course: "ART",
    location: "Sede Tamaulipas",
    type: "practice",
  },
  {
    id: "ev-8",
    date: "2026-11-25",
    time: "14:00",
    title: "Sesión en vivo: Trabajos en altura",
    course: "BST",
    location: "Google Meet",
    type: "live",
  },
  {
    id: "ev-9",
    date: "2026-11-25",
    time: "16:00",
    title: "Asesoría grupal de dudas",
    course: "BST",
    location: "Google Meet",
    type: "session",
  },
  {
    id: "ev-10",
    date: "2026-11-28",
    time: "23:59",
    title: "Entrega proyecto final del curso",
    course: "ART",
    location: "Plataforma EMERGE",
    type: "task",
  },
]

export type CalendarNotification = {
  id: string
  title: string
  detail: string
  time: string
  type: CalendarEventType
  unread: boolean
}

export const calendarNotifications: CalendarNotification[] = [
  {
    id: "n1",
    title: "Tu sesión en vivo empieza pronto",
    detail: "“Trabajos en altura” comienza hoy a las 2:00 PM por Google Meet.",
    time: "Hace 15 min",
    type: "live",
    unread: true,
  },
  {
    id: "n2",
    title: "Evaluación próxima a vencer",
    detail: "La evaluación del módulo 3 cierra el 14 de noviembre a las 11:59 PM.",
    time: "Hace 2 h",
    type: "evaluation",
    unread: true,
  },
  {
    id: "n3",
    title: "Recordatorio de práctica presencial",
    detail: "Llega 30 min antes a la Sede Oaxaca para el ascenso a torre del 10 de noviembre.",
    time: "Ayer",
    type: "practice",
    unread: false,
  },
  {
    id: "n4",
    title: "Nueva tarea asignada",
    detail: "Se habilitó la entrega “Inspección de arnés”. Vence el 16 de noviembre.",
    time: "Hace 2 días",
    type: "task",
    unread: false,
  },
]
