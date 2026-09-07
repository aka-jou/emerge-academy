import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { AdminGuard } from "../auth/admin.guard"
import { CurrentUser } from "../auth/current-user.decorator"
import { SessionsService } from "./sessions.service"
import { CreateSessionDto } from "./dto/create-session.dto"
import { UpdateSessionDto } from "./dto/update-session.dto"

@Controller("sessions")
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  // Calendario del estudiante autenticado: sesiones de sus cursos comprados.
  @Get("me")
  findMine(@CurrentUser() user: { userId: string }) {
    return this.sessionsService.findForEnrolledStudent(user.userId)
  }

  // Panel de administrador: todas las sesiones programadas de un curso.
  @Get()
  @UseGuards(AdminGuard)
  findAllForCourse(@Query("courseId") courseId: string) {
    return this.sessionsService.findAllForCourse(courseId)
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() dto: CreateSessionDto, @CurrentUser() user: { userId: string }) {
    return this.sessionsService.create(dto, user.userId)
  }

  @Patch(":id")
  @UseGuards(AdminGuard)
  update(@Param("id") id: string, @Body() dto: UpdateSessionDto) {
    return this.sessionsService.update(id, dto)
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  remove(@Param("id") id: string) {
    return this.sessionsService.remove(id)
  }
}
