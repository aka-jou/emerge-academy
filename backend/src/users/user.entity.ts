import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Order } from "../orders/order.entity"

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

  @Column({ nullable: true })
  cityCountry?: string

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
