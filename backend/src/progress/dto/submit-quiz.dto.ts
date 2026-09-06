import { IsInt, Max, Min } from "class-validator"

export class SubmitQuizDto {
  @IsInt()
  @Min(1)
  moduleNumber: number

  @IsInt()
  @Min(0)
  @Max(100)
  score: number

  // El mínimo para aprobar vive en el frontend junto con las preguntas del cuestionario
  // (src/data/quizzes.ts); el backend solo aplica la comparación con lo que se le indique.
  @IsInt()
  @Min(0)
  @Max(100)
  passingScore: number
}
