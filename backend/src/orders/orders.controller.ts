import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { CurrentUser } from "../auth/current-user.decorator"
import { OrdersService } from "./orders.service"
import { CreateOrderDto } from "./dto/create-order.dto"
import { CoursesService } from "../courses/courses.service"

@Controller("orders")
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly coursesService: CoursesService,
  ) {}

  // Checkout: crea la orden y la marca pagada (pago simulado por ahora).
  @Post()
  create(@CurrentUser() user: { userId: string }, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(user.userId, dto)
  }

  @Get("me")
  findMine(@CurrentUser() user: { userId: string }) {
    return this.ordersService.findAllForUser(user.userId)
  }

  // Cursos a los que el usuario tiene acceso por haberlos comprado (para el dashboard).
  @Get("me/courses")
  async myCourses(@CurrentUser() user: { userId: string }) {
    const ids = await this.ordersService.findEnrolledCourseIds(user.userId)
    return this.coursesService.findByIds(ids)
  }
}
