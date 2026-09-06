import { ForbiddenException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CourseProgress } from "./course-progress.entity"
import { OrdersService } from "../orders/orders.service"
import { UpdateProgressDto } from "./dto/update-progress.dto"
import { SubmitQuizDto } from "./dto/submit-quiz.dto"

function serialize(record: CourseProgress) {
  return {
    courseId: record.courseId,
    completedModules: (record.completedModules ?? []).filter(Boolean).map(Number),
    moduleScores: record.moduleScores ?? {},
  }
}

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
    return records.map(serialize)
  }

  private async assertEnrolled(userId: string, courseId: string) {
    const enrolledIds = await this.ordersService.findEnrolledCourseIds(userId)
    if (!enrolledIds.includes(courseId)) {
      throw new ForbiddenException("No has comprado este curso, no se puede registrar avance.")
    }
  }

  private async getOrCreateRecord(userId: string, courseId: string) {
    let record = await this.progressRepo.findOne({ where: { userId, courseId } })
    if (!record) {
      record = this.progressRepo.create({ userId, courseId, completedModules: [], moduleScores: {} })
    }
    return record
  }

  // Un módulo solo se puede completar (o intentar su cuestionario) si es el primero del
  // curso, o si el módulo inmediatamente anterior ya está completado. Esto es lo que impide
  // saltarse módulos, reforzado en el servidor y no solo en la interfaz.
  private assertSequential(record: CourseProgress, moduleNumber: number) {
    if (moduleNumber === 1) return
    const completed = new Set((record.completedModules ?? []).filter(Boolean).map(Number))
    if (!completed.has(moduleNumber - 1)) {
      throw new ForbiddenException(
        `Debes completar el módulo ${moduleNumber - 1} antes de avanzar al módulo ${moduleNumber}.`,
      )
    }
  }

  // Marca/desmarca manualmente un módulo como completado (para módulos sin cuestionario).
  async updateProgress(userId: string, courseId: string, dto: UpdateProgressDto) {
    await this.assertEnrolled(userId, courseId)
    const record = await this.getOrCreateRecord(userId, courseId)

    if (dto.completed) {
      this.assertSequential(record, dto.moduleNumber)
    }

    const current = new Set((record.completedModules ?? []).filter(Boolean).map(Number))
    if (dto.completed) {
      current.add(dto.moduleNumber)
    } else {
      // Al desmarcar un módulo, también se desmarcan los posteriores: no tendría sentido
      // conservar como "completados" módulos que dependían secuencialmente de éste.
      for (const n of Array.from(current)) {
        if (n >= dto.moduleNumber) current.delete(n)
      }
    }

    record.completedModules = Array.from(current)
      .sort((a, b) => a - b)
      .map(String)

    const saved = await this.progressRepo.save(record)
    return serialize(saved)
  }

  // Envía el resultado de un cuestionario de módulo. Solo se marca el módulo como completado
  // si la puntuación alcanza el mínimo indicado; si no lo alcanza, se guarda el intento pero
  // el módulo (y por tanto los siguientes) permanecen bloqueados.
  async submitQuiz(userId: string, courseId: string, dto: SubmitQuizDto) {
    await this.assertEnrolled(userId, courseId)
    const record = await this.getOrCreateRecord(userId, courseId)

    this.assertSequential(record, dto.moduleNumber)

    record.moduleScores = { ...(record.moduleScores ?? {}), [dto.moduleNumber]: dto.score }

    const passed = dto.score >= dto.passingScore
    if (passed) {
      const current = new Set((record.completedModules ?? []).filter(Boolean).map(Number))
      current.add(dto.moduleNumber)
      record.completedModules = Array.from(current)
        .sort((a, b) => a - b)
        .map(String)
    }

    const saved = await this.progressRepo.save(record)
    return { ...serialize(saved), passed }
  }
}
