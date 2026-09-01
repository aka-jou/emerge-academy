# Emerge Academy — Backend (NestJS + PostgreSQL)

API real que reemplaza el sistema simulado de `localStorage` del frontend:
usuarios reales con contraseña hasheada (bcrypt), sesión con JWT, catálogo
de cursos en base de datos y compras (checkout simulado: se marca "paid" al
instante; sustituir por una pasarela real cuando se integre).

## 1. Requisitos

- Node.js 18+
- Docker (para levantar Postgres) o una instancia de Postgres propia

## 2. Levantar Postgres

```bash
cd backend
docker compose up -d
```

Esto crea una base `emerge_academy` en `localhost:5432` con usuario/clave `emerge` / `emerge`.

## 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Cambia `JWT_SECRET` por un valor aleatorio largo antes de usar esto en producción.

## 4. Instalar dependencias

```bash
npm install
```

## 5. Sembrar el catálogo de cursos

Carga los 21 cursos que ya existían en `src/data/courses.ts` del frontend,
con precio calculado a partir de la duración (300 MXN/hora, la misma tarifa
demo que usaba el frontend).

```bash
npm run seed
```

Puedes volver a correrlo cuando quieras: actualiza los cursos existentes en vez de duplicarlos.

## 6. Arrancar el servidor

```bash
npm run start:dev
```

La API queda en `http://localhost:3001/api`.

## Endpoints principales

| Método | Ruta                  | Auth | Descripción                                  |
|--------|-----------------------|------|-----------------------------------------------|
| POST   | `/api/auth/register`  | No   | Crea cuenta real, devuelve JWT                |
| POST   | `/api/auth/login`     | No   | Inicia sesión, devuelve JWT                   |
| GET    | `/api/users/me`       | Sí   | Perfil del usuario autenticado                |
| PATCH  | `/api/users/me`       | Sí   | Actualiza nombre/teléfono/empresa/ciudad      |
| GET    | `/api/courses`        | No   | Catálogo completo de cursos                   |
| GET    | `/api/courses/:id`    | No   | Detalle de un curso                           |
| POST   | `/api/orders`         | Sí   | Checkout: crea la orden (pago simulado)       |
| GET    | `/api/orders/me`      | Sí   | Historial de compras del usuario              |
| GET    | `/api/orders/me/courses` | Sí | Cursos a los que el usuario tiene acceso    |

## Notas importantes antes de producción

- `synchronize: true` en `app.module.ts` es sólo para desarrollo; en producción usa migraciones de TypeORM.
- El pago es simulado: toda orden se marca `paid` de inmediato. Cuando integres Stripe/Mercado Pago, cambia `OrdersService.createOrder` para crear la orden en estado `pending` y confirmarla sólo desde el webhook de la pasarela.
- Agrega rate limiting (`@nestjs/throttler`) a `/auth/login` y `/auth/register` antes de exponer esto públicamente.
