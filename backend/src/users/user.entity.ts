import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Order } from "../orders/order.entity"

export type UserRole = "student" | "admin"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  passwordHash: string

  // "admin" puede programar sesiones en vivo para los cursos (ver módulo sessions). Se
  // asigna automáticamente a las cuentas cuyo correo esté en la variable de entorno
  // ADMIN_EMAILS del backend (ver auth.service.ts); no hay panel para asignarlo desde la UI.
  @Column({ default: "student" })
  role: UserRole

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  company?: string

  @Column({ nullable: true })
  jobTitle?: string

  @Column({ nullable: true })
  industry?: string

  @Column({ nullable: true })
  rfc?: string

  @Column({ type: "date", nullable: true })
  birthDate?: string

  @Column({ nullable: true })
  educationLevel?: string

  @Column({ type: "int", nullable: true })
  yearsExperience?: number

  @Column({ nullable: true })
  referralSource?: string

  @Column({ nullable: true })
  cityCountry?: string

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
