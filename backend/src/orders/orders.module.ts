import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Order } from "./order.entity"
import { OrderItem } from "./order-item.entity"
import { OrdersService } from "./orders.service"
import { OrdersController } from "./orders.controller"
import { CoursesModule } from "../courses/courses.module"

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), CoursesModule],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
