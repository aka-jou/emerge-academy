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
