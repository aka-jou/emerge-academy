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

  app.enableCors({
    origin: config.get<string>("FRONTEND_ORIGIN", "http://localhost:5173"),
    credentials: true,
  })

  app.setGlobalPrefix("api")

  const port = config.get<number>("PORT", 3001)
  await app.listen(port)
  // eslint-disable-next-line no-console
  console.log(`Emerge Academy API escuchando en http://localhost:${port}/api`)
}

bootstrap()
