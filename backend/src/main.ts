import "reflect-metadata"
import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )

  // FRONTEND_ORIGIN acepta varias URLs separadas por coma (p. ej. dominio de Vercel + localhost).
  const origins = config
    .get<string>("FRONTEND_ORIGIN", "http://localhost:3000")
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean)
  app.enableCors({ origin: origins, credentials: true })

  app.setGlobalPrefix("api")

  const port = Number(config.get<string>("PORT", "3002"))
  await app.listen(port, "0.0.0.0")
  // eslint-disable-next-line no-console
  console.log(`Emerge Academy API escuchando en http://localhost:${port}/api`)
}

bootstrap()
