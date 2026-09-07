import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, MoreThanOrEqual, Repository } from "typeorm"
import { Course } from "../courses/course.entity"
import { Order } from "../orders/order.entity"
import { OrderItem } from "../orders/order-item.entity"
import { CourseProgress } from "../progress/course-progress.entity"
import { User } from "../users/user.entity"
import { LiveSession } from "../sessions/live-session.entity"

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Course) private readonly coursesRepo: Repository<Course>,
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemsRepo: Repository<OrderItem>,
    @InjectRepository(CourseProgress) private readonly progressRepo: Repository<CourseProgress>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(LiveSession) private readonly sessionsRepo: Repository<LiveSession>,
  ) {}

  // Próximas sesiones en vivo (de cualquier curso) para el vistazo rápido en el dashboard
  // del administrador, con acceso directo a "Unirse" y a agendar una nueva.
  findUpcomingSessions(limit = 5) {
    return this.sessionsRepo.find({
      where: { scheduledAt: MoreThanOrEqual(new Date()) },
      order: { scheduledAt: "ASC" },
      take: limit,
    })
  }

  // Tarjetas de resumen en la parte superior del dashboard del admin.
  async getPlatformSummary() {
    const totalStudentsRaw = await this.ordersRepo
      .createQueryBuilder("order")
      .select("COUNT(DISTINCT order.userId)", "count")
      .where("order.status = :status", { status: "paid" })
      .getRawOne<{ count: string }>()

    const coursesWithEnrollmentsRaw = await this.orderItemsRepo
      .createQueryBuilder("item")
      .innerJoin("item.order", "order")
      .select("COUNT(DISTINCT item.courseId)", "count")
      .where("order.status = :status", { status: "paid" })
      .getRawOne<{ count: string }>()

    const totalCourses = await this.coursesRepo.count()

    return {
      totalStudents: Number(totalStudentsRaw?.count ?? 0),
      coursesWithEnrollments: Number(coursesWithEnrollmentsRaw?.count ?? 0),
      totalCourses,
    }
  }

  // Resumen para la tarjeta de cada curso en el dashboard del admin: cuántos alumnos
  // distintos lo compraron (con orden pagada), sin importar cuántas unidades hayan
  // comprado. El "certificados" real (100% de módulos) se calcula en el frontend porque el
  // total de módulos de cada curso vive ahí (src/data/courses.ts -> courseDetails).
  async getCoursesOverview() {
    const courses = await this.coursesRepo.find()

    const enrollmentRows = await this.orderItemsRepo
      .createQueryBuilder("item")
      .innerJoin("item.order", "order")
      .select("item.courseId", "courseId")
      .addSelect("COUNT(DISTINCT order.userId)", "count")
      .where("order.status = :status", { status: "paid" })
      .groupBy("item.courseId")
      .getRawMany<{ courseId: string; count: string }>()

    const enrollmentByCourse = new Map(enrollmentRows.map((r) => [r.courseId, Number(r.count)]))

    return courses.map((course) => ({
      courseId: course.id,
      title: course.title,
      priceMxn: course.priceMxn,
      enrolledCount: enrollmentByCourse.get(course.id) ?? 0,
    }))
  }

  // Lista de alumnos inscritos en un curso específico, con su progreso real (número de
  // módulos completados) para que el frontend calcule el porcentaje y si ya se certificó.
  async getCourseStudents(courseId: string) {
    const enrolledRows = await this.orderItemsRepo
      .createQueryBuilder("item")
      .innerJoin("item.order", "order")
      .select("DISTINCT order.userId", "userId")
      .where("item.courseId = :courseId", { courseId })
      .andWhere("order.status = :status", { status: "paid" })
      .getRawMany<{ userId: string }>()

    const userIds = enrolledRows.map((r) => r.userId)
    if (userIds.length === 0) return []

    const [users, progressRecords] = await Promise.all([
      this.usersRepo.find({ where: { id: In(userIds) } }),
      this.progressRepo.find({ where: { userId: In(userIds), courseId } }),
    ])

    const progressByUser = new Map(progressRecords.map((p) => [p.userId, p]))

    return users.map((user) => {
      const progress = progressByUser.get(user.id)
      const completedModules = (progress?.completedModules ?? []).filter(Boolean).map(Number)
      return {
        userId: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        completedModulesCount: completedModules.length,
      }
    })
  }
}
