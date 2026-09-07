import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

// Sesión en vivo programada por un administrador para un curso del catálogo (el id de curso
// es el mismo slug usado en src/data/courses.ts del frontend, igual que en Course/Order).
// El link de la reunión se genera hoy manualmente en Google Meet y solo se pega aquí
// (ver conversación: "Opción A" del flujo de programación de sesiones).
@Entity("live_sessions")
export class LiveSession {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  courseId: string

  @Column()
  title: string

  @Column({ type: "timestamptz" })
  scheduledAt: Date

  @Column()
  meetingUrl: string

  @Column({ nullable: true })
  createdByUserId?: string

  @CreateDateColumn()
  createdAt: Date
}
