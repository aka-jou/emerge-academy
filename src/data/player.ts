export type LessonFormat = "video" | "pdf" | "quiz"
export type LessonStatus = "completed" | "current" | "locked" | "available"

export type QuizQuestion = {
  question: string
  options: string[]
  correctIndex: number
}

export type Lesson = {
  id: string
  title: string
  format: LessonFormat
  duration: string
  status: LessonStatus
  // Recurso asociado según el formato.
  videoPoster?: string
  pdfName?: string
  quiz?: QuizQuestion[]
}

export type Module = {
  id: string
  title: string
  lessons: Lesson[]
}

export const playerCourse = {
  id: "alturas",
  title: "Curso de Seguridad en Alturas",
  progress: 45,
}

export const playerModules: Module[] = [
  {
    id: "m1",
    title: "Módulo 1 · Fundamentos de seguridad",
    lessons: [
      {
        id: "l1",
        title: "Bienvenida e introducción al curso",
        format: "video",
        duration: "6 min",
        status: "completed",
        videoPoster: "/images/courses/alturas.jpg",
      },
      {
        id: "l2",
        title: "Marco normativo NOM-009-STPS",
        format: "pdf",
        duration: "12 págs.",
        status: "completed",
        pdfName: "Marco normativo NOM-009-STPS.pdf",
      },
      {
        id: "l3",
        title: "Identificación de riesgos en altura",
        format: "video",
        duration: "14 min",
        status: "current",
        videoPoster: "/images/courses/espacios-confinados.jpg",
      },
    ],
  },
  {
    id: "m2",
    title: "Módulo 2 · Equipos de protección",
    lessons: [
      {
        id: "l4",
        title: "Inspección y uso del arnés",
        format: "video",
        duration: "18 min",
        status: "available",
        videoPoster: "/images/courses/alturas.jpg",
      },
      {
        id: "l5",
        title: "Manual de sistemas anticaídas",
        format: "pdf",
        duration: "24 págs.",
        status: "available",
        pdfName: "Manual de sistemas anticaidas.pdf",
      },
      {
        id: "l6",
        title: "Evaluación: Equipos de protección",
        format: "quiz",
        duration: "5 preguntas",
        status: "locked",
        quiz: [
          {
            question: "¿Cada cuánto debe inspeccionarse un arnés de cuerpo completo antes de su uso?",
            options: [
              "Una vez al mes",
              "Antes de cada uso",
              "Solo cuando presente daños visibles",
              "Cada seis meses",
            ],
            correctIndex: 1,
          },
          {
            question: "¿Cuál es el factor de caída más seguro al trabajar en altura?",
            options: ["Factor 2", "Factor 1", "Factor 0", "Factor 3"],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: "m3",
    title: "Módulo 3 · Procedimientos de rescate en altura",
    lessons: [
      {
        id: "l7",
        title: "Procedimientos de rescate",
        format: "video",
        duration: "20 min",
        status: "locked",
        videoPoster: "/images/courses/espacios-confinados.jpg",
      },
      {
        id: "l8",
        title: "Examen final de certificación",
        format: "quiz",
        duration: "10 preguntas",
        status: "locked",
        quiz: [
          {
            question: "¿Qué debe verificarse primero al iniciar un rescate en altura?",
            options: [
              "La carga de la batería de la radio",
              "La seguridad de la zona y el estado del rescatista",
              "El clima de la semana",
              "El número de espectadores",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
]
