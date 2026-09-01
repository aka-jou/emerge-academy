import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order.entity"
import { Course } from "../courses/course.entity"

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "orderId" })
  order: Order

  @Column()
  orderId: string

  @ManyToOne(() => Course, { eager: true, onDelete: "RESTRICT" })
  @JoinColumn({ name: "courseId" })
  course: Course

  @Column()
  courseId: string

  @Column("int")
  quantity: number

  // Precio unitario congelado al momento de la compra (no cambia si luego sube el precio del curso).
  @Column("int")
  unitPriceMxn: number
}
