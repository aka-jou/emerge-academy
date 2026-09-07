import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { LiveSession } from "./live-session.entity"
import { CreateSessionDto } from "./dto/create-session.dto"
import { UpdateSessionDto } from "./dto/update-session.dto"
import { OrdersService } from "../orders/orders.service"

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(LiveSession) private readonly sessionsRepo: Repository<LiveSession>,
    private readonly ordersService: OrdersService,
  ) {}

  // Panel de administrador: todas las sesiones de un curso (pasadas y futuras), para poder
  // editarlas o borrarlas.
  findAllForCourse(courseId: string) {
    return this.sessionsRepo.find({ where: { courseId }, order: { scheduledAt: "ASC" } })
  }

  create(dto: CreateSessionDto, createdByUserId: string) {
    const session = this.sessionsRepo.create({
      courseId: dto.courseId,
      title: dto.title,
      scheduledAt: new Date(dto.scheduledAt),
      meetingUrl: dto.meetingUrl,
      createdByUserId,
    })
    return this.sessionsRepo.save(session)
  }

  async update(id: string, dto: UpdateSessionDto) {
    const session = await this.sessionsRepo.findOne({ where: { id } })
    if (!session) throw new NotFoundException("Sesión no encontrada.")
    if (dto.title !== undefined) session.title = dto.title
    if (dto.scheduledAt !== undefined) session.scheduledAt = new Date(dto.scheduledAt)
    if (dto.meetingUrl !== undefined) session.meetingUrl = dto.meetingUrl
    return this.sessionsRepo.save(session)
  }

  async remove(id: string) {
    const result = await this.sessionsRepo.delete({ id })
    if (result.affected === 0) throw new NotFoundException("Sesión no encontrada.")
  }

  // Calendario del estudiante: solo las sesiones de los cursos en los que está inscrito.
  async findForEnrolledStudent(userId: string) {
    const enrolledIds = await this.ordersService.findEnrolledCourseIds(userId)
    if (enrolledIds.length === 0) return []
    return this.sessionsRepo.find({
      where: { courseId: In(enrolledIds) },
      order: { scheduledAt: "ASC" },
    })
  }
}
