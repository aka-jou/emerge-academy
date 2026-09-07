import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LiveSession } from "./live-session.entity"
import { SessionsService } from "./sessions.service"
import { SessionsController } from "./sessions.controller"
import { OrdersModule } from "../orders/orders.module"

@Module({
  imports: [TypeOrmModule.forFeature([LiveSession]), OrdersModule],
  providers: [SessionsService],
  controllers: [SessionsController],
})
export class SessionsModule {}
