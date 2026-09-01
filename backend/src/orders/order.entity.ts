import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../users/user.entity"
import { OrderItem } from "./order-item.entity"

export type OrderStatus = "paid" | "cancelled"

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User

  @Column()
  userId: string

  // Folio legible tipo EMG-2026-12345, mostrado en la confirmación de compra.
  @Column({ unique: true })
  folio: string

  @Column("int")
  subtotalMxn: number

  @Column("int", { default: 0 })
  discountMxn: number

  @Column("float", { default: 0.16 })
  taxRate: number

  @Column("int")
  totalMxn: number

  @Column({ nullable: true })
  couponCode?: string

  // Todo pago hoy es simulado: se marca "paid" al crear la orden. Reemplazar
  // por el webhook real de la pasarela de pagos cuando se integre.
  @Column({ default: "paid" })
  status: OrderStatus

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  items: OrderItem[]

  @CreateDateColumn()
  createdAt: Date
}
