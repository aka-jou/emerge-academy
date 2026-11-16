import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./users/user.entity"
import { Course } from "./courses/course.entity"
import { Order } from "./orders/order.entity"
import { OrderItem } from "./orders/order-item.entity"
import { CourseProgress } from "./progress/course-progress.entity"
import { LiveSession } from "./sessions/live-session.entity"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { CoursesModule } from "./courses/courses.module"
import { OrdersModule } from "./orders/orders.module"
import { ProgressModule } from "./progress/progress.module"
import { SessionsModule } from "./sessions/sessions.module"
import { AdminModule } from "./admin/admin.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const entities = [User, Course, Order, OrderItem, CourseProgress, LiveSession]
        // En Railway (y la mayoría de hostings) Postgres se entrega como DATABASE_URL.
        // Si no existe, se usan las variables DB_* del entorno local.
        const url = config.get<string>("DATABASE_URL")
        const ssl = config.get<string>("DB_SSL") === "true" ? { rejectUnauthorized: false } : false
        const common = {
          type: "postgres" as const,
          entities,
          ssl,
          // Crea/actualiza tablas automáticamente. Suficiente para pruebas; para producción
          // estable conviene pasar a migraciones de TypeORM.
          synchronize: true,
        }
        if (url) return { ...common, url }
        return {
          ...common,
          host: config.get<string>("DB_HOST", "localhost"),
          port: Number(config.get<string>("DB_PORT", "5432")),
          username: config.get<string>("DB_USERNAME", "emerge"),
          password: config.get<string>("DB_PASSWORD", "emerge"),
          database: config.get<string>("DB_DATABASE", "emerge_academy"),
        }
      },
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    OrdersModule,
    ProgressModule,
    SessionsModule,
    AdminModule,
  ],
})
export class AppModule {}
