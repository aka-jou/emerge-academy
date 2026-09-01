import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
import { User } from "../users/user.entity"
import { Course } from "../courses/course.entity"
import { Order } from "../orders/order.entity"
import { OrderItem } from "../orders/order-item.entity"
import coursesSeed from "./courses-seed.json"

dotenv.config()

// Misma tarifa de referencia que usaba el frontend (src/lib/cart.tsx) para el precio demo.
const RATE_MXN_PER_HOUR = 300

function estimatePrice(duration: string): number {
  const hours = parseInt(duration, 10) || 0
  return hours * RATE_MXN_PER_HOUR
}

type SeedCourse = {
  id: string
  type: string
  standard: string
  title: string
  description: string
  duration: string
  requirement: string
  venue: string
  online?: boolean
  action: string
  image: string
}

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

  const seed = coursesSeed as SeedCourse[]
  let created = 0
  let updated = 0

  for (const item of seed) {
    const existing = await coursesRepo.findOne({ where: { id: item.id } })
    const priceMxn = estimatePrice(item.duration)

    if (existing) {
      coursesRepo.merge(existing, { ...item, online: item.online ?? false, priceMxn })
      await coursesRepo.save(existing)
      updated++
    } else {
      const course = coursesRepo.create({ ...item, online: item.online ?? false, priceMxn })
      await coursesRepo.save(course)
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
