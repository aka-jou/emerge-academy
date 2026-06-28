export type CourseType = "Renovación" | "Especialización" | "Certificación"

export type Course = {
  id: string
  type: CourseType
  standard: string
  title: string
  description: string
  duration: string
  requirement: string
  venue: string
  online?: boolean
  action: "Inscribirme" | "Entrar"
}

export const courses: Course[] = [
  {
    id: "bst-altura",
    type: "Renovación",
    standard: "Certificación GWO",
    title: "BST – Trabajos en Altura",
    description:
      "Formación básica en seguridad para trabajos en altura con técnicas de rescate y prevención de riesgos.",
    duration: "32 horas",
    requirement: "Aptitud física requerida",
    venue: "CDMX – 25 Nov",
    action: "Inscribirme",
  },
  {
    id: "bst-incendios",
    type: "Especialización",
    standard: "Certificación GWO",
    title: "BST – Extinción de Incendios",
    description: "Adquirir conocimientos básicos sobre la prevención de incendios.",
    duration: "16 horas",
    requirement: "Certificación BST previa",
    venue: "Monterrey – 2 Dic",
    action: "Entrar",
  },
  {
    id: "bst-primeros-auxilios",
    type: "Certificación",
    standard: "Certificación GWO",
    title: "BST - Primeros auxilios",
    description:
      "Capacita a los participantes para administrar primeros auxilios de manera segura y efectiva en el entorno de un aerogenerador.",
    duration: "40 horas",
    requirement: "Conocimientos básicos",
    venue: "Guadalajara – 10 Dic",
    action: "Entrar",
  },
  {
    id: "bst-cargas",
    type: "Certificación",
    standard: "Certificación GWO",
    title: "BST - Manipulación de Cargas",
    description: "El objetivo de este módulo es prevenir lesiones musculoesqueléticas.",
    duration: "32 horas",
    requirement: "Aptitud física requerida",
    venue: "En línea",
    online: true,
    action: "Entrar",
  },
]

export type CourseModule = {
  number: number
  title: string
  lessons: number
  hours: number
}

export const courseDetail = {
  title: "Curso de Seguridad en Alturas GWO",
  description:
    "Capacitación integral diseñada para preparar a los participantes en el trabajo seguro en alturas dentro del sector eólico. El programa combina fundamentos teóricos sobre prevención de riesgos con prácticas intensivas de uso de equipos de protección, sistemas de detención de caídas y técnicas de rescate en aerogeneradores conforme a los estándares oficiales de la industria.",
  specs: [
    { label: "40 horas", icon: "clock" as const },
    { label: "Intermedio", icon: "graduation" as const },
    { label: "Presencial", icon: "users" as const },
    { label: "Certificado", icon: "certificate" as const },
  ],
  prerequisites: [
    "Certificado médico vigente con aptitud para trabajos en altura",
    "Edad mínima de 18 años cumplidos",
    "Identificación oficial vigente",
    "Curso BST – Inducción previa (recomendado)",
  ],
  price: "$2,450 MXN",
  priceNote: "IVA incluido",
  venues: ["CDMX – 25 Nov 2026", "Monterrey – 02 Dic 2026", "Guadalajara – 10 Dic 2026"],
  modules: [
    { number: 1, title: "Fundamentos de seguridad en alturas", lessons: 5, hours: 8 },
    { number: 2, title: "Equipos de protección y sistemas anticaídas", lessons: 6, hours: 10 },
    { number: 3, title: "Técnicas de ascenso y descenso seguro", lessons: 4, hours: 8 },
    { number: 4, title: "Procedimientos de rescate en aerogeneradores", lessons: 7, hours: 10 },
    { number: 5, title: "Evaluación práctica y certificación", lessons: 3, hours: 4 },
  ] satisfies CourseModule[],
  physicalRequirements: [
    "Buena condición física general",
    "Ausencia de vértigo o acrofobia",
    "Capacidad para cargar hasta 20 kg",
    "Movilidad articular completa",
  ],
  ppeRequirements: [
    "Arnés de cuerpo completo certificado",
    "Casco con barboquejo",
    "Calzado de seguridad antideslizante",
    "Guantes de trabajo en altura",
  ],
  standards: [
    { code: "NOM-009-STPS", name: "Trabajos en altura" },
    { code: "LOTO Procedures", name: "Bloqueo y etiquetado de energía" },
    { code: "ISO 45001", name: "Sistemas de gestión de seguridad" },
  ],
}

export const filterOptions = {
  modulo: ["Trabajos en Altura", "Extinción de Incendios", "Primeros Auxilios", "Manipulación de Cargas"],
  modalidad: ["Presencial", "En línea", "Mixta"],
  ciudad: ["CDMX", "Monterrey", "Guadalajara", "En línea"],
  duracion: ["16 horas", "32 horas", "40 horas"],
  nivel: ["Básico", "Intermedio", "Avanzado"],
}
