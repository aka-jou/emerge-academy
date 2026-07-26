export type ProfileInfo = {
  fullName: string
  email: string
  phone: string
  company: string
  cityCountry: string
}

// Datos precargados del perfil del estudiante (coinciden con la cuenta demo).
export const profileInfo: ProfileInfo = {
  fullName: "María Fernanda González Ríos",
  email: "alumno@emerge.com",
  phone: "+52 55 1234 5678",
  company: "Energía Renovable del Golfo S.A.",
  cityCountry: "Ciudad de México, México",
}

export type PaymentMethod = "PayPal" | "Tarjeta de crédito" | "Transferencia"

export type Invoice = {
  id: string
  date: string
  course: string
  method: PaymentMethod
  amount: string
}

// Historial de pagos y facturación para control de gastos empresariales/personales.
export const invoices: Invoice[] = [
  {
    id: "FAC-2026-08842",
    date: "25 nov 2026",
    course: "Trabajo Seguro en Alturas",
    method: "Tarjeta de crédito",
    amount: "$8,500.00 MXN",
  },
  {
    id: "FAC-2026-07215",
    date: "03 oct 2026",
    course: "Comando en Tácticas y Estrategias de Brigadas Contra Incendios",
    method: "PayPal",
    amount: "$6,200.00 MXN",
  },
  {
    id: "FAC-2026-06530",
    date: "18 ago 2026",
    course: "Espacios Confinados",
    method: "Transferencia",
    amount: "$4,100.00 MXN",
  },
  {
    id: "FAC-2026-05122",
    date: "29 may 2026",
    course: "Primeros Auxilios",
    method: "Tarjeta de crédito",
    amount: "$3,750.00 MXN",
  },
]
