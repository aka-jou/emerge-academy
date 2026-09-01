import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./users/user.entity"
import { Course } from "./courses/course.entity"
import { Order } from "./orders/order.entity"
import { OrderItem } from "./orders/order-item.entity"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { CoursesModule } from "./courses/courses.module"
import { OrdersModule } from "./orders/orders.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get<string>("DB_HOST", "localhost"),
        port: config.get<number>("DB_PORT", 5432),
        username: config.get<string>("DB_USERNAME", "emerge"),
        password: config.get<string>("DB_PASSWORD", "emerge"),
        database: config.get<string>("DB_DATABASE", "emerge_academy"),
        entities: [User, Course, Order, OrderItem],
        // Sólo para desarrollo: crea/actualiza tablas automáticamente. En producción,
        // usar migraciones de TypeORM en vez de synchronize.
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    OrdersModule,
  ],
})
export class AppModule {}
