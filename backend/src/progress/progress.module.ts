import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CourseProgress } from "./course-progress.entity"
import { ProgressService } from "./progress.service"
import { ProgressController } from "./progress.controller"
import { OrdersModule } from "../orders/orders.module"

@Module({
  imports: [TypeOrmModule.forFeature([CourseProgress]), OrdersModule],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}
