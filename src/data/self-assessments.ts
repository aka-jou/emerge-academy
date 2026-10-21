// Fichas de autoevaluación del participante (formato oficial de Grupo Emerge RM).
// Cada ficha tiene 3 secciones con preguntas de Sí/No. Es una herramienta de reflexión:
// no hay respuestas "correctas" ni afecta la calificación; al terminar, el participante
// ve su porcentaje de "Sí" por sección y la lista de puntos a reforzar.

export type SelfAssessmentSection = {
  title: string
  prompt: string // pregunta guía o descripción que acompaña a la sección en la ficha
  items: string[]
}

export type SelfAssessment = {
  sections: SelfAssessmentSection[]
  pillars: string[] // valores que aparecen al pie de la ficha
  reminder?: string // mensaje "Recuerda" de la ficha, cuando lo tiene
}

export const selfAssessments: Record<string, SelfAssessment> = {
  "primeros-auxilios": {
    sections: [
      {
        title: "Evaluación inicial y seguridad en la escena",
        prompt: "¿Reconozco la situación, protejo el área y evalúo al paciente de forma segura?",
        items: [
          "¿Verifico la seguridad de la escena antes de acercarme al paciente?",
          "¿Identifico peligros y utilizo equipo de protección personal (EPP)?",
          "¿Evalúo el estado de conciencia del paciente?",
          "¿Solicito apoyo y activo el sistema de emergencias (911) de forma oportuna?",
          "¿Realizo una evaluación primaria (A-B-C-D-E)?",
        ],
      },
      {
        title: "Atención del paciente y soporte vital",
        prompt: "¿Aplico correctamente los procedimientos de primeros auxilios?",
        items: [
          "¿Realizo compresiones torácicas de calidad (ritmo, profundidad y liberación)?",
          "¿Uso el DEA de forma segura siguiendo las indicaciones del equipo?",
          "¿Manejo correctamente la vía aérea y la ventilación de rescate?",
          "¿Controlo hemorragias mediante presión directa?",
          "¿Inmovilizo adecuadamente ante lesiones sospechosas de fractura?",
          "¿Coloco al paciente en posición lateral de seguridad cuando corresponde?",
        ],
      },
      {
        title: "Comunicación, coordinación y seguimiento",
        prompt: "¿Me comunico de manera efectiva y coordino la atención con otros servicios?",
        items: [
          "¿Mantengo comunicación clara con el equipo y los servicios de emergencia?",
          "¿Proporciono información precisa sobre la condición del paciente?",
          "¿Colaboro en la evacuación y traslado del paciente?",
          "¿Realizo un reporte final de la atención brindada?",
          "¿Identifico áreas de mejora en mi actuación?",
        ],
      },
    ],
    pillars: ["Prevención", "Atención oportuna", "Comunicación", "Trabajo en equipo", "Mejora continua"],
  },
  "contraincendios": {
    sections: [
      {
        title: "Conocimientos básicos y prevención",
        prompt: "¿Reconozco los principios del fuego y aplico medidas preventivas?",
        items: [
          "¿Identifico el tetraedro del fuego y sus condiciones de propagación?",
          "¿Reconozco los diferentes tipos de fuego (A, B, C, D, K)?",
          "¿Identifico los riesgos de incendio en mi área de trabajo?",
          "¿Aplico medidas preventivas para reducir la probabilidad de incendio?",
          "¿Conozco y aplico las normas y procedimientos de seguridad contra incendios?",
        ],
      },
      {
        title: "Uso de equipos y sistemas contra incendios",
        prompt: "¿Utilizo correctamente los equipos y sistemas de protección contra incendios?",
        items: [
          "¿Selecciono el tipo de extintor adecuado según el tipo de fuego?",
          "¿Realizo la inspección básica de extintores y equipos de emergencia?",
          "¿Conozco el uso de hidrantes y mangueras?",
          "¿Identifico y comprendo el funcionamiento de los sistemas de detección y alarma?",
          "¿Utilizo el equipo de protección personal (EPP) adecuado durante la respuesta?",
        ],
      },
      {
        title: "Respuesta ante emergencias y coordinación",
        prompt: "¿Actúo de forma segura y coordinada ante un conato de incendio?",
        items: [
          "¿Activo la alarma y comunico la emergencia de manera oportuna?",
          "¿Coordino la evacuación y apoyo al personal de la zona afectada?",
          "¿Aplico los procedimientos de respuesta ante un conato de incendio?",
          "¿Colaboro con los cuerpos de emergencia (Bomberos / Protección Civil)?",
          "¿Participo en la evaluación del incidente y propongo mejoras?",
        ],
      },
    ],
    pillars: ["Prevención", "Capacitación", "Comunicación", "Respuesta efectiva", "Mejora continua"],
  },
  "manejo-cargas": {
    sections: [
      {
        title: "Conocimientos básicos y evaluación del riesgo",
        prompt: "¿Reconozco los riesgos y conceptos fundamentales del manejo manual de cargas?",
        items: [
          "¿Reconozco qué se considera una carga y sus características?",
          "¿Identifico los principales riesgos asociados al manejo manual de cargas?",
          "¿Evalúo el peso, tamaño, forma y estabilidad de la carga antes de levantarla?",
          "¿Reconozco las condiciones del entorno (piso, espacio, iluminación)?",
          "¿Conozco los límites físicos de mi cuerpo y sé cuándo solicitar ayuda?",
        ],
      },
      {
        title: "Técnicas seguras y uso de ayudas mecánicas",
        prompt: "¿Aplico correctamente las técnicas y utilizo los medios de ayuda disponibles?",
        items: [
          "¿Aplico la técnica correcta de levantamiento (espalda recta, piernas, agarre)?",
          "¿Mantengo la carga cerca del cuerpo?",
          "¿Evito giros del tronco al levantar o transportar cargas?",
          "¿Utilizo ayudas mecánicas (carretillas, patines, grúas) cuando es necesario?",
          "¿Uso el equipo de protección personal adecuado?",
        ],
      },
      {
        title: "Organización, trabajo en equipo y prevención de lesiones",
        prompt: "¿Trabajo de forma segura, coordinada y contribuyo a prevenir lesiones?",
        items: [
          "¿Planifico la ruta de transporte y aseguro un área libre de obstáculos?",
          "¿Solicito apoyo cuando la carga es muy pesada o voluminosa?",
          "¿Mantengo una buena postura durante el transporte?",
          "¿Reconozco signos de fatiga o molestias musculoesqueléticas?",
          "¿Participo en la prevención de lesiones y promuevo hábitos seguros en mi equipo?",
        ],
      },
    ],
    pillars: ["Prevención", "Trabajo en equipo", "Ergonomía", "Comunicación", "Respuesta a emergencias", "Mejora continua"],
  },
  "alturas": {
    sections: [
      {
        title: "Planificación, evaluación de riesgos y permisos",
        prompt: "¿Reconozco los riesgos, evalúo las condiciones y gestiono correctamente los permisos para trabajar en alturas?",
        items: [
          "¿Identifico los peligros asociados al trabajo en alturas?",
          "¿Evalúo las condiciones del sitio (clima, superficie, obstáculos) antes de iniciar?",
          "¿Cuento con el permiso de trabajo en alturas y lo comprendo?",
          "¿Defino el plan de trabajo, responsabilidades y comunicación?",
          "¿Reconozco si las condiciones cambian y detengo el trabajo cuando es necesario?",
        ],
      },
      {
        title: "Equipo de protección, sistemas anticaídas y puntos de anclaje",
        prompt: "¿Utilizo correctamente el equipo de protección personal y los sistemas anticaídas?",
        items: [
          "¿Utilizo arnés de cuerpo completo y equipos certificados?",
          "¿Verifico el estado de las líneas de vida, conectores y absorbedores de energía?",
          "¿Selecciono y uso puntos de anclaje adecuados y certificados?",
          "¿Inspecciono mi equipo antes de cada uso?",
          "¿Mantengo el equipo en buen estado y lo utilizo correctamente durante toda la actividad?",
        ],
      },
      {
        title: "Trabajo seguro, rescate y respuesta a emergencias",
        prompt: "¿Trabajo de forma segura, comunico y sé cómo actuar ante una emergencia?",
        items: [
          "¿Mantengo comunicación constante con mi equipo durante la actividad?",
          "¿Conozco el plan de rescate y los procedimientos de emergencia?",
          "¿Identifico los equipos y personal de rescate disponibles?",
          "¿Reconozco señales de alerta (fatiga, malestar, condiciones inseguras)?",
          "¿Participo en los simulacros y contribuyo a la mejora continua de la seguridad?",
        ],
      },
    ],
    pillars: ["Planificación", "Trabajo en equipo", "Uso correcto de equipo", "Comunicación", "Respuesta a emergencias", "Mejora continua"],
  },
  "prl": {
    sections: [
      {
        title: "Identificación de peligros y evaluación de riesgos",
        prompt: "¿Reconozco los peligros en mi área de trabajo y evalúo los riesgos asociados?",
        items: [
          "¿Identifico los peligros presentes en mi área de trabajo?",
          "¿Reconozco los tipos de riesgos (físicos, químicos, biológicos, ergonómicos, psicosociales y mecánicos)?",
          "¿Evalúo la probabilidad y severidad de los riesgos?",
          "¿Conozco las medidas de control aplicables según la jerarquía de controles?",
          "¿Reporto condiciones inseguras y participo en la identificación de riesgos?",
        ],
      },
      {
        title: "Medidas preventivas y uso de equipo de protección personal",
        prompt: "¿Aplico las medidas preventivas y utilizo correctamente el equipo de protección?",
        items: [
          "¿Utilizo el equipo de protección personal (EPP) adecuado para cada actividad?",
          "¿Verifico que mi EPP esté en buen estado y cumpla con las normas?",
          "¿Aplico las medidas preventivas establecidas en procedimientos y permisos de trabajo?",
          "¿Mantengo orden y limpieza en mi área de trabajo?",
          "¿Conozco y respeto la señalización de seguridad y las restricciones de acceso?",
        ],
      },
      {
        title: "Respuesta ante emergencias y cultura de seguridad",
        prompt: "¿Estoy preparado para actuar ante una emergencia y contribuyo a una cultura segura?",
        items: [
          "¿Conozco los procedimientos de emergencia de mi centro de trabajo?",
          "¿Identifico las rutas de evacuación y puntos de reunión?",
          "¿Sé cómo actuar ante un conato de incendio, derrame o accidente?",
          "¿Participo en simulacros y brigadas de emergencia?",
          "¿Promuevo la comunicación, el trabajo en equipo y la mejora continua de la seguridad?",
        ],
      },
    ],
    pillars: ["Prevención", "Trabajo en equipo", "Cumplimiento normativo", "Entorno seguro", "Respuesta efectiva", "Mejora continua"],
  },
  "torque-tension": {
    sections: [
      {
        title: "Conocimientos básicos y principios del torque y la tensión",
        prompt: "¿Comprendo los fundamentos y su importancia en la seguridad y confiabilidad?",
        items: [
          "¿Comprendo la diferencia entre torque y tensión?",
          "¿Identifico los factores que afectan el torque (fricción, lubricación, condición del perno)?",
          "¿Conozco los tipos de uniones atornilladas y sus aplicaciones?",
          "¿Reconozco la importancia del torque y la tensión en la seguridad y confiabilidad?",
          "¿Conozco las normas y especificaciones aplicables (fabricante, industria, etc.)?",
        ],
      },
      {
        title: "Herramientas, equipos y procedimiento",
        prompt: "¿Utilizo correctamente los equipos y sigo el procedimiento establecido?",
        items: [
          "¿Selecciono la herramienta adecuada (manual, hidráulica, eléctrica)?",
          "¿Verifico la calibración y el estado de los equipos?",
          "¿Aplico el procedimiento de torque según especificaciones del fabricante?",
          "¿Realizo el torque en la secuencia correcta (cruz o estrella)?",
          "¿Registro los valores de torque en los formatos correspondientes?",
        ],
      },
      {
        title: "Seguridad, calidad y verificación",
        prompt: "¿Trabajo de forma segura y verifico que la unión cumple con los requisitos?",
        items: [
          "¿Utilizo el equipo de protección personal (EPP) adecuado?",
          "¿Mantengo condiciones seguras de trabajo en altura o en campo?",
          "¿Verifico la tensión residual o el método de verificación (marcas, DTI u otro)?",
          "¿Identifico señales de reapriete o mantenimiento posterior?",
          "¿Confirmo que la unión cumple con los criterios de calidad y cierre documental?",
        ],
      },
    ],
    pillars: ["Seguridad", "Calidad", "Trabajo en equipo", "Disciplina operativa", "Confiabilidad", "Resultados"],
  },
  "sustancias-quimicas": {
    sections: [
      {
        title: "Conocimientos básicos e identificación de peligros",
        prompt: "¿Reconozco las características, riesgos y clasificación de las sustancias químicas?",
        items: [
          "¿Identifico el sistema de clasificación de sustancias químicas (SGA)?",
          "¿Reconozco los pictogramas y su significado?",
          "¿Conozco los riesgos físicos, para la salud y al medio ambiente?",
          "¿Interpreto correctamente la información de las Hojas de Datos de Seguridad (HDS)?",
          "¿Identifico las incompatibilidades entre sustancias químicas?",
        ],
      },
      {
        title: "Manejo seguro, almacenamiento y equipo de protección personal",
        prompt: "¿Aplico prácticas seguras en el manejo, almacenamiento y uso de sustancias químicas?",
        items: [
          "¿Utilizo el equipo de protección personal (EPP) adecuado al riesgo?",
          "¿Realizo inspección previa de los envases y etiquetas?",
          "¿Aplico las condiciones correctas de almacenamiento (segregación, ventilación, temperatura)?",
          "¿Manipulo y trasvaso sustancias químicas de forma segura?",
          "¿Conozco los procedimientos de trabajo seguro y permisos cuando aplica?",
        ],
      },
      {
        title: "Respuesta ante emergencias y gestión de derrames",
        prompt: "¿Actúo de forma segura y coordinada ante incidentes con sustancias químicas?",
        items: [
          "¿Identifico los procedimientos de respuesta ante derrames, fugas o exposiciones?",
          "¿Utilizo correctamente el kit de control de derrames?",
          "¿Conozco la ubicación y uso de duchas y lavaojos de emergencia?",
          "¿Comunico y coordino el incidente con mi equipo y los servicios de emergencia?",
          "¿Realizo la disposición final de residuos peligrosos según la normativa aplicable?",
        ],
      },
    ],
    pillars: ["Prevención", "Conocimiento", "Manejo seguro", "Respuesta efectiva", "Medio ambiente"],
  },
  "riesgo-electrico": {
    sections: [
      {
        title: "Conocimientos básicos y peligros del riesgo eléctrico",
        prompt: "¿Reconozco los conceptos, peligros y efectos de la electricidad?",
        items: [
          "¿Identifico las fuentes de energía eléctrica en mi área de trabajo?",
          "¿Reconozco los principales peligros del riesgo eléctrico?",
          "¿Conozco los efectos de la corriente eléctrica en el cuerpo humano?",
          "¿Identifico las distancias de seguridad y zonas de riesgo?",
          "¿Conozco la clasificación de los ambientes eléctricos (secos, húmedos, explosivos)?",
        ],
      },
      {
        title: "Controles, procedimientos seguros y sistema LOTO",
        prompt: "¿Aplico correctamente las medidas de control y los procedimientos seguros?",
        items: [
          "¿Aplico correctamente el procedimiento de bloqueo, candadeo y etiquetado (LOTO)?",
          "¿Verifico la ausencia de tensión antes de intervenir en un equipo?",
          "¿Utilizo y comprendo los sistemas de puesta a tierra y equipotencialidad?",
          "¿Selecciono y uso correctamente el equipo de medición eléctrica?",
          "¿Conozco y aplico el uso adecuado del equipo de protección personal (EPP) para trabajos eléctricos?",
        ],
      },
      {
        title: "Respuesta ante emergencias y coordinación",
        prompt: "¿Actúo de forma segura y coordinada ante incidentes eléctricos?",
        items: [
          "¿Activo el sistema de emergencias (911) de forma oportuna?",
          "¿Aplico procedimientos seguros de rescate sin ponerme en riesgo?",
          "¿Brindo primeros auxilios básicos en caso de electrocución?",
          "¿Coordino la zona de seguridad y el control de acceso al área del incidente?",
          "¿Realizo el reporte del incidente y participo en la investigación de causas?",
        ],
      },
    ],
    pillars: ["Prevención", "Seguridad", "Procedimientos", "Comunicación", "Emergencia", "Mejora continua"],
  },
  "loto": {
    sections: [
      {
        title: "Fundamentos y normativa del etiquetado y candadeo",
        prompt: "¿Conozco los principios, beneficios y requisitos del sistema LOTO?",
        items: [
          "¿Conozco el objetivo y los beneficios del sistema de etiquetado y candadeo?",
          "¿Identifico la normativa aplicable (NOM, NFPA y procedimientos internos)?",
          "¿Reconozco los peligros de una energía peligrosa (eléctrica, mecánica, hidráulica, neumática, térmica, química)?",
          "¿Comprendo las responsabilidades de cada persona en el programa LOTO?",
          "¿Conozco las consecuencias de no aplicar correctamente el etiquetado y candadeo?",
        ],
      },
      {
        title: "Procedimiento de bloqueo, etiquetado y verificación",
        prompt: "¿Aplico correctamente el procedimiento LOTO en un equipo?",
        items: [
          "¿Sigo la secuencia correcta del procedimiento LOTO?",
          "¿Utilizo los dispositivos de bloqueo y etiquetas adecuados?",
          "¿Verifico la ausencia de tensión o energía antes de intervenir?",
          "¿Registro y documento el procedimiento según los formatos de la empresa?",
          "¿Participo en la liberación segura del equipo y retiro de candados y etiquetas?",
        ],
      },
      {
        title: "Trabajo seguro y coordinación del equipo",
        prompt: "¿Trabajo de forma segura y coordinada con mi equipo durante actividades LOTO?",
        items: [
          "¿Me comunico y coordino con mi equipo antes, durante y después del LOTO?",
          "¿Utilizo el equipo de protección personal (EPP) adecuado?",
          "¿Identifico condiciones inseguras o desviaciones durante el trabajo?",
          "¿Aplico los permisos de trabajo cuando corresponde?",
          "¿Contribuyo a la mejora continua del programa LOTO en mi área de trabajo?",
        ],
      },
    ],
    pillars: ["Seguridad", "Trabajo en equipo", "Procedimientos", "Comunicación", "Control de energías", "Mejora continua"],
  },
  "espacios-confinados": {
    sections: [
      {
        title: "Identificación de peligros y evaluación del espacio confinado",
        prompt: "¿Reconozco los peligros y evalúo las condiciones del espacio confinado?",
        items: [
          "¿Identifico correctamente qué es un espacio confinado?",
          "¿Reconozco los peligros atmosféricos (deficiencia de oxígeno, gases tóxicos y explosivos)?",
          "¿Verifico las condiciones del ambiente mediante equipo de medición calibrado?",
          "¿Interpreto los resultados de la medición atmosférica?",
          "¿Identifico otros peligros (energías peligrosas, atrapamiento, caída, etc.)?",
        ],
      },
      {
        title: "Procedimientos, permiso de entrada y equipo de protección",
        prompt: "¿Aplico correctamente los procedimientos y utilizo el equipo adecuado?",
        items: [
          "¿Completo y comprendo el permiso de entrada?",
          "¿Verifico el aislamiento, bloqueo y etiquetado de fuentes de energía (LOTO)?",
          "¿Utilizo ventilación forzada cuando es necesario?",
          "¿Selecciono y uso el equipo de protección respiratoria adecuado?",
          "¿Verifico y utilizo correctamente el equipo de trabajo en alturas y rescate?",
        ],
      },
      {
        title: "Trabajo seguro, rescate y comunicación",
        prompt: "¿Trabajo de forma segura, coordinada y sé cómo actuar en una emergencia?",
        items: [
          "¿Mantengo comunicación constante con el personal de apoyo (vigilante)?",
          "¿Sigo el plan de rescate establecido?",
          "¿Identifico los signos de alarma y autorizo la salida inmediata si las condiciones cambian?",
          "¿Conozco los procedimientos de rescate y primeros auxilios?",
          "¿Participo en la evaluación final y el cierre seguro del espacio confinado?",
        ],
      },
    ],
    pillars: ["Prevención", "Trabajo en equipo", "Procedimientos", "Comunicación", "Respuesta a emergencias", "Mejora continua"],
  },
  "elevador-tractel": {
    sections: [
      {
        title: "Inspección previa y condiciones generales",
        prompt: "Verifica el equipo, el entorno y las condiciones antes de cada uso.",
        items: [
          "¿Verificas que el elevador SL4 y sus componentes estén en buen estado (cables, frenos, limitadores, etc.)?",
          "¿Revisas la estructura de anclaje y el área de trabajo antes de iniciar?",
          "¿Compruebas que la carga a elevar no exceda la capacidad del equipo?",
          "¿Verificas que el área de trabajo esté libre de obstáculos y riesgos de caída?",
          "¿Realizas el checklist de preuso según el manual del fabricante?",
        ],
      },
      {
        title: "Despliegue, encendido y pruebas",
        prompt: "Asegura que el equipo funcione correctamente antes de iniciar el ascenso.",
        items: [
          "¿Verificas el correcto despliegue de la torre y el bloqueo de secciones?",
          "¿Enciendes el equipo siguiendo el procedimiento indicado?",
          "¿Pruebas los interruptores de límite y el blocstop (detección de sobrevelocidad)?",
          "¿Confirmas que los mandos y señales de funcionamiento estén operativos?",
          "¿Realizas una prueba de subida y bajada sin carga para verificar el correcto funcionamiento?",
        ],
      },
      {
        title: "Ascenso, control de velocidad y evacuación",
        prompt: "Mantén el control, responde ante fallas y conoce el procedimiento de emergencia.",
        items: [
          "¿Mantienes el control visual del recorrido durante el ascenso?",
          "¿Respetas la capacidad de carga y el número de personas permitidas en la cabina?",
          "¿Estás atento a señales de alarma o anomalías en la velocidad?",
          "¿Conoces y sabes aplicar el procedimiento de evacuación en caso de emergencia?",
          "¿Te comunicas con tu equipo de trabajo durante todo el proceso?",
        ],
      },
    ],
    pillars: ["Usa EPP siempre", "Sigue el procedimiento", "Verifica el equipo", "Trabaja en equipo"],
    reminder: "Tu seguridad y la de tu equipo son la mejor herramienta.",
  },
  "comandante-emergencias": {
    sections: [
      {
        title: "Liderazgo y gestión inicial de la emergencia",
        prompt: "¿Reconozco mi rol como Comandante y aplico los pasos iniciales de respuesta?",
        items: [
          "¿Identifico mis responsabilidades como Comandante de Incidentes?",
          "¿Realizo una evaluación inicial de la situación (qué, dónde, magnitud, riesgos)?",
          "¿Establezco objetivos y prioridades de respuesta?",
          "¿Determino y establezco el Puesto de Comando (PC) en un lugar seguro?",
          "¿Activo y mantengo una comunicación efectiva con todo el personal?",
        ],
      },
      {
        title: "Coordinación, recursos y toma de decisiones",
        prompt: "¿Coordino recursos, analizo información y tomo decisiones acertadas?",
        items: [
          "¿Solicito y coordino los recursos necesarios (internos y externos)?",
          "¿Asigno funciones claras al personal?",
          "¿Mantengo el control y la organización de la escena?",
          "¿Analizo la información disponible para tomar decisiones seguras?",
          "¿Coordino con otras instituciones y mantengo la comunicación interinstitucional?",
        ],
      },
      {
        title: "Control, seguridad y cierre del incidente",
        prompt: "¿Superviso, mantengo la seguridad y realizo el cierre adecuado?",
        items: [
          "¿Superviso continuamente las condiciones de seguridad del personal?",
          "¿Identifico cambios en la situación y ajusto el plan de acción?",
          "¿Aseguro el control del área y la mitigación de riesgos residuales?",
          "¿Realizo el cierre del incidente (desmovilización, reporte y liberación de recursos)?",
          "¿Participo en la evaluación y lecciones aprendidas para mejorar la respuesta futura?",
        ],
      },
    ],
    pillars: ["Liderazgo", "Coordinación", "Toma de decisiones", "Comunicación", "Seguridad", "Mejora continua"],
  },
  "conduccion-vehiculos-emergencia": {
    sections: [
      {
        title: "Conducción segura y responsable",
        prompt: "Aplica las técnicas de conducción segura y respeta la normatividad vial.",
        items: [
          "¿Cuenta con licencia de conducir vigente y autorizada para vehículos de emergencia?",
          "¿Respeta los límites de velocidad y las señales de tránsito durante la emergencia?",
          "¿Mantiene la distancia de seguridad con otros vehículos y peatones?",
          "¿Utiliza correctamente las luces y sirenas según la situación?",
          "¿Adapta la conducción a las condiciones del camino, clima y tipo de emergencia?",
        ],
      },
      {
        title: "Comunicación y coordinación",
        prompt: "Mantiene comunicación efectiva con el equipo y la base operativa.",
        items: [
          "¿Mantiene comunicación constante y clara con la central o base operativa?",
          "¿Confirma la información recibida antes de actuar?",
          "¿Informa oportunamente sobre su ubicación, avances y novedades?",
          "¿Utiliza el lenguaje adecuado y los códigos establecidos?",
          "¿Coordina con otros cuerpos de emergencia cuando es necesario?",
        ],
      },
      {
        title: "Coordinación operativa y toma de decisiones",
        prompt: "Actúa con criterio, prioriza la seguridad y toma decisiones oportunas.",
        items: [
          "¿Evalúa constantemente la situación y el entorno?",
          "¿Prioriza la seguridad del personal, la víctima y la comunidad?",
          "¿Toma decisiones oportunas y basadas en la información disponible?",
          "¿Solicita apoyo cuando la situación lo requiere?",
          "¿Mantiene la calma y el control en situaciones de alta presión?",
        ],
      },
    ],
    pillars: ["Conduce seguro", "Comunica efectivamente", "Trabaja en equipo", "Decide con calma"],
    reminder: "Tu preparación salva vidas. Juntos hacemos la diferencia.",
  },
  "extraccion-vehiculos": {
    sections: [
      {
        title: "Evaluación de la escena y seguridad",
        prompt: "Identifica riesgos y asegura el área antes de iniciar la extracción.",
        items: [
          "¿Realiza la evaluación inicial de la escena y verifica la seguridad del entorno?",
          "¿Identifica y controla riesgos como incendio, fuga de combustible, cables eléctricos o derrames?",
          "¿Utiliza el equipo de protección personal (EPP) adecuado para la intervención?",
          "¿Establece perímetro de seguridad y controla el acceso a la zona de trabajo?",
          "¿Verifica la estabilidad del vehículo antes de iniciar la extracción?",
        ],
      },
      {
        title: "Técnicas de extracción y equipos",
        prompt: "Aplica correctamente los procedimientos y el uso de herramientas de rescate.",
        items: [
          "¿Selecciona el método de extracción adecuado según el tipo de vehículo y la situación?",
          "¿Utiliza correctamente las herramientas hidráulicas y manuales de rescate?",
          "¿Protege a la víctima durante el proceso de extracción?",
          "¿Evita generar movimientos bruscos o adicionales en la estructura del vehículo?",
          "¿Mantiene la comunicación constante con el equipo de apoyo y el sistema de emergencias?",
        ],
      },
      {
        title: "Coordinación y atención a la víctima",
        prompt: "Trabaja en equipo y prioriza la atención segura y oportuna.",
        items: [
          "¿Mantiene una comunicación efectiva con el personal de rescate y servicios de emergencia?",
          "¿Coordina las acciones del equipo de trabajo según los roles establecidos?",
          "¿Verifica el estado de la víctima durante todo el proceso?",
          "¿Entrega la información relevante al personal médico al finalizar la extracción?",
          "¿Participa activamente en la evaluación final de la operación y en la retroalimentación del equipo?",
        ],
      },
    ],
    pillars: ["Usa tu EPP", "Comunica efectivamente", "Coordina el equipo", "Prioriza la víctima"],
    reminder: "Tu preparación salva vidas. La extracción de vehículos requiere técnica, calma y trabajo en equipo.",
  },
  "materiales-riesgosos": {
    sections: [
      {
        title: "Identificación y manejo seguro",
        prompt: "Reconoce los peligros, identifica los materiales y aplica los procedimientos adecuados de manejo y control.",
        items: [
          "¿Puede identificar correctamente los pictogramas y etiquetas de los materiales peligrosos?",
          "¿Conoce los tipos de materiales peligrosos y sus principales riesgos (físicos, para la salud y al medio ambiente)?",
          "¿Utiliza el EPP adecuado según el tipo de material y la tarea?",
          "¿Verifica la compatibilidad de los materiales antes de su manejo o almacenamiento?",
          "¿Aplica los procedimientos de contención y control de derrames?",
        ],
      },
      {
        title: "Emergencias y respuesta",
        prompt: "Actúa correctamente ante emergencias, utiliza los equipos de respuesta y sigue los procedimientos establecidos.",
        items: [
          "¿Conoce el plan de emergencia y la ruta de evacuación en caso de incidente?",
          "¿Sabe cómo actuar ante un derrame, fuga o incendio de materiales peligrosos?",
          "¿Utiliza correctamente los equipos de respuesta (kit de derrames, extintores, SCBA, etc.)?",
          "¿Se comunica de inmediato con el personal de emergencia y las autoridades competentes?",
          "¿Mantiene la calma y sigue las indicaciones del líder de la escena?",
        ],
      },
      {
        title: "Comunicación, coordinación y toma de decisiones",
        prompt: "Mantiene una comunicación efectiva, coordina al equipo y toma decisiones seguras y oportunas.",
        items: [
          "¿Mantiene comunicación clara y constante con el equipo y el centro de control?",
          "¿Coordina las acciones con los diferentes servicios de emergencia y autoridades?",
          "¿Sigue los protocolos establecidos para la notificación y reporte de incidentes?",
          "¿Toma decisiones oportunas y basadas en la información disponible?",
          "¿Aplica el principio de seguridad en todas las operaciones?",
        ],
      },
    ],
    pillars: ["Usa tu EPP", "Comunica efectivamente", "Trabaja en equipo", "Decide con calma"],
    reminder: "La prevención y el manejo seguro de materiales peligrosos salvan vidas y protegen el medio ambiente.",
  },
  "brigadas-teorico": {
    sections: [
      {
        title: "Liderazgo y comando de incendios",
        prompt: "Reconoce el rol del comandante, la estructura de mando y la toma de decisiones en la emergencia.",
        items: [
          "¿Identifica correctamente las funciones y responsabilidades del comandante de incidentes?",
          "¿Aplica la estructura de mando y el sistema de comando de incidentes (ICS) en la planificación y ejecución?",
          "¿Reconoce la importancia de la comunicación efectiva en la toma de decisiones?",
          "¿Considera los factores de seguridad al establecer órdenes y asignar tareas?",
          "¿Aplica los principios de liderazgo en situaciones de alta presión?",
        ],
      },
      {
        title: "Tácticas y estrategias de combate",
        prompt: "Aplica las tácticas de control, ataque y defensa según el tipo de incendio y las condiciones del escenario.",
        items: [
          "¿Reconoce las tácticas de ataque, defensa y control según el tipo de incendio?",
          "¿Selecciona la estrategia adecuada en función de los materiales involucrados y el entorno?",
          "¿Identifica los riesgos y zonas de peligro en la escena?",
          "¿Coordina el uso de recursos y equipos de forma eficiente?",
          "¿Evalúa y ajusta las tácticas según la evolución del incendio?",
        ],
      },
      {
        title: "Coordinación, comunicación y estrategia operativa",
        prompt: "Mantiene la coordinación del equipo, la comunicación efectiva y la aplicación de la estrategia operativa.",
        items: [
          "¿Mantiene comunicación clara y constante con el equipo y el centro de control?",
          "¿Coordina la operación con otras brigadas y servicios de apoyo?",
          "¿Utiliza la información del escenario para ajustar la estrategia operativa?",
          "¿Toma decisiones oportunas y basadas en la evaluación de riesgos?",
          "¿Verifica que se cumplan los protocolos de seguridad y procedimientos establecidos?",
        ],
      },
    ],
    pillars: ["Usa tu EPP", "Comunica efectivamente", "Trabaja en equipo", "Actúa con disciplina"],
    reminder: "La preparación, el liderazgo y la estrategia salvan vidas.",
  },
  "brigadas-practico": {
    sections: [
      {
        title: "Liderazgo y comando en la escena",
        prompt: "Demuestra el liderazgo, coordina al equipo y aplica las tácticas de acuerdo con la situación de emergencia.",
        items: [
          "¿Asumiste el rol de comandante y dirigiste las operaciones con autoridad y seguridad?",
          "¿Aplicaste correctamente las tácticas de combate de incendios según el escenario?",
          "¿Coordinaste y asignaste funciones al equipo de acuerdo con sus capacidades?",
          "¿Mantuviste la comunicación efectiva con la brigada y los equipos de apoyo?",
          "¿Tomaste decisiones oportunas y seguras ante cambios en la situación de la emergencia?",
        ],
      },
      {
        title: "Tácticas y estrategias de combate",
        prompt: "Aplica las técnicas de extinción, ventilación, rescate y protección de estructuras, conforme a los procedimientos establecidos.",
        items: [
          "¿Seleccionaste la táctica de extinción adecuada al tipo de incendio?",
          "¿Utilizaste correctamente los equipos de protección personal y los equipos de respiración autónoma?",
          "¿Aplicaste los procedimientos de ventilación y control de humos?",
          "¿Coordinaste las acciones de rescate y salvamento en caso necesario?",
          "¿Verificaste la seguridad estructural antes de ingresar a la zona de riesgo?",
        ],
      },
      {
        title: "Comunicaciones, coordinación y control operativo",
        prompt: "Mantiene la comunicación con la central, coordina el equipo y controla la evolución de la emergencia.",
        items: [
          "¿Mantuviste comunicación constante con la central y con los equipos de apoyo?",
          "¿Coordinaste las acciones del equipo y los recursos disponibles?",
          "¿Actualizaste el mapa de la escena y reportaste los cambios relevantes?",
          "¿Tomaste decisiones basadas en la evaluación de riesgos y la información disponible?",
          "¿Mantuviste el control de la operación hasta la finalización del ejercicio?",
        ],
      },
    ],
    pillars: ["Usa tu EPP", "Mantén comunicación", "Trabaja en equipo", "Actúa con disciplina"],
    reminder: "La práctica fortalece la toma de decisiones, el liderazgo y la seguridad del equipo.",
  },
  "mando-unico": {
    sections: [
      {
        title: "Activación y planificación",
        prompt: "¿Establezco una respuesta inicial efectiva?",
        items: [
          "¿Identifico claramente el tipo de incidente y sus riesgos principales?",
          "¿Activo el mando único y establezco la estructura de comando?",
          "¿Defino los objetivos iniciales del incidente?",
          "¿Asigno roles y responsabilidades a los equipos?",
          "¿Establezco un canal de comunicación común entre todas las instituciones?",
        ],
      },
      {
        title: "Operación y coordinación",
        prompt: "¿Dirijo y coordino los recursos de manera segura y eficiente?",
        items: [
          "¿Coordino las acciones de las diferentes instituciones bajo un solo mando?",
          "¿Priorizo la seguridad del personal y de las víctimas?",
          "¿Gestiono adecuadamente los recursos disponibles (humanos, materiales y equipos)?",
          "¿Mantengo comunicación constante y clara durante toda la operación?",
          "¿Realizo ajustes en la estrategia según la evolución del incidente?",
        ],
      },
      {
        title: "Cierre y evaluación",
        prompt: "¿Finalizo el incidente y aseguro el aprendizaje?",
        items: [
          "¿Verifico que los objetivos del incidente se hayan cumplido?",
          "¿Confirmo que el área sea segura para su entrega?",
          "¿Coordino la desmovilización ordenada de los recursos?",
          "¿Elaboro o participo en el informe final del incidente?",
          "¿Identifico lecciones aprendidas para mejorar la respuesta futura?",
        ],
      },
    ],
    pillars: ["Seguridad", "Coordinación", "Comunicación", "Respuesta efectiva", "Mejora continua"],
  },
  "lider-brigada": {
    sections: [
      {
        title: "Preparación y prevención",
        prompt: "¿Conozco y aplico las medidas preventivas y la preparación de la brigada?",
        items: [
          "¿Identifico los riesgos de incendio en las instalaciones y sus posibles escenarios?",
          "¿Conozco el plan de emergencia contra incendios de mi centro de trabajo?",
          "¿Organizo y mantengo entrenada a la brigada contra incendio?",
          "¿Verifico la disponibilidad y buen estado de los equipos de protección y extinción?",
          "¿Conozco las rutas de evacuación y los puntos de reunión?",
        ],
      },
      {
        title: "Respuesta y coordinación operativa",
        prompt: "¿Dirijo la respuesta de la brigada de manera efectiva y segura?",
        items: [
          "¿Activo el plan de emergencia y asigno funciones claras a la brigada?",
          "¿Mantengo comunicación efectiva con la brigada, otras áreas y servicios de emergencia?",
          "¿Coordino la evacuación del personal de forma segura y ordenada?",
          "¿Selecciono el agente extintor adecuado según el tipo de fuego (A, B, C, D, K)?",
          "¿Vigilo las condiciones del entorno (viento, humo, materiales peligrosos) para tomar decisiones?",
        ],
      },
      {
        title: "Evaluación y toma de decisiones",
        prompt: "¿Evalúo la situación y dirijo el cierre de la emergencia?",
        items: [
          "¿Evalúo la evolución del incendio y decido el momento de retirada o relevo?",
          "¿Verifico que no existan riesgos remanentes después del control del incendio?",
          "¿Participo en la investigación del incidente y en el análisis de causas?",
          "¿Propongo mejoras en los procedimientos y en la capacitación de la brigada?",
          "¿Elaboro un informe final con las acciones realizadas y las lecciones aprendidas?",
        ],
      },
    ],
    pillars: ["Prevención", "Organización", "Comunicación", "Respuesta efectiva", "Mejora continua"],
  },
  "tecnico-urgencias": {
    sections: [
      {
        title: "Evaluación inicial y seguridad en la escena",
        prompt: "¿Reconozco la situación, valoro los riesgos y actúo de forma segura?",
        items: [
          "¿Evalúo los riesgos del entorno antes de intervenir?",
          "¿Utilizo equipo de protección personal (EPP) adecuadamente?",
          "¿Identifico la cantidad y tipo de víctimas?",
          "¿Solicito apoyo adicional cuando es necesario?",
          "¿Establezco un área segura para la atención del paciente?",
        ],
      },
      {
        title: "Atención del paciente y soporte vital",
        prompt: "¿Aplico correctamente los procedimientos de atención de urgencias?",
        items: [
          "¿Realizo una evaluación primaria (A-B-C-D-E) de manera sistemática?",
          "¿Aplico maniobras de soporte vital básico (RCP) correctamente?",
          "¿Utilizo el DEA de forma segura y siguiendo el protocolo?",
          "¿Realizo inmovilización básica de lesiones?",
          "¿Controlo hemorragias mediante técnicas adecuadas?",
          "¿Brindo atención inicial a lesiones comunes (fracturas, quemaduras, etc.)?",
        ],
      },
      {
        title: "Comunicación, coordinación y toma de decisiones",
        prompt: "¿Me comunico eficazmente y coordino la atención?",
        items: [
          "¿Mantengo comunicación clara y oportuna con el equipo y servicios de emergencia?",
          "¿Sigo los protocolos de referencia y traslado?",
          "¿Tomo decisiones adecuadas según la condición del paciente?",
          "¿Registro la información de manera completa y precisa?",
          "¿Trabajo de forma coordinada con otros servicios de emergencia?",
          "¿Analizo la evolución del paciente y ajusto la atención según sea necesario?",
        ],
      },
    ],
    pillars: ["Prevención", "Atención oportuna", "Comunicación", "Trabajo en equipo", "Mejora continua"],
  },
  "rcp": {
    sections: [
      {
        title: "Reconocimiento y activación de la respuesta",
        prompt: "¿Identifico un paro cardiorrespiratorio y activo la ayuda de forma oportuna?",
        items: [
          "¿Reconozco los signos de un paro cardiorrespiratorio?",
          "¿Activo el sistema de emergencias y brindo información clara y completa?",
          "¿Identifico y minimizo riesgos en la escena?",
          "¿Solicito y coordino el apoyo de otros miembros del equipo?",
          "¿Verifico la disponibilidad de un desfibrilador externo automático (DEA)?",
        ],
      },
      {
        title: "Ejecución de la RCP de calidad",
        prompt: "¿Aplico correctamente las compresiones y ventilaciones según el protocolo?",
        items: [
          "¿Coloco correctamente mis manos y mantengo la profundidad adecuada de las compresiones?",
          "¿Mantengo un ritmo de 100 a 120 compresiones por minuto?",
          "¿Realizo ventilaciones efectivas (de ser indicado) con buena técnica?",
          "¿Minimizo las interrupciones de las compresiones?",
          "¿Trabajo en equipo y relevo las compresiones para evitar la fatiga?",
        ],
      },
      {
        title: "Uso del DEA, evaluación y continuidad de la atención",
        prompt: "¿Utilizo el DEA de forma segura y evalúo la respuesta del paciente?",
        items: [
          "¿Enciendo y preparo el DEA correctamente?",
          "¿Coloco los parches en la posición adecuada?",
          "¿Sigo las indicaciones de voz del DEA y aseguro que nadie toque al paciente?",
          "¿Evalúo la respuesta del paciente después de cada ciclo de RCP?",
          "¿Continúo la atención hasta la llegada del personal avanzado y entrego información clara?",
        ],
      },
    ],
    pillars: ["Prevención", "Trabajo en equipo", "Comunicación", "Respuesta oportuna", "Mejora continua"],
  },
}
