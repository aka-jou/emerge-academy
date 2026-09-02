export type CourseType = "Seguridad Industrial" | "Protección Civil" | "Atención Prehospitalaria" | "Gestión de Emergencias"

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
  image: string
}

export const courses: Course[] = [
  {
    id: "primeros-auxilios",
    image: "/images/courses/primeros-auxilios.jpg",
    type: "Atención Prehospitalaria",
    standard: "Certificación Universidad Emerge",
    title: "Primeros Auxilios",
    description: "Técnicas básicas de atención inmediata ante lesiones, malestares súbitos y accidentes en el entorno laboral.",
    duration: "8 horas",
    requirement: "Sin experiencia previa",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "contraincendios",
    image: "/images/courses/contraincendios.jpg",
    type: "Protección Civil",
    standard: "Certificación Universidad Emerge",
    title: "Prevención y Combate Contra Incendios",
    description: "Clasificación de incendios, técnica PASS para el uso de extintores portátiles y participación en brigadas y simulacros de evacuación.",
    duration: "8 horas",
    requirement: "Escolaridad mínima secundaria",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "manejo-cargas",
    image: "/images/courses/manejo-cargas.jpg",
    type: "Seguridad Industrial",
    standard: "Certificación Universidad Emerge",
    title: "Manejo Manual de Cargas",
    description: "Técnicas de levantamiento y transporte seguro de cargas para prevenir lesiones musculoesqueléticas.",
    duration: "4 horas",
    requirement: "Sin experiencia previa",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "alturas",
    image: "/images/courses/alturas.jpg",
    type: "Seguridad Industrial",
    standard: "Certificación Universidad Emerge",
    title: "Trabajo Seguro en Alturas",
    description: "Uso de sistemas anticaídas, arnés y procedimientos de ascenso/descenso seguro en trabajos elevados.",
    duration: "8 horas",
    requirement: "Aptitud física requerida",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "prl",
    image: "/images/courses/prl.jpg",
    type: "Seguridad Industrial",
    standard: "Certificación Universidad Emerge",
    title: "PRL (Prevención de Riesgos Laborales)",
    description: "Identificación y control de riesgos laborales para fortalecer la cultura de prevención en la empresa.",
    duration: "8 horas",
    requirement: "Sin experiencia previa",
    venue: "En línea",
    online: true,
    action: "Entrar",
  },
  {
    id: "torque-tension",
    image: "/images/courses/torque-tension.jpg",
    type: "Seguridad Industrial",
    standard: "Certificación Universidad Emerge",
    title: "Torque y Tensión Controlada",
    description: "Uso correcto de herramientas de torque y tensión en procesos industriales críticos.",
    duration: "8 horas",
    requirement: "Personal técnico/operativo",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "sustancias-quimicas",
    image: "/images/courses/sustancias-quimicas.jpg",
    type: "Seguridad Industrial",
    standard: "Certificación Universidad Emerge",
    title: "Manejo Seguro de Sustancias Químicas",
    description: "Identificación de peligros químicos con el SGA, uso de HDS, EPP químico y contención de derrames en entornos industriales y eólicos.",
    duration: "16 horas",
    requirement: "Escolaridad mínima secundaria, sin fobias al manejo de sustancias peligrosas",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "riesgo-electrico",
    image: "/images/courses/riesgo-electrico.jpg",
    type: "Seguridad Industrial",
    standard: "Certificación Universidad Emerge",
    title: "Riesgo Eléctrico",
    description: "Prevención de accidentes eléctricos y procedimientos seguros de trabajo cerca de energía eléctrica.",
    duration: "8 horas",
    requirement: "Personal técnico/operativo",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "loto",
    image: "/images/courses/loto.jpg",
    type: "Seguridad Industrial",
    standard: "Certificación Universidad Emerge",
    title: "Bloqueo, Etiquetado y Candadeo (LOTO)",
    description: "Identificación de energías peligrosas y aplicación de los pasos de aislamiento, candadeo, tarjeteo y prueba de cero energía.",
    duration: "8 horas",
    requirement: "Escolaridad mínima secundaria, sin fobia a energías peligrosas",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "espacios-confinados",
    image: "/images/courses/espacios-confinados.jpg",
    type: "Seguridad Industrial",
    standard: "Certificación Universidad Emerge",
    title: "Espacios Confinados",
    description: "Identificación de atmósferas peligrosas, monitoreo de gases y protocolos de vigía y rescate en espacios confinados.",
    duration: "16 horas",
    requirement: "Aptitud física y certificado médico vigente",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "elevador-tractel",
    image: "/images/courses/elevador-tractel.jpg",
    type: "Seguridad Industrial",
    standard: "Certificación Universidad Emerge",
    title: "Medidas Preventivas mediante el Uso del Elevador Tractel SL4",
    description: "Identificación de riesgos mecánicos y eléctricos, y operación segura del elevador de servicio Tractel SL4 en torres de aerogeneradores.",
    duration: "8 horas",
    requirement: "Escolaridad mínima secundaria, sin acrofobia ni claustrofobia",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "comandante-emergencias",
    image: "/images/courses/comandante-emergencias.jpg",
    type: "Gestión de Emergencias",
    standard: "Certificación Universidad Emerge",
    title: "Comandante de Situaciones de Emergencia",
    description: "Formación de mando para la coordinación y toma de decisiones durante incidentes mayores.",
    duration: "32 horas",
    requirement: "Experiencia previa en brigadas o cuerpos de emergencia",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "conduccion-vehiculos-emergencia",
    image: "/images/courses/conduccion-vehiculos-emergencia.jpg",
    type: "Gestión de Emergencias",
    standard: "Certificación Universidad Emerge",
    title: "Conducción de Vehículos de Emergencia",
    description: "Manejo defensivo y técnicas de conducción segura para unidades de respuesta a emergencias.",
    duration: "16 horas",
    requirement: "Licencia de conducir vigente",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "extraccion-vehiculos",
    image: "/images/courses/extraccion-vehiculos.jpg",
    type: "Gestión de Emergencias",
    standard: "Certificación Universidad Emerge",
    title: "Extracción de Vehículos",
    description: "Técnicas y uso de herramientas hidráulicas para la extracción segura de víctimas atrapadas.",
    duration: "16 horas",
    requirement: "Experiencia previa en brigadas o cuerpos de emergencia",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "materiales-riesgosos",
    image: "/images/courses/materiales-riesgosos.jpg",
    type: "Gestión de Emergencias",
    standard: "Certificación Universidad Emerge",
    title: "Operación con Materiales Riesgosos",
    description: "Identificación, contención y respuesta ante incidentes con materiales y sustancias peligrosas.",
    duration: "16 horas",
    requirement: "Experiencia previa en brigadas o cuerpos de emergencia",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "brigadas-teorico",
    image: "/images/courses/brigadas-teorico.jpg",
    type: "Protección Civil",
    standard: "Certificación Universidad Emerge",
    title: "Comando en Tácticas y Estrategias de Brigadas Contra Incendios (Teórico)",
    description: "Fundamentos de comando, tácticas y estrategias para la gestión de brigadas contra incendio.",
    duration: "32 horas",
    requirement: "Experiencia previa en brigadas o cuerpos de emergencia",
    venue: "En línea",
    online: true,
    action: "Entrar",
  },
  {
    id: "brigadas-practico",
    image: "/images/courses/brigadas-practico.jpg",
    type: "Protección Civil",
    standard: "Certificación Universidad Emerge",
    title: "Comando en Tácticas y Estrategias de Brigadas Contra Incendios (Práctico)",
    description: "Aplicación práctica de tácticas de ataque, ventilación y coordinación de brigadas en escenarios reales.",
    duration: "32 horas",
    requirement: "Curso teórico previo (recomendado)",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "mando-unico",
    image: "/images/courses/mando-unico.jpg",
    type: "Gestión de Emergencias",
    standard: "Certificación Universidad Emerge",
    title: "Mando Único de Gestión de Accidentes",
    description: "Estructura de mando único para la coordinación interinstitucional en la gestión de accidentes.",
    duration: "16 horas",
    requirement: "Experiencia previa en brigadas o cuerpos de emergencia",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "lider-brigada",
    image: "/images/courses/lider-brigada.jpg",
    type: "Protección Civil",
    standard: "Certificación Universidad Emerge",
    title: "Líder de Brigada Contra Incendio Industrial",
    description: "Formación de liderazgo para la conducción de brigadas contra incendio en entornos industriales.",
    duration: "32 horas",
    requirement: "Experiencia previa en brigadas o cuerpos de emergencia",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "tecnico-urgencias",
    image: "/images/courses/tecnico-urgencias.jpg",
    type: "Atención Prehospitalaria",
    standard: "Certificación Universidad Emerge",
    title: "Técnico Básico en Urgencias Médicas",
    description: "Formación integral en atención prehospitalaria para la estabilización y traslado de pacientes.",
    duration: "32 horas",
    requirement: "Conocimientos básicos de primeros auxilios (recomendado)",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
  {
    id: "rcp",
    image: "/images/courses/rcp.jpg",
    type: "Atención Prehospitalaria",
    standard: "Certificación Universidad Emerge",
    title: "Resucitación Cardio-Pulmonar",
    description: "Maniobras de RCP y uso de desfibrilador externo automático ante paros cardiorrespiratorios.",
    duration: "16 horas",
    requirement: "Sin experiencia previa",
    venue: "Capacitación en sitio",
    action: "Inscribirme",
  },
]

export type CourseModule = {
  number: number
  title: string
  lessons: number
  hours: number
}

export type EvaluationCriterion = {
  label: string
  percentage: number
}

export type CourseDetail = {
  title: string
  image: string
  description: string
  specs: { label: string; icon: "clock" | "graduation" | "users" | "certificate" }[]
  prerequisites: string[]
  price: string
  priceNote: string
  venues: string[]
  modules: CourseModule[]
  physicalRequirements: string[]
  ppeRequirements: string[]
  standards: { code: string; name: string }[]
  // Campos opcionales: sólo se muestran cuando el curso tiene un documento de
  // planeación real que los respalda (ver componentes en course-detail).
  instructor?: string
  objective?: string
  evaluationCriteria?: EvaluationCriterion[]
  evaluationNote?: string
  equipment?: string[]
  references?: string[]
}

const cotizacion = { price: "Cotización", priceNote: "precio según número de participantes" }
const sedeInSitu = ["Capacitación en sitio (in-company)", "Tuxtla Gutiérrez – bajo solicitud", "Villahermosa – bajo solicitud"]
const sedeEnLinea = ["En línea (sesión en vivo)", "En línea (asíncrono, bajo solicitud)"]

export const courseDetails: Record<string, CourseDetail> = {
  "primeros-auxilios": {
    title: "Primeros Auxilios",
    image: "/images/courses/primeros-auxilios.jpg",
    description:
      "Formación práctica para brindar una respuesta inmediata y segura ante lesiones, malestares súbitos y accidentes comunes en el entorno laboral, mientras llega ayuda profesional.",
    specs: [
      { label: "8 horas", icon: "clock" },
      { label: "Básico", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: [
      "Sin experiencia previa",
      "Edad mínima de 16 años",
      "Identificación oficial vigente",
    ],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Fundamentos de primeros auxilios y evaluación del paciente", lessons: 4, hours: 2 },
      { number: 2, title: "Heridas, hemorragias e inmovilizaciones", lessons: 4, hours: 2 },
      { number: 3, title: "Quemaduras, intoxicaciones y emergencias médicas súbitas", lessons: 3, hours: 2 },
      { number: 4, title: "Práctica evaluada y certificación", lessons: 3, hours: 2 },
    ],
    physicalRequirements: [
      "Sin requisitos físicos especiales",
      "Movilidad para practicar en piso (arrodillarse, agacharse)",
    ],
    ppeRequirements: ["Guantes de nitrilo", "Cubrebocas / mascarilla de barrera"],
    standards: [
      { code: "NOM-030-STPS", name: "Servicios preventivos de seguridad y salud en el trabajo" },
      { code: "Protocolo UE", name: "Atención inmediata Universidad Emerge" },
    ],
  },

  contraincendios: {
    title: "Prevención y Combate Contra Incendios",
    image: "/images/courses/contraincendios.jpg",
    description:
      "Curso teórico-práctico para identificar riesgos de incendio, aplicar medidas preventivas, clasificar los incendios (A, B, C, D y K), seleccionar el agente extintor correcto, aplicar la técnica PASS con extintores portátiles e integrarse a una brigada contra incendios, conforme a la NOM-002-STPS-2010.",
    specs: [
      { label: "8 horas", icon: "clock" },
      { label: "Básico", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: [
      "Escolaridad mínima: secundaria terminada",
      "No se requiere experiencia previa",
      "Condiciones físicas compatibles con actividades básicas de capacitación",
      "Disposición para participar en simulacros",
    ],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      {
        number: 1,
        title: "Química del fuego, triángulo/tetraedro y clasificación de incendios (A, B, C, D, K)",
        lessons: 3,
        hours: 2,
      },
      {
        number: 2,
        title: "Agentes extintores, tipos de extintores y normativa aplicable",
        lessons: 3,
        hours: 2,
      },
      {
        number: 3,
        title: "Inspección de extintores y técnica PASS",
        lessons: 3,
        hours: 2,
      },
      {
        number: 4,
        title: "Brigadas contra incendio y simulacro integral de respuesta a un conato",
        lessons: 3,
        hours: 2,
      },
    ],
    physicalRequirements: [
      "Condiciones físicas compatibles con actividades básicas de capacitación",
      "Capacidad para manipular extintores portátiles",
      "Capacidad para participar en ejercicios de evacuación",
    ],
    ppeRequirements: ["Equipo de Protección Personal (EPP) cuando sea requerido durante las prácticas"],
    standards: [
      { code: "NOM-002-STPS-2010", name: "Condiciones de seguridad – Prevención y protección contra incendios en los centros de trabajo" },
      { code: "NOM-003-SEGOB-2011", name: "Señales y avisos para protección civil" },
      { code: "NFPA 10", name: "Standard for Portable Fire Extinguishers" },
      { code: "NFPA 101", name: "Life Safety Code" },
    ],
    instructor: "Rafael Azaharez Cala",
    objective:
      "Al finalizar el curso, el participante será capaz de identificar los riesgos de incendio presentes en su entorno laboral, aplicar medidas preventivas, reconocer la clasificación de los incendios, seleccionar el agente extintor adecuado, utilizar correctamente un extintor portátil mediante la técnica PASS y participar de manera segura y coordinada en procedimientos de evacuación y respuesta inicial ante emergencias, conforme a la NOM-002-STPS-2010.",
    evaluationCriteria: [
      { label: "Guía de observación (participación, actitud preventiva)", percentage: 40 },
      { label: "Lista de cotejo para la práctica con extintores", percentage: 30 },
      { label: "Examen teórico (evaluación sumativa)", percentage: 30 },
    ],
    evaluationNote:
      "Se acredita con 80/100 como mínimo, participación en todas las prácticas y desempeño satisfactorio en el simulacro.",
    equipment: [
      "Extintores portátiles de distintos tipos (agua, PQS, CO₂)",
      "Tambor de prácticas para fuego controlado",
      "Radio portátil para comunicación durante el simulacro",
      "Botiquín de primeros auxilios",
      "Cinta de delimitación y señalización",
      "Cronómetro",
    ],
    references: [
      "NOM-002-STPS-2010 — Prevención y protección contra incendios en los centros de trabajo, México",
      "NOM-003-SEGOB-2011 — Señales y avisos para protección civil, México",
      "Reglamento Federal de Seguridad y Salud en el Trabajo, México",
      "NFPA 10 — Standard for Portable Fire Extinguishers",
      "NFPA 101 — Life Safety Code",
      "NFPA 600 — Standard on Facility Fire Brigades",
      "NFPA 72 — National Fire Alarm and Signaling Code",
      "Protección Civil México — Guías para la integración de brigadas y programas internos",
      "Manual del Participante del Curso Básico de Protección contra Incendios — Universidad Emerge",
    ],
  },

  "manejo-cargas": {
    title: "Manejo Manual de Cargas",
    image: "/images/courses/manejo-cargas.jpg",
    description:
      "Técnicas correctas de levantamiento y transporte de cargas para prevenir lesiones musculoesqueléticas, una de las causas más comunes de incapacidad laboral.",
    specs: [
      { label: "4 horas", icon: "clock" },
      { label: "Básico", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Sin experiencia previa"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Anatomía de la espalda y riesgos ergonómicos", lessons: 2, hours: 1 },
      { number: 2, title: "Técnicas correctas de levantamiento y transporte", lessons: 3, hours: 2 },
      { number: 3, title: "Práctica guiada y evaluación", lessons: 2, hours: 1 },
    ],
    physicalRequirements: ["Capacidad para levantar hasta 20 kg", "Sin lesiones lumbares activas"],
    ppeRequirements: ["Faja lumbar", "Guantes de trabajo", "Calzado de seguridad"],
    standards: [{ code: "NOM-006-STPS", name: "Manejo y almacenamiento de materiales" }],
  },

  alturas: {
    title: "Trabajo Seguro en Alturas",
    image: "/images/courses/alturas.jpg",
    description:
      "Capacitación práctica diseñada para preparar a los participantes en el trabajo seguro en alturas. El programa combina fundamentos teóricos de prevención de riesgos con prácticas intensivas de uso de equipo de protección personal, sistemas de detención de caídas y procedimientos de rescate, con base en escenarios reales de la industria.",
    specs: [
      { label: "8 horas", icon: "clock" },
      { label: "Básico", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: [
      "Certificado médico vigente con aptitud para trabajos en altura",
      "Edad mínima de 18 años cumplidos",
      "Identificación oficial vigente",
      "Equipo de protección personal básico",
    ],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Fundamentos de seguridad en alturas", lessons: 5, hours: 2 },
      { number: 2, title: "Equipos de protección y sistemas anticaídas", lessons: 6, hours: 3 },
      { number: 3, title: "Técnicas de ascenso y descenso seguro", lessons: 4, hours: 2 },
      { number: 4, title: "Evaluación práctica y certificación", lessons: 3, hours: 1 },
    ],
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
      { code: "LOTO", name: "Bloqueo y etiquetado de energía" },
      { code: "ISO 45001", name: "Sistemas de gestión de seguridad" },
    ],
  },

  prl: {
    title: "PRL (Prevención de Riesgos Laborales)",
    image: "/images/courses/prl.jpg",
    description:
      "Curso en línea sobre el marco legal, identificación de peligros y jerarquía de controles para construir una cultura de prevención de riesgos laborales dentro de la organización.",
    specs: [
      { label: "8 horas", icon: "clock" },
      { label: "Básico", icon: "graduation" },
      { label: "En línea", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Sin experiencia previa", "Acceso a internet estable", "Dispositivo con cámara para sesiones en vivo"],
    ...cotizacion,
    venues: sedeEnLinea,
    modules: [
      { number: 1, title: "Marco legal de seguridad y salud en el trabajo", lessons: 3, hours: 2 },
      { number: 2, title: "Identificación y evaluación de riesgos laborales", lessons: 4, hours: 2 },
      { number: 3, title: "Jerarquía de controles y equipo de protección personal", lessons: 3, hours: 2 },
      { number: 4, title: "Cultura de prevención y evaluación final", lessons: 3, hours: 2 },
    ],
    physicalRequirements: ["No aplica — curso teórico en línea"],
    ppeRequirements: ["No aplica — curso teórico en línea"],
    standards: [
      { code: "NOM-030-STPS", name: "Servicios preventivos de seguridad y salud en el trabajo" },
      { code: "ISO 45001", name: "Sistemas de gestión de seguridad" },
    ],
  },

  "torque-tension": {
    title: "Torque y Tensión Controlada",
    image: "/images/courses/torque-tension.jpg",
    description:
      "Uso correcto de herramientas hidráulicas y neumáticas de torque y tensión para el apriete seguro de uniones apernadas críticas en procesos industriales.",
    specs: [
      { label: "8 horas", icon: "clock" },
      { label: "Intermedio", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Personal técnico/operativo", "Conocimientos básicos de mecánica"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Principios de torque y tensión en uniones apernadas", lessons: 3, hours: 2 },
      { number: 2, title: "Herramientas hidráulicas y neumáticas de torque", lessons: 3, hours: 2 },
      { number: 3, title: "Secuencias de apriete y verificación", lessons: 3, hours: 2 },
      { number: 4, title: "Práctica supervisada y evaluación", lessons: 3, hours: 2 },
    ],
    physicalRequirements: ["Fuerza y destreza manual", "Sin lesiones en manos o muñecas"],
    ppeRequirements: ["Guantes anticorte", "Lentes de seguridad", "Calzado de seguridad"],
    standards: [
      { code: "ISO 45001", name: "Sistemas de gestión de seguridad" },
      { code: "Manual del fabricante", name: "Herramientas de torque y tensión hidráulica" },
    ],
  },

  "sustancias-quimicas": {
    title: "Manejo Seguro de Sustancias Químicas",
    image: "/images/courses/sustancias-quimicas.jpg",
    description:
      "Curso teórico-práctico para identificar peligros químicos mediante el Sistema Globalmente Armonizado (SGA), interpretar Hojas de Datos de Seguridad (HDS) y ejecutar técnicas correctas de manipulación, uso de EPP químico y contención de derrames en entornos industriales y eólicos, conforme a la NOM-018-STPS-2015.",
    specs: [
      { label: "16 horas", icon: "clock" },
      { label: "Intermedio", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: [
      "Escolaridad mínima: secundaria",
      "Habilidades de trabajo bajo presión, en equipo y comunicación",
      "Sin fobias al manejo de sustancias corrosivas, tóxicas o inflamables",
    ],
    ...cotizacion,
    venues: sedeInSitu,
    instructor: "Rafael Azaharez Cala",
    objective:
      "El participante, al terminar el curso taller, demostrará los conocimientos y habilidades necesarias para identificar los riesgos químicos mediante el Sistema Globalmente Armonizado (SGA) y ejecutar técnicas correctas de manipulación, uso de EPP y contención de derrames en un entorno industrial y eólico para realizar su trabajo de manera segura.",
    modules: [
      {
        number: 1,
        title: "Clasificación de peligros químicos (SGA), pictogramas y Hojas de Datos de Seguridad (HDS)",
        lessons: 4,
        hours: 4,
      },
      {
        number: 2,
        title: "Almacenamiento seguro, incompatibilidad química y zonificación de la escena de un derrame",
        lessons: 3,
        hours: 4,
      },
      {
        number: 3,
        title: "Equipo de protección personal químico (colocación y retiro) y kit de contención de derrames",
        lessons: 3,
        hours: 4,
      },
      {
        number: 4,
        title: "Descontaminación, tiempos de respuesta, reportes técnicos entre brigadas y evaluación final",
        lessons: 3,
        hours: 4,
      },
    ],
    physicalRequirements: [
      "Complexión y resistencia física para manipular contenedores, tambos y kits de neutralización de hasta 15 kg",
      "Capacidad físico-motora para maniobras de contención y trasvase",
      "Sin fobias al manejo de sustancias corrosivas, tóxicas o inflamables",
    ],
    ppeRequirements: [
      "Traje de protección química Tyvek (Tipo 4/5/6) con capucha",
      "Gafas de protección química (goggles)",
      "Guantes de nitrilo de caña larga (mínimo 15 milésimas de espesor)",
      "Solución lavaojos portátil de emergencia",
    ],
    standards: [
      { code: "NOM-018-STPS-2015", name: "Sistema armonizado para la identificación y comunicación de peligros por sustancias químicas peligrosas" },
      { code: "GRE 2024", name: "Guía de Respuesta en Caso de Emergencia (US DOT PHMSA)" },
    ],
    evaluationCriteria: [
      { label: "Evaluación diagnóstica (cuestionario, al inicio)", percentage: 0 },
      { label: "Evaluación formativa — guía de observación", percentage: 50 },
      { label: "Evaluación formativa — lista de cotejo", percentage: 40 },
      { label: "Evaluación final (cuestionario sumativo)", percentage: 10 },
    ],
    evaluationNote: "Se requiere un mínimo de 70% acumulado para acreditar el curso.",
    equipment: [
      "Kit comercial para control de derrames (absorbentes de cordón, almohadillas y calcetines inertes)",
      "Envases simulados etiquetados bajo el SGA (inflamables, corrosivos, tóxicos)",
      "Charola de contención plástica y bombas manuales de trasvase",
      "Palas y escobas anti-chispa plásticas",
      "Bolsas de polietileno de alta densidad para residuos peligrosos",
      "Simulador de superficie con líquido inocuo coloreado",
    ],
    references: [
      "NOM-018-STPS-2015 — Sistema armonizado para la identificación y comunicación de peligros por sustancias químicas peligrosas, México",
      "Guía de Respuesta en Caso de Emergencia (GRE 2024) — US DOT PHMSA",
      "OSHA/NIOSH — Manual de Seguridad y Manejo de Productos Químicos y Equipos de Protección Personal para Materiales Peligrosos",
    ],
  },

  "riesgo-electrico": {
    title: "Riesgo Eléctrico",
    image: "/images/courses/riesgo-electrico.jpg",
    description:
      "Prevención de accidentes eléctricos y procedimientos seguros de trabajo cerca de energía eléctrica, incluyendo bloqueo, verificación de ausencia de tensión y uso de EPP dieléctrico.",
    specs: [
      { label: "8 horas", icon: "clock" },
      { label: "Intermedio", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Personal técnico/operativo", "Conocimientos básicos de electricidad"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Principios de electricidad y riesgos asociados", lessons: 3, hours: 2 },
      { number: 2, title: "Bloqueo y verificación de ausencia de tensión", lessons: 3, hours: 2 },
      { number: 3, title: "Uso de EPP dieléctrico y equipo de medición", lessons: 3, hours: 2 },
      { number: 4, title: "Práctica supervisada y evaluación final", lessons: 3, hours: 2 },
    ],
    physicalRequirements: ["Sin marcapasos u otros dispositivos electrónicos implantados"],
    ppeRequirements: ["Guantes dieléctricos", "Calzado dieléctrico", "Careta facial contra arco eléctrico"],
    standards: [{ code: "NOM-029-STPS", name: "Mantenimiento de las instalaciones eléctricas" }],
  },

  loto: {
    title: "Bloqueo, Etiquetado y Candadeo (LOTO)",
    image: "/images/courses/loto.jpg",
    description:
      "Curso teórico-práctico para identificar energías peligrosas (eléctrica, hidráulica, neumática, térmica) y aplicar de forma estricta los pasos de aislamiento, candadeo, tarjeteo y prueba de cero energía antes de intervenir maquinaria o equipo industrial y eólico.",
    specs: [
      { label: "8 horas", icon: "clock" },
      { label: "Intermedio", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: [
      "Escolaridad mínima: secundaria",
      "Habilidad para el trabajo bajo presión y en equipo",
      "Ausencia de fobia o negligencia ante la intervención de energías peligrosas acumuladas",
    ],
    ...cotizacion,
    venues: sedeInSitu,
    instructor: "Rafael Azaharez Cala",
    objective:
      "Al terminar el curso, el participante demostrará los conocimientos y habilidades necesarias para identificar, aislar y bloquear cualquier tipo de energía peligrosa en un entorno eólico e industrial, aplicando el procedimiento LOTO de forma teórico-práctica para realizar su trabajo de forma segura.",
    modules: [
      {
        number: 1,
        title: "Tipos de energías peligrosas y procedimiento estándar de control (pasos del LOTO)",
        lessons: 3,
        hours: 2,
      },
      {
        number: 2,
        title: "Dispositivos de aislamiento: candados, tarjetas y mordazas (personal autorizado y afectado)",
        lessons: 3,
        hours: 2,
      },
      {
        number: 3,
        title: "Tácticas de bloqueo: colocación de dispositivos, purga y verificación de energía cero",
        lessons: 4,
        hours: 2,
      },
      {
        number: 4,
        title: "Bloqueos grupales, coordinación con otras unidades y evaluación final",
        lessons: 3,
        hours: 2,
      },
    ],
    physicalRequirements: [
      "Complexión y resistencia física para manipular válvulas, interruptores y estaciones de bloqueo de hasta 15 kg",
      "Capacidad físico-motora para aplicar maniobras de aislamiento mecánico y colocación de bloqueos físicos",
      "Ausencia de fobia o negligencia ante la intervención de energías peligrosas acumuladas",
    ],
    ppeRequirements: ["Casco", "Lentes de seguridad", "Botas dieléctricas"],
    standards: [
      { code: "OSHA 29 CFR 1910.147", name: "Control de Energía Peligrosa (Lockout/Tagout)" },
      { code: "NOM-004-STPS-1999", name: "Sistemas de protección y dispositivos de seguridad en la maquinaria" },
    ],
    evaluationCriteria: [
      { label: "Evaluación diagnóstica (cuestionario, al inicio)", percentage: 0 },
      { label: "Evaluación formativa — guía de observación", percentage: 50 },
      { label: "Evaluación formativa — lista de cotejo", percentage: 40 },
      { label: "Evaluación final (cuestionario)", percentage: 10 },
    ],
    evaluationNote: "Se requiere un mínimo de 70% acumulado para acreditar el curso.",
    equipment: [
      "Kit LOTO comercial (candados rojos dieléctricos, llaves únicas, mordazas de acero, tarjetas \"No operar\")",
      "Bloqueadores mecánicos para disyuntores eléctricos (breakers)",
      "Dispositivos de bloqueo para válvulas de compuerta y de bola",
      "Cable ajustable de bloqueo para sistemas múltiples",
      "Estación o caja de bloqueo grupal (Group Lock Box)",
      "Multímetro / probador de ausencia de tensión",
      "Panel o maqueta interactiva simuladora de fuentes de energía",
    ],
    references: [
      "OSHA 29 CFR 1910.147 — Control de Energía Peligrosa (Lockout/Tagout), EE.UU.",
      "NOM-004-STPS-1999 — Sistemas de protección y dispositivos de seguridad en la maquinaria y equipo, México",
      "Manual de procedimientos LOTO para mantenimiento industrial y eólico — Grupo EMERGE RM",
    ],
  },

  "espacios-confinados": {
    title: "Espacios Confinados",
    image: "/images/courses/espacios-confinados.jpg",
    description:
      "Curso teórico-práctico para identificar atmósferas peligrosas, operar equipos de monitoreo de gases y aplicar protocolos de entrada, vigía y rescate en espacios confinados de entornos industriales y eólicos (bujes y torres de aerogeneradores, tanques y cisternas), conforme a la NOM-033-STPS y los permisos de entrada correspondientes.",
    specs: [
      { label: "16 horas", icon: "clock" },
      { label: "Intermedio", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: [
      "Nivel de escolaridad mínimo: secundaria",
      "Certificado médico vigente con aptitud física para maniobras de rescate",
      "Ausencia de fobia o claustrofobia a confinamientos o atmósferas restringidas",
      "Habilidad para el trabajo bajo presión y en equipo",
    ],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      {
        number: 1,
        title: "Clasificación y riesgos de los espacios confinados",
        lessons: 3,
        hours: 4,
      },
      {
        number: 2,
        title: "Medición atmosférica, permisos de entrada y equipo de protección respiratoria",
        lessons: 4,
        hours: 4,
      },
      {
        number: 3,
        title: "Tácticas de entrada: bloqueo, purga, detector de gases y maniobras con línea de vida",
        lessons: 5,
        hours: 4,
      },
      {
        number: 4,
        title: "Coordinación con brigadas de rescate exteriores y evaluación final",
        lessons: 3,
        hours: 4,
      },
    ],
    physicalRequirements: [
      "Complexión y resistencia física para manipular herramientas y equipos de hasta 15 kg",
      "Capacidad físico-motora para maniobras de ingreso, permanencia y extracción en áreas restringidas",
      "Ausencia de fobia o claustrofobia a confinamientos o atmósferas restringidas",
    ],
    ppeRequirements: [
      "Traje overol de protección Tyvek",
      "Guantes de nitrilo",
      "Lentes de seguridad",
      "Lámpara de mano antiexplosiva (mínimo Clase I Div. 1)",
      "Arnés de cuerpo completo con línea de vida autorretráctil",
      "Equipo de respiración autónoma (ERA) o sistema de línea de aire",
    ],
    standards: [
      { code: "NOM-033-STPS-2015", name: "Condiciones de seguridad para realizar trabajos en espacios confinados" },
      { code: "OSHA 29 CFR 1910.146", name: "Permit-required confined spaces (referencia internacional)" },
    ],
    instructor: "Rafael Azaharez Cala",
    objective:
      "El participante, al terminar el curso taller, demostrará los conocimientos y habilidades necesarias de acuerdo con el módulo del Curso de Seguridad en Espacios Confinados, a través de la formación teórico-práctica, para identificar riesgos atmosféricos y físicos, y operar de forma segura en cualquier espacio restringido en un entorno eólico e industrial y así realizar su trabajo seguro.",
    evaluationCriteria: [
      { label: "Evaluación diagnóstica (cuestionario, al inicio)", percentage: 0 },
      { label: "Evaluación formativa — guía de observación", percentage: 50 },
      { label: "Evaluación formativa — lista de cotejo", percentage: 40 },
      { label: "Evaluación final (cuestionario)", percentage: 10 },
    ],
    evaluationNote: "Se requiere un mínimo de 70% acumulado para acreditar el curso.",
    equipment: [
      "Detector multigas portátil calibrado (O₂, LEL, CO, H₂S) con bomba de muestreo",
      "Trípode de seguridad industrial para rescate vertical con cabrestante",
      "Extractor/ventilador de aire portátil con manguera flexible de ducto",
      "Arnés de cuerpo completo con argolla dorsal y extensiones para hombros",
      "Línea de vida autorretráctil o cuerda estática de seguridad",
      "Equipo de respiración autónoma (ERA) o sistema de línea de aire cascada",
      "Maqueta simuladora de entrada restringida (boca de visita / manhole)",
    ],
    references: [
      "NOM-033-STPS-2015 — Condiciones de seguridad para realizar trabajos en espacios confinados, México",
      "OSHA 29 CFR 1910.146 — Permit-required confined spaces, EE.UU.",
      "Guía técnica de rescate y seguridad en espacios confinados — Grupo EMERGE RM",
    ],
  },

  "elevador-tractel": {
    title: "Medidas Preventivas mediante el Uso del Elevador Tractel SL4",
    image: "/images/courses/elevador-tractel.jpg",
    description:
      "Curso teórico-práctico para identificar riesgos mecánicos y eléctricos y operar de forma segura el elevador de servicio Tractel SL4 (motor Tirak, dispositivo anticaídas Blocstop) en el ascenso y descenso de torres de aerogeneradores, incluyendo el protocolo de descenso manual por gravedad ante fallas eléctricas.",
    specs: [
      { label: "8 horas", icon: "clock" },
      { label: "Intermedio", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: [
      "Escolaridad mínima: secundaria",
      "Habilidad para el trabajo bajo presión y en equipo",
      "Sin acrofobia (miedo a las alturas) ni claustrofobia en cabinas cerradas",
    ],
    ...cotizacion,
    venues: sedeInSitu,
    instructor: "Rafael Azaharez Cala",
    objective:
      "El participante, al terminar el curso taller, demostrará los conocimientos y habilidades necesarias de acuerdo con el módulo del Curso de Medidas Preventivas mediante el uso de Elevador Tractel SL4, a través de la formación teórico-práctica, para identificar riesgos mecánicos y eléctricos, y operar de forma segura el sistema de elevación en un entorno eólico e industrial y así realizar su trabajo seguro.",
    modules: [
      {
        number: 1,
        title: "Componentes mecánicos y dispositivos de seguridad del Tractel SL4 (motor Tirak, Blocstop)",
        lessons: 3,
        hours: 2,
      },
      {
        number: 2,
        title: "Inspección previa al uso (pre-use check), límites de carga y funciones operativas en cabina",
        lessons: 3,
        hours: 2,
      },
      {
        number: 3,
        title: "Operación de mandos, pruebas de límites e interruptores, y activación del Blocstop",
        lessons: 4,
        hours: 2,
      },
      {
        number: 4,
        title: "Descenso manual por gravedad ante falla eléctrica y evaluación final",
        lessons: 3,
        hours: 2,
      },
    ],
    physicalRequirements: [
      "Complexión y resistencia física para manipular componentes electromecánicos, herramientas de torque y cables de hasta 15 kg",
      "Capacidad físico-motora para maniobras de inspección, abordaje y operación de sistemas de elevación",
      "Sin acrofobia ni claustrofobia en cabinas cerradas",
    ],
    ppeRequirements: [
      "Casco de protección para trabajos en alturas con barbiquejo de 4 puntos",
      "Guantes de protección mecánica",
      "Lentes de seguridad",
      "Calzado con casquillo dieléctrico",
      "Arnés de cuerpo completo con doble línea de vida y absorbedor de impacto",
    ],
    standards: [
      { code: "Manual Tractel Group", name: "Operación, instalación y mantenimiento de elevadores de servicio Serie SL4 / Tirak" },
      { code: "OSHA 1910.66", name: "Powered platforms for building maintenance (aplicada a elevadores de servicio eólicos)" },
    ],
    evaluationCriteria: [
      { label: "Evaluación diagnóstica (cuestionario, al inicio)", percentage: 0 },
      { label: "Evaluación formativa — guía de observación", percentage: 50 },
      { label: "Evaluación formativa — lista de cotejo", percentage: 40 },
      { label: "Evaluación final (cuestionario)", percentage: 10 },
    ],
    evaluationNote: "Se requiere un mínimo de 70% acumulado para acreditar el curso.",
    equipment: [
      "Unidad de tracción motorizada Tractel (Tirak / Tractel SL)",
      "Dispositivo anticaídas Blocstop (BS/BSO)",
      "Cable de acero original Tractel de diámetro normado con terminales",
      "Manubrio/palanca de liberación de freno para descenso manual por gravedad",
      "Multímetro digital para verificación de tensiones de control",
      "Maqueta didáctica o cabina simuladora de elevador de servicio de WTG",
    ],
    references: [
      "Manual de Operación, Instalación y Mantenimiento de Elevadores de Servicio Tractel Serie SL4 / Tirak — Tractel Group",
      "OSHA 1910.66 — Powered platforms for building maintenance",
      "Guía técnica de seguridad en elevadores de servicio para WTG — Grupo EMERGE RM",
    ],
  },

  "comandante-emergencias": {
    title: "Comandante de Situaciones de Emergencia",
    image: "/images/courses/comandante-emergencias.jpg",
    description:
      "Formación de mando para la coordinación y toma de decisiones durante incidentes mayores, aplicando el Sistema de Comando de Incidentes y protocolos de comunicación interinstitucional.",
    specs: [
      { label: "32 horas", icon: "clock" },
      { label: "Avanzado", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Experiencia previa en brigadas o cuerpos de emergencia", "Curso de RCP vigente (recomendado)"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Sistema de Comando de Incidentes (SCI)", lessons: 5, hours: 8 },
      { number: 2, title: "Evaluación de escena y toma de decisiones bajo presión", lessons: 5, hours: 8 },
      { number: 3, title: "Coordinación interinstitucional y comunicación", lessons: 4, hours: 8 },
      { number: 4, title: "Simulacro de mando y evaluación final", lessons: 4, hours: 8 },
    ],
    physicalRequirements: ["Buena condición física", "Estabilidad emocional bajo presión"],
    ppeRequirements: ["Chaleco de identificación de comando", "Radio portátil", "Casco"],
    standards: [{ code: "SCI / NIMS", name: "Sistema de Comando de Incidentes" }],
  },

  "conduccion-vehiculos-emergencia": {
    title: "Conducción de Vehículos de Emergencia",
    image: "/images/courses/conduccion-vehiculos-emergencia.jpg",
    description:
      "Manejo defensivo y técnicas de conducción segura para unidades de respuesta a emergencias, incluyendo códigos de respuesta y conducción en condiciones adversas.",
    specs: [
      { label: "16 horas", icon: "clock" },
      { label: "Intermedio", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Licencia de conducir vigente", "Sin antecedentes de infracciones graves"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Marco legal y responsabilidad del conductor de emergencia", lessons: 3, hours: 4 },
      { number: 2, title: "Manejo defensivo y códigos de respuesta", lessons: 3, hours: 4 },
      { number: 3, title: "Conducción en condiciones adversas", lessons: 3, hours: 4 },
      { number: 4, title: "Práctica en pista y evaluación final", lessons: 3, hours: 4 },
    ],
    physicalRequirements: ["Aptitud visual y motriz para conducción", "Sin restricciones médicas para conducir"],
    ppeRequirements: ["No aplica — curso de conducción"],
    standards: [{ code: "Protocolo UE", name: "Conducción de vehículos de emergencia Universidad Emerge" }],
  },

  "extraccion-vehiculos": {
    title: "Extracción de Vehículos",
    image: "/images/courses/extraccion-vehiculos.jpg",
    description:
      "Técnicas y uso de herramientas hidráulicas de excarcelación para la extracción segura de víctimas atrapadas tras un accidente vehicular.",
    specs: [
      { label: "16 horas", icon: "clock" },
      { label: "Avanzado", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Experiencia previa en brigadas o cuerpos de emergencia"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Evaluación de la escena y estabilización del vehículo", lessons: 3, hours: 4 },
      { number: 2, title: "Herramientas hidráulicas de excarcelación", lessons: 3, hours: 4 },
      { number: 3, title: "Técnicas de extracción de víctimas atrapadas", lessons: 4, hours: 4 },
      { number: 4, title: "Simulacro de extracción y evaluación final", lessons: 3, hours: 4 },
    ],
    physicalRequirements: ["Fuerza física", "Capacidad de trabajo en equipo bajo presión"],
    ppeRequirements: ["Traje estructural", "Guantes de extricación", "Casco con visor"],
    standards: [{ code: "NFPA 1670", name: "Operaciones de rescate técnico (referencia internacional)" }],
  },

  "materiales-riesgosos": {
    title: "Operación con Materiales Riesgosos",
    image: "/images/courses/materiales-riesgosos.jpg",
    description:
      "Identificación, contención y respuesta ante incidentes con materiales y sustancias peligrosas (HAZMAT), incluyendo niveles de protección y descontaminación.",
    specs: [
      { label: "16 horas", icon: "clock" },
      { label: "Avanzado", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Experiencia previa en brigadas o cuerpos de emergencia"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Identificación y clasificación de materiales peligrosos", lessons: 4, hours: 4 },
      { number: 2, title: "Niveles de protección y descontaminación", lessons: 3, hours: 4 },
      { number: 3, title: "Contención y control de derrames y fugas", lessons: 3, hours: 4 },
      { number: 4, title: "Simulacro HAZMAT y evaluación final", lessons: 3, hours: 4 },
    ],
    physicalRequirements: ["Capacidad para uso prolongado de traje encapsulado"],
    ppeRequirements: ["Traje de protección química nivel B/C", "Equipo de respiración autónoma", "Guantes químicos"],
    standards: [
      { code: "NOM-005-STPS", name: "Manejo de sustancias químicas peligrosas" },
      { code: "GRE", name: "Guía de Respuesta en caso de Emergencia" },
    ],
  },

  "brigadas-teorico": {
    title: "Comando en Tácticas y Estrategias de Brigadas Contra Incendios (Teórico)",
    image: "/images/courses/brigadas-teorico.jpg",
    description:
      "Fundamentos de comando, tácticas ofensivas y defensivas, y control de propagación del fuego para la gestión de brigadas contra incendio industrial.",
    specs: [
      { label: "32 horas", icon: "clock" },
      { label: "Avanzado", icon: "graduation" },
      { label: "En línea", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Experiencia previa en brigadas o cuerpos de emergencia", "Acceso a internet estable"],
    ...cotizacion,
    venues: sedeEnLinea,
    modules: [
      { number: 1, title: "Fundamentos del comando de incidentes en incendios", lessons: 5, hours: 8 },
      { number: 2, title: "Tácticas ofensivas y defensivas", lessons: 5, hours: 8 },
      { number: 3, title: "Ventilación, exposición y control de propagación", lessons: 4, hours: 8 },
      { number: 4, title: "Evaluación teórica final", lessons: 4, hours: 8 },
    ],
    physicalRequirements: ["No aplica — curso teórico en línea"],
    ppeRequirements: ["No aplica — curso teórico en línea"],
    standards: [
      { code: "NOM-002-STPS", name: "Prevención y protección contra incendios" },
      { code: "NFPA 1021", name: "Oficial de bomberos (referencia internacional)" },
    ],
  },

  "brigadas-practico": {
    title: "Comando en Tácticas y Estrategias de Brigadas Contra Incendios (Práctico)",
    image: "/images/courses/brigadas-practico.jpg",
    description:
      "Aplicación práctica de tácticas de ataque, ventilación y coordinación de brigadas en escenarios reales de incendio controlado.",
    specs: [
      { label: "32 horas", icon: "clock" },
      { label: "Avanzado", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Curso teórico previo (recomendado)", "Experiencia previa en brigadas o cuerpos de emergencia"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Repaso táctico y organización de brigada", lessons: 3, hours: 4 },
      { number: 2, title: "Ataque ofensivo estructural en escenario controlado", lessons: 4, hours: 10 },
      { number: 3, title: "Ventilación y coordinación de equipos", lessons: 4, hours: 10 },
      { number: 4, title: "Simulacro integral y evaluación de mando", lessons: 4, hours: 8 },
    ],
    physicalRequirements: ["Buena condición física", "Resistencia al calor y esfuerzo prolongado"],
    ppeRequirements: ["Traje estructural completo", "Equipo de respiración autónoma (SCBA)", "Casco y guantes"],
    standards: [
      { code: "NOM-002-STPS", name: "Prevención y protección contra incendios" },
      { code: "NFPA 1001", name: "Bombero profesional (referencia internacional)" },
    ],
  },

  "mando-unico": {
    title: "Mando Único de Gestión de Accidentes",
    image: "/images/courses/mando-unico.jpg",
    description:
      "Estructura de mando único para la coordinación interinstitucional en la gestión de accidentes mayores, incluyendo manejo de recursos y logística del incidente.",
    specs: [
      { label: "16 horas", icon: "clock" },
      { label: "Avanzado", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Experiencia previa en brigadas o cuerpos de emergencia"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Fundamentos del mando único y cadena de mando", lessons: 3, hours: 4 },
      { number: 2, title: "Coordinación multiagencia en accidentes mayores", lessons: 3, hours: 4 },
      { number: 3, title: "Gestión de recursos y logística en el incidente", lessons: 3, hours: 4 },
      { number: 4, title: "Simulacro de mando único y evaluación final", lessons: 3, hours: 4 },
    ],
    physicalRequirements: ["Estabilidad emocional bajo presión"],
    ppeRequirements: ["Chaleco de identificación", "Radio portátil"],
    standards: [{ code: "SCI / NIMS", name: "Sistema de Comando de Incidentes" }],
  },

  "lider-brigada": {
    title: "Líder de Brigada Contra Incendio Industrial",
    image: "/images/courses/lider-brigada.jpg",
    description:
      "Formación de liderazgo para la conducción de brigadas contra incendio en entornos industriales, con énfasis en riesgos específicos de planta y coordinación táctica.",
    specs: [
      { label: "32 horas", icon: "clock" },
      { label: "Avanzado", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Experiencia previa en brigadas o cuerpos de emergencia"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Liderazgo y organización de brigadas industriales", lessons: 4, hours: 8 },
      { number: 2, title: "Evaluación de riesgos industriales específicos", lessons: 4, hours: 8 },
      { number: 3, title: "Coordinación táctica en plantas industriales", lessons: 5, hours: 8 },
      { number: 4, title: "Simulacro industrial integral y evaluación final", lessons: 4, hours: 8 },
    ],
    physicalRequirements: ["Buena condición física", "Resistencia al calor y esfuerzo prolongado"],
    ppeRequirements: ["Traje estructural", "Equipo de respiración autónoma", "Chaleco de líder de brigada"],
    standards: [
      { code: "NOM-002-STPS", name: "Prevención y protección contra incendios" },
      { code: "ISO 45001", name: "Sistemas de gestión de seguridad" },
    ],
  },

  "tecnico-urgencias": {
    title: "Técnico Básico en Urgencias Médicas",
    image: "/images/courses/tecnico-urgencias.jpg",
    description:
      "Formación integral en atención prehospitalaria para la evaluación, estabilización y traslado seguro de pacientes en situaciones de urgencia médica.",
    specs: [
      { label: "32 horas", icon: "clock" },
      { label: "Intermedio", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Conocimientos básicos de primeros auxilios (recomendado)", "Edad mínima de 18 años"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Evaluación primaria y secundaria del paciente", lessons: 5, hours: 8 },
      { number: 2, title: "Manejo de vía aérea y soporte vital básico", lessons: 5, hours: 8 },
      { number: 3, title: "Trauma, inmovilización y transporte de pacientes", lessons: 5, hours: 8 },
      { number: 4, title: "Prácticas clínicas simuladas y evaluación final", lessons: 4, hours: 8 },
    ],
    physicalRequirements: ["Buena condición física para maniobras de traslado"],
    ppeRequirements: ["Guantes", "Cubrebocas", "Chaleco reflejante"],
    standards: [
      { code: "NOM-034-SSA3", name: "Regulación de los servicios de atención médica prehospitalaria" },
      { code: "Protocolo UE", name: "Atención prehospitalaria Universidad Emerge" },
    ],
  },

  rcp: {
    title: "Resucitación Cardio-Pulmonar",
    image: "/images/courses/rcp.jpg",
    description:
      "Maniobras de RCP en adultos, niños y lactantes, junto con el uso del desfibrilador externo automático (DEA), ante un paro cardiorrespiratorio.",
    specs: [
      { label: "16 horas", icon: "clock" },
      { label: "Básico", icon: "graduation" },
      { label: "Presencial", icon: "users" },
      { label: "Certificado", icon: "certificate" },
    ],
    prerequisites: ["Sin experiencia previa"],
    ...cotizacion,
    venues: sedeInSitu,
    modules: [
      { number: 1, title: "Cadena de supervivencia y reconocimiento del paro", lessons: 3, hours: 4 },
      { number: 2, title: "RCP en adultos, niños y lactantes", lessons: 4, hours: 4 },
      { number: 3, title: "Uso del desfibrilador externo automático (DEA)", lessons: 3, hours: 4 },
      { number: 4, title: "Práctica evaluada y certificación", lessons: 3, hours: 4 },
    ],
    physicalRequirements: ["Capacidad física para compresiones torácicas sostenidas"],
    ppeRequirements: ["Guantes", "Mascarilla de barrera / bolsa-válvula-mascarilla"],
    standards: [{ code: "Protocolo UE", name: "Guías de RCP basadas en estándares internacionales (AHA/ILCOR)" }],
  },
}

export const filterOptions = {
  modulo: ["Seguridad Industrial", "Protección Civil", "Atención Prehospitalaria", "Gestión de Emergencias"],
  modalidad: ["Presencial", "En línea", "Mixta"],
  ciudad: ["Tuxtla Gutiérrez", "Villahermosa", "Coatzacoalcos", "En línea"],
  duracion: ["4 horas", "8 horas", "16 horas", "32 horas"],
  nivel: ["Básico", "Intermedio", "Avanzado"],
}
