import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Order } from "./order.entity"
import { OrderItem } from "./order-item.entity"
import { CoursesService } from "../courses/courses.service"
import { CreateOrderDto } from "./dto/create-order.dto"

const TAX_RATE = 0.16 // IVA México
const WELCOME_COUPON = "BIENVENIDA10"
const WELCOME_DISCOUNT_RATE = 0.1

function buildFolio() {
  const year = new Date().getFullYear()
  const suffix = Math.floor(10000 + Math.random() * 89999)
  return `EMG-${year}-${suffix}`
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    private readonly coursesService: CoursesService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    const courseIds = dto.items.map((item) => item.courseId)
    const courses = await this.coursesService.findByIds(courseIds)

    if (courses.length !== new Set(courseIds).size) {
      throw new BadRequestException("Uno o más cursos del carrito ya no están disponibles.")
    }

    const items = dto.items.map((line) => {
      const course = courses.find((c) => c.id === line.courseId)!
      const quantity = line.quantity && line.quantity > 0 ? line.quantity : 1
      const item = new OrderItem()
      item.courseId = course.id
      item.quantity = quantity
      item.unitPriceMxn = course.priceMxn
      return item
    })

    const subtotalMxn = items.reduce((sum, item) => sum + item.unitPriceMxn * item.quantity, 0)
    const couponCode = dto.couponCode?.trim().toUpperCase() || undefined
    const discountMxn = couponCode === WELCOME_COUPON ? Math.round(subtotalMxn * WELCOME_DISCOUNT_RATE) : 0
    const taxableMxn = subtotalMxn - discountMxn
    const totalMxn = Math.round(taxableMxn * (1 + TAX_RATE))

    const order = this.ordersRepo.create({
      userId,
      folio: buildFolio(),
      subtotalMxn,
      discountMxn,
      taxRate: TAX_RATE,
      totalMxn,
      couponCode,
      // Pago simulado: se confirma inmediatamente como "paid". Sustituir por el
      // resultado real de la pasarela (webhook) cuando se integre un proveedor.
      status: "paid",
      items,
    })

    return this.ordersRepo.save(order)
  }

  findAllForUser(userId: string) {
    return this.ordersRepo.find({ where: { userId }, order: { createdAt: "DESC" } })
  }

  async findEnrolledCourseIds(userId: string): Promise<string[]> {
    const orders = await this.ordersRepo.find({ where: { userId, status: "paid" } })
    const ids = new Set<string>()
    for (const order of orders) {
      for (const item of order.items) ids.add(item.courseId)
    }
    return Array.from(ids)
  }
}
