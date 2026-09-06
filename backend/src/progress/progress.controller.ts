import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { CurrentUser } from "../auth/current-user.decorator"
import { ProgressService } from "./progress.service"
import { UpdateProgressDto } from "./dto/update-progress.dto"
import { SubmitQuizDto } from "./dto/submit-quiz.dto"

@Controller("progress")
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Progreso de todos los cursos del usuario autenticado.
  @Get("me")
  findMine(@CurrentUser() user: { userId: string }) {
    return this.progressService.findAllForUser(user.userId)
  }

  // Marca (o desmarca) manualmente un módulo como completado (módulos sin cuestionario).
  @Patch("me/:courseId")
  update(
    @CurrentUser() user: { userId: string },
    @Param("courseId") courseId: string,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.progressService.updateProgress(user.userId, courseId, dto)
  }

  // Envía el resultado de un cuestionario de módulo; solo aprueba el módulo si la
  // puntuación alcanza el mínimo, y respeta el bloqueo secuencial entre módulos.
  @Post("me/:courseId/quiz")
  submitQuiz(
    @CurrentUser() user: { userId: string },
    @Param("courseId") courseId: string,
    @Body() dto: SubmitQuizDto,
  ) {
    return this.progressService.submitQuiz(user.userId, courseId, dto)
  }
}
