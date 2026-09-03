import { ForbiddenException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CourseProgress } from "./course-progress.entity"
import { OrdersService } from "../orders/orders.service"
import { UpdateProgressDto } from "./dto/update-progress.dto"

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(CourseProgress) private readonly progressRepo: Repository<CourseProgress>,
    private readonly ordersService: OrdersService,
  ) {}

  // Progreso de todos los cursos del usuario (para el dashboard: banner de progreso global,
  // tarjetas de "Cursos activos", y gate de certificados en Logros).
  async findAllForUser(userId: string) {
    const records = await this.progressRepo.find({ where: { userId } })
    return records.map((r) => ({
      courseId: r.courseId,
      completedModules: (r.completedModules ?? []).filter(Boolean).map(Number),
    }))
  }

  private async assertEnrolled(userId: string, courseId: string) {
    const enrolledIds = await this.ordersService.findEnrolledCourseIds(userId)
    if (!enrolledIds.includes(courseId)) {
      throw new ForbiddenException("No has comprado este curso, no se puede registrar avance.")
    }
  }

  async updateProgress(userId: string, courseId: string, dto: UpdateProgressDto) {
    // Solo se puede marcar avance en un curso que el usuario realmente compró.
    await this.assertEnrolled(userId, courseId)

    let record = await this.progressRepo.findOne({ where: { userId, courseId } })
    if (!record) {
      record = this.progressRepo.create({ userId, courseId, completedModules: [] })
    }

    const current = new Set((record.completedModules ?? []).filter(Boolean).map(Number))
    if (dto.completed) current.add(dto.moduleNumber)
    else current.delete(dto.moduleNumber)

    record.completedModules = Array.from(current)
      .sort((a, b) => a - b)
      .map(String)

    const saved = await this.progressRepo.save(record)
    return {
      courseId: saved.courseId,
      completedModules: (saved.completedModules ?? []).filter(Boolean).map(Number),
    }
  }
}
