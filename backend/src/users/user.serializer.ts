import { User } from "./user.entity"

export type PublicUser = {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  industry?: string
  rfc?: string
  birthDate?: string
  educationLevel?: string
  yearsExperience?: number
  referralSource?: string
  cityCountry?: string
}

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    company: user.company,
    jobTitle: user.jobTitle,
    industry: user.industry,
    rfc: user.rfc,
    birthDate: user.birthDate,
    educationLevel: user.educationLevel,
    yearsExperience: user.yearsExperience,
    referralSource: user.referralSource,
    cityCountry: user.cityCountry,
  }
}
