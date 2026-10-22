import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
import { User } from "../users/user.entity"
import { Course } from "../courses/course.entity"
import { Order } from "../orders/order.entity"
import { OrderItem } from "../orders/order-item.entity"
import { getCatalogCourses } from "../courses/course-catalog"

dotenv.config()

async function run() {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? "emerge",
    password: process.env.DB_PASSWORD ?? "emerge",
    database: process.env.DB_DATABASE ?? "emerge_academy",
    entities: [User, Course, Order, OrderItem],
    synchronize: true,
  })

  await dataSource.initialize()
  const coursesRepo = dataSource.getRepository(Course)

  let created = 0
  let updated = 0

  for (const item of getCatalogCourses()) {
    const existing = await coursesRepo.findOne({ where: { id: item.id } })
    if (existing) {
      coursesRepo.merge(existing, item)
      await coursesRepo.save(existing)
      updated++
    } else {
      await coursesRepo.save(coursesRepo.create(item))
      created++
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Seed completo: ${created} cursos creados, ${updated} actualizados.`)
  await dataSource.destroy()
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Error al sembrar la base de datos:", err)
  process.exit(1)
})
