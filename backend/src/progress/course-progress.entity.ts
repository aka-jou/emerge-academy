import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

// Progreso real por (usuario, curso). Cada curso tiene "módulos" (definidos en el catálogo
// del frontend, src/data/courses.ts -> courseDetails); aquí solo guardamos qué números de
// módulo ha marcado como completados el usuario. El total de módulos de cada curso vive en
// el frontend, así que el porcentaje se calcula ahí (completedModules.length / totalModules).
@Entity("course_progress")
@Index(["userId", "courseId"], { unique: true })
export class CourseProgress {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @Column()
  courseId: string

  // Lista de números de módulo (1-indexados) que el usuario ya marcó como completados.
  @Column("simple-array", { default: "" })
  completedModules: string[]

  @UpdateDateColumn()
  updatedAt: Date
}
