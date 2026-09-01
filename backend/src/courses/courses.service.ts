import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Course } from "./course.entity"

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private readonly coursesRepo: Repository<Course>) {}

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
