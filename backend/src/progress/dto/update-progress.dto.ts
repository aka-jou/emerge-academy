import { IsBoolean, IsInt, Min } from "class-validator"

export class UpdateProgressDto {
  @IsInt()
  @Min(1)
  moduleNumber: number

  // true = marcar como completado, false = desmarcar (por si el usuario se equivoca).
  @IsBoolean()
  completed: boolean
}
