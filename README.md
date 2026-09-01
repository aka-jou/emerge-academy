# emerge-academy

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_1Bfk4ecD947iumQxIQFtTCM01tJ7)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

## Usuarios reales, perfil y compra de cursos

El frontend (Vite + React, en `src/`) ya no simula usuarios con `localStorage`.
Habla con un backend real en `backend/` (NestJS + PostgreSQL) que maneja
registro/login con JWT, perfil editable, catálogo de cursos y compras
(checkout simulado por ahora: se marca "paid" al instante).

### Arrancar todo en local

1. Backend — sigue `backend/README.md` (levantar Postgres, sembrar cursos, `npm run start:dev`). Queda en `http://localhost:3001/api`.
2. Frontend:
   ```bash
   cp .env.example .env   # VITE_API_URL apuntando al backend
   npm install
   npm run dev
   ```
3. Regístrate desde `/registro` con un correo real (la cuenta de prueba `alumno@emerge.com` ya no existe: ahora toda cuenta se crea de verdad en la base de datos).

### Qué es real y qué sigue simulado

- **Real:** cuentas de usuario (contraseña con bcrypt), sesión JWT, perfil (nombre/teléfono/empresa/ciudad), catálogo de cursos en base de datos, historial de compras y cursos inscritos.
- **Simulado:** el pago en sí (toda orden se confirma "paid" de inmediato, sin cobrar tarjeta real — ver nota en `backend/README.md` sobre integrar Stripe/Mercado Pago). El dashboard de progreso, sesiones en vivo, certificados y descargas del panel del estudiante siguen usando datos de ejemplo (`src/data/dashboard.ts`); conectarlos a datos reales de avance por lección es un siguiente paso más grande, fuera de esta primera integración.

