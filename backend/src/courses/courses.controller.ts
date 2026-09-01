import { Controller, Get, Param } from "@nestjs/common"
import { CoursesService } from "./courses.service"

// Catálogo público: no requiere sesión, cualquiera puede ver los cursos disponibles.
@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coursesService.findById(id)
  }
}
