import { Injectable, Logger, NotFoundException, OnModuleInit } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Course } from "./course.entity"
import { getCatalogCourses } from "./course-catalog"

@Injectable()
export class CoursesService implements OnModuleInit {
  private readonly logger = new Logger(CoursesService.name)

  constructor(@InjectRepository(Course) private readonly coursesRepo: Repository<Course>) {}

  // Al arrancar, sincroniza el catálogo con la base de datos (crea los cursos que falten y
  // actualiza los existentes). Así una base de datos nueva —local, Docker o Railway— ya
  // tiene los 21 cursos sin tener que correr `npm run seed`, y las compras no fallan con
  // "Uno o más cursos del carrito ya no están disponibles".
  async onModuleInit() {
    const catalog = getCatalogCourses()
    await this.coursesRepo.save(catalog.map((item) => this.coursesRepo.create(item)))
    this.logger.log(`Catálogo sincronizado: ${catalog.length} cursos.`)
  }

  findAll() {
    return this.coursesRepo.find({ order: { title: "ASC" } })
  }

  async findById(id: string) {
    const course = await this.coursesRepo.findOne({ where: { id } })
    if (!course) throw new NotFoundException(`Curso "${id}" no encontrado.`)
    return course
  }

  async findByIds(ids: string[]) {
    if (ids.length === 0) return []
    return this.coursesRepo
      .createQueryBuilder("course")
      .where("course.id IN (:...ids)", { ids })
      .getMany()
  }
}
