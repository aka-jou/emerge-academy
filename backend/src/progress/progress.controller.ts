import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { CurrentUser } from "../auth/current-user.decorator"
import { ProgressService } from "./progress.service"
import { UpdateProgressDto } from "./dto/update-progress.dto"

@Controller("progress")
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Progreso de todos los cursos del usuario autenticado.
  @Get("me")
  findMine(@CurrentUser() user: { userId: string }) {
    return this.progressService.findAllForUser(user.userId)
  }

  // Marca (o desmarca) un módulo como completado para un curso comprado.
  @Patch("me/:courseId")
  update(
    @CurrentUser() user: { userId: string },
    @Param("courseId") courseId: string,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.progressService.updateProgress(user.userId, courseId, dto)
  }
}
