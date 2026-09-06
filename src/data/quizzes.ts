export type ChecklistItem = {
  number: number
  skill: string
  isCritical: boolean // paso obligatorio para poder ser calificado "Competente"
}

export type PracticalChecklist = {
  code: string // folio del formato oficial (ej. GE-F-CAP-12)
  weightPercentage: number // peso de esta evaluación sobre la calificación final
  items: ChecklistItem[]
  passingRule: string
}

// Evaluación formativa (GE-F-CAP-12): guía de observación aplicada en persona por el
// instructor durante la práctica. No es autoevaluable en línea (requiere observar el
// desempeño físico del participante), así que se muestra como referencia de lo que se
// evaluará presencialmente, no como un cuestionario a responder en la plataforma.
export const practicalChecklists: Record<string, PracticalChecklist> = {
  "primeros-auxilios": {
    code: "GE-F-CAP-12",
    weightPercentage: 40,
    passingRule:
      'Se requiere aprobar 7 de 8 pasos, incluyendo obligatoriamente los pasos 1, 4 y 5, para obtener el resultado "Competente".',
    items: [
      { number: 1, skill: "Seguridad (PAS): revisa que la escena sea segura y se coloca guantes/lentes antes de tocar al paciente", isCritical: true },
      { number: 2, skill: "Evaluación: revisa el estado de alerta (habla/toca) y comprueba pulso y respiración en menos de 10 segundos", isCritical: false },
      { number: 3, skill: "Posición de RCP: coloca de forma correcta las manos entrelazadas en el centro del pecho del maniquí", isCritical: false },
      { number: 4, skill: "Calidad de RCP: realiza las compresiones con los brazos rectos, con buen ritmo (100-120/min) y dejando que el tórax regrese", isCritical: true },
      { number: 5, skill: "Ciclo de RCP: cumple con la secuencia exacta de 30 compresiones por 2 ventilaciones", isCritical: true },
      { number: 6, skill: "Atragantamiento: se coloca detrás del paciente y aplica compresiones abdominales con fuerza hacia adentro y arriba (Heimlich)", isCritical: false },
      { number: 7, skill: "Inmovilización: coloca el collarín cervical y férulas manteniendo la alineación del cuerpo del paciente", isCritical: false },
      { number: 8, skill: "Traslado: se coordina con su equipo mediante comandos de voz para subir al paciente a la camilla rígida de forma segura", isCritical: false },
    ],
  },
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
}

export type ModuleQuiz = {
  passingScore: number // porcentaje mínimo para aprobar el módulo (0-100)
  questions: QuizQuestion[]
}

// Evaluación diagnóstica (GE-F-CAP-11): se aplica antes de iniciar el curso para medir
// conocimientos previos. Por diseño NO tiene impacto en la calificación final ni bloquea el
// avance de módulos; solo da retroalimentación inmediata al participante.
export const diagnosticQuizzes: Record<string, QuizQuestion[]> = {
  "primeros-auxilios": [
    {
      id: "pa-diag-q1",
      prompt: "¿Cuál es el orden correcto de las acciones a seguir al llegar a la escena de una emergencia según el protocolo de primeros auxilios?",
      options: [
        "Llamar a la ambulancia, atender a la víctima, asegurar la zona",
        "Proteger (asegurar la escena), Alertar (llamar a emergencias), Socorrer (atender a la víctima)",
        "Mover inmediatamente a la víctima a un lugar seguro, revisar sus pertenencias, dar agua",
      ],
      correctIndex: 1,
    },
    {
      id: "pa-diag-q2",
      prompt: "Ante un herido inconsciente que SÍ respira, ¿en qué posición se le debe colocar para evitar el ahogamiento por secreciones o vómito mientras llega la ayuda?",
      options: ["Posición Lateral de Seguridad (PLS) o de lado", "Boca abajo (Decúbito prono)", "Sentado con la cabeza hacia atrás"],
      correctIndex: 0,
    },
    {
      id: "pa-diag-q3",
      prompt: "Al realizar la Reanimación Cardiopulmonar (RCP) en un adulto, ¿cuál es la relación correcta entre compresiones torácicas e insuflaciones (ventilaciones)?",
      options: ["15 compresiones por 2 ventilaciones", "30 compresiones por 2 ventilaciones", "50 compresiones por 5 ventilaciones"],
      correctIndex: 1,
    },
    {
      id: "pa-diag-q4",
      prompt: "Si una persona presenta una obstrucción total de la vía aérea (se está asfixiando y no puede hablar ni toser), ¿qué maniobra se debe aplicar de inmediato?",
      options: [
        "Maniobra de Heimlich (compresiones abdominales bajo el esternón)",
        "Darle un vaso con agua o comida blanda para que pase el objeto",
        "Golpear fuertemente la espalda mientras la persona está sentada",
      ],
      correctIndex: 0,
    },
    {
      id: "pa-diag-q5",
      prompt: "En caso de una quemadura térmica (por fuego o líquido caliente), ¿cuál es la primera acción recomendada para enfriar la lesión?",
      options: [
        "Aplicar pasta dental, mostaza o mantequilla sobre la piel",
        "Enjuagar la zona afectada con agua corriente limpia a temperatura ambiente durante varios minutos",
        "Romper las ampollas inmediatamente para liberar el calor",
      ],
      correctIndex: 1,
    },
  ],
}


// Cuestionarios reales tomados del Manual del Participante de cada curso (sección de
// ejercicios/evaluación). Solo se listan aquí los módulos que ya tienen un cuestionario
// real definido; los módulos sin entrada usan el botón simple de "marcar como completado".
export const moduleQuizzes: Record<string, Record<number, ModuleQuiz>> = {
  "primeros-auxilios": {
    // Módulo 1: Introducción y Evaluación de la Escena (Protocolo P.A.S.)
    1: {
      passingScore: 70,
      questions: [
        {
          id: "pa-m1-q1",
          prompt: "¿Cuál es el primer paso prioritario según el protocolo P.A.S. ante un accidente?",
          options: ["Correr a mover al lesionado", "Proteger la escena y al rescatista", "Aplicar un torniquete de inmediato"],
          correctIndex: 1,
        },
      ],
    },
    // Módulo 2: Evaluación Primaria (C-A-B) y Normativa Aplicable
    2: {
      passingScore: 70,
      questions: [
        {
          id: "pa-m2-q1",
          prompt:
            "La maniobra de inclinación de cabeza y levantamiento del mentón no debe usarse si se sospecha fuertemente de una lesión en la columna vertebral o el cuello.",
          options: ["Verdadero", "Falso"],
          correctIndex: 0,
        },
      ],
    },
    // Módulo 3: RCP, DEA y desobstrucción de la vía aérea
    3: {
      passingScore: 70,
      questions: [
        {
          id: "pa-m3-q1",
          prompt: "¿Cuál es la frecuencia de compresiones recomendada por minuto en una RCP de alta calidad en adultos?",
          options: ["60 a 80 compresiones", "100 a 120 compresiones", "150 a 180 compresiones"],
          correctIndex: 1,
        },
        {
          id: "pa-m3-q2",
          prompt:
            "El DEA puede ser utilizado de forma segura en superficies metálicas húmedas o charcos sin tomar medidas de secado previo del torso de la víctima.",
          options: ["Verdadero", "Falso"],
          correctIndex: 1,
        },
      ],
    },
    // Módulo 4: Hemorragias, Shock, Lesiones Térmicas/Trauma y Brigadas
    4: {
      passingScore: 70,
      questions: [
        {
          id: "pa-m4-q1",
          prompt:
            "Ante una hemorragia masiva en una pierna por corte con herramienta motorizada que no para con presión, ¿qué se debe realizar?",
          options: [
            "Lavar con abundante agua corriente",
            "Colocar un torniquete comercial de 5 a 7 cm arriba de la herida",
            "Aplicar pomadas antibióticas",
          ],
          correctIndex: 1,
        },
        {
          id: "pa-m4-q2",
          prompt:
            "Si el primer apósito colocado sobre una herida sangrante se llena de sangre, se debe quitar rápidamente para colocar uno nuevo.",
          options: ["Verdadero", "Falso"],
          correctIndex: 1,
        },
      ],
    },
  },
}
