import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Course } from "../courses/course.entity"
import { Order } from "../orders/order.entity"
import { OrderItem } from "../orders/order-item.entity"
import { CourseProgress } from "../progress/course-progress.entity"
import { User } from "../users/user.entity"
import { LiveSession } from "../sessions/live-session.entity"
import { AdminService } from "./admin.service"
import { AdminController } from "./admin.controller"

@Module({
  imports: [TypeOrmModule.forFeature([Course, Order, OrderItem, CourseProgress, User, LiveSession])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
