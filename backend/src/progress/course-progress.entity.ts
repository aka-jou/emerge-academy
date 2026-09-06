import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

// Progreso real por (usuario, curso). Cada curso tiene "módulos" (definidos en el catálogo
// del frontend, src/data/courses.ts -> courseDetails); aquí solo guardamos qué números de
// módulo ha marcado como completados el usuario, y la última puntuación obtenida en el
// cuestionario de cada módulo (si el módulo tiene uno). El total de módulos y las preguntas
// del cuestionario viven en el frontend; el backend solo aplica dos reglas de negocio: no se
// puede completar un módulo sin haber completado el anterior, y si el módulo tiene
// cuestionario, no se marca como completado a menos que la puntuación alcance el mínimo.
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

  // Última puntuación (0-100) obtenida en el cuestionario de cada módulo, por número de
  // módulo. Ej: {"1": 100, "3": 60}.
  @Column("jsonb", { default: () => "'{}'" })
  moduleScores: Record<string, number>

  @UpdateDateColumn()
  updatedAt: Date
}
