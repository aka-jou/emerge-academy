import { User } from "./user.entity"

export type PublicUser = {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  cityCountry?: string
}

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    company: user.company,
    cityCountry: user.cityCountry,
  }
}
