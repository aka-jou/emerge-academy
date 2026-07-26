export type ContentType = "Video" | "PDF" | "Quiz" | "Meet"

export type ActiveCourse = {
  id: string
  code: string
  title: string
  content: ContentType[]
  progress: number
  milestoneType: "live" | "next"
  milestoneLabel: string
  live: boolean
}

export const student = {
  name: "María",
  globalProgress: 74,
  completedModules: 3,
  totalModules: 4,
  currentCourseId: "alturas",
}

export const activeCourses: ActiveCourse[] = [
  {
    id: "alturas",
    code: "SI",
    title: "Trabajo Seguro en Alturas",
    content: ["Video", "PDF", "Meet"],
    progress: 82,
    milestoneType: "live",
    milestoneLabel: "Sesión en vivo: Hoy, 2:00 PM",
    live: true,
  },
  {
    id: "espacios-confinados",
    code: "SI",
    title: "Espacios Confinados",
    content: ["Video", "Quiz"],
    progress: 45,
    milestoneType: "next",
    milestoneLabel: "Próxima sesión: 15 Nov",
    live: false,
  },
  {
    id: "brigadas-practico",
    code: "PC",
    title: "Comando en Tácticas y Estrategias de Brigadas Contra Incendios",
    content: ["Video", "PDF", "Quiz", "Meet"],
    progress: 18,
    milestoneType: "next",
    milestoneLabel: "Próxima sesión: 22 Nov",
    live: false,
  },
]

export type Milestone = {
  id: string
  kind: "live" | "evaluation" | "task"
  title: string
  schedule: string
  action: "join" | "start" | "details"
}

export const milestones: Milestone[] = [
  {
    id: "m1",
    kind: "live",
    title: "Sesión en vivo: Trabajos en altura",
    schedule: "Hoy, 2:00 PM",
    action: "join",
  },
  {
    id: "m2",
    kind: "evaluation",
    title: "Evaluación módulo 3: Primeros auxilios",
    schedule: "Vence: 14 Nov, 11:59 PM",
    action: "start",
  },
  {
    id: "m3",
    kind: "task",
    title: "Tarea práctica: Uso de arnés",
    schedule: "Vence: 16 Nov",
    action: "details",
  },
  {
    id: "m4",
    kind: "evaluation",
    title: "Quiz final: Manipulación manual",
    schedule: "Vence: 20 Nov",
    action: "details",
  },
]

export type DownloadFile = {
  id: string
  name: string
  ext: "PDF" | "DOC" | "XLS"
  size: string
}

export const downloads: DownloadFile[] = [
  { id: "d1", name: "Manual - Trabajo Seguro en Alturas", ext: "PDF", size: "4.2 MB" },
  { id: "d2", name: "Checklist de inspección de equipo", ext: "DOC", size: "320 KB" },
  { id: "d3", name: "Registro de prácticas EPP", ext: "XLS", size: "78 KB" },
  { id: "d4", name: "Guía de primeros auxilios", ext: "PDF", size: "1.8 MB" },
]

export type LiveSession = {
  courseId: string
  courseName: string
  title: string
  platform: string
  instructor: string
  schedule: string
  duration: string
  status: "En línea"
  // Tiempo restante para el inicio (offset en ms desde "ahora") usado por el contador.
  startsInMs: number
  date: string
  time: string
  timezone: string
  participants: number
  language: string
  about: string[]
  agenda: { time: string; topic: string }[]
  materials: { name: string; ext: DownloadFile["ext"]; size: string }[]
  meetUrl: string
}

export const liveSession: LiveSession = {
  courseId: "alturas",
  courseName: "Curso de Seguridad en Alturas",
  title: "Sesión en vivo — Curso de Seguridad en Alturas (Google Meet)",
  platform: "Google Meet",
  instructor: "Ing. Carlos Mendoza",
  schedule: "Hoy · 2:00 PM",
  duration: "90 minutos",
  status: "En línea",
  startsInMs: 1000 * 60 * 60 * 2 + 1000 * 60 * 15 + 1000 * 30, // 2 h 15 m 30 s
  date: "Martes, 25 de noviembre de 2026",
  time: "2:00 PM (GMT-6, Ciudad de México)",
  timezone: "GMT-6",
  participants: 24,
  language: "Español",
  about: [
    "En esta sesión en vivo profundizaremos en las técnicas de trabajo seguro en altura para entornos industriales, con énfasis en los sistemas de detención de caídas y los procedimientos de rescate.",
    "El instructor resolverá dudas en tiempo real y realizará demostraciones prácticas del uso correcto del arnés y la línea de vida. Te recomendamos conectarte 5 minutos antes con tu cámara y micrófono listos.",
  ],
  agenda: [
    { time: "00:00", topic: "Bienvenida y objetivos de la sesión" },
    { time: "00:10", topic: "Repaso del marco normativo (NOM-009-STPS)" },
    { time: "00:30", topic: "Demostración: inspección y uso del arnés" },
    { time: "01:00", topic: "Procedimientos de rescate en trabajos de altura" },
    { time: "01:20", topic: "Preguntas y respuestas" },
  ],
  materials: [
    { name: "Manual - Trabajo Seguro en Alturas", ext: "PDF", size: "4.2 MB" },
    { name: "Checklist de inspección de equipo", ext: "DOC", size: "320 KB" },
    { name: "Presentación de la sesión", ext: "PDF", size: "2.1 MB" },
  ],
  meetUrl: "https://meet.google.com/lookup/emerge-alturas",
}

export type Certificate = {
  recipient: string
  standard: string
  standardCode: string
  courseTitle: string
  hours: string
  grade: string
  issueDate: string
  expiryDate: string
  folio: string
  serialNumber: string
  verifyUrl: string
  instructors: { name: string; role: string }[]
}

export const certificate: Certificate = {
  recipient: "María Fernanda González Ríos",
  standard: "Trabajo Seguro en Alturas",
  standardCode: "UE-ALT-2026",
  courseTitle: "Curso de Seguridad en Alturas",
  hours: "8 horas",
  grade: "Aprobado · 96/100",
  issueDate: "25 de noviembre de 2026",
  expiryDate: "25 de noviembre de 2028",
  folio: "EMG-2026-08842",
  serialNumber: "MX-UE-ALT-7F3A9C2E-2026",
  verifyUrl: "https://verifica.universidademerge.mx/c/EMG-2026-08842",
  instructors: [
    { name: "Ing. Carlos Mendoza", role: "Instructor líder certificado" },
    { name: "Lic. Ana Beltrán", role: "Coordinadora académica" },
  ],
}
