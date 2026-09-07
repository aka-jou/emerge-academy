import { IsDateString, IsEmail, IsIn, IsInt, IsOptional, IsString, Max, Min, MinLength } from "class-validator"

const INDUSTRIES = [
  "Energía eólica",
  "Energía solar",
  "Industrial / Manufactura",
  "Construcción",
  "Oil & Gas",
  "Otro",
] as const

const EDUCATION_LEVELS = ["Secundaria", "Bachillerato / Preparatoria", "Técnico", "Licenciatura", "Posgrado", "Otro"] as const

const REFERRAL_SOURCES = [
  "Recomendación",
  "Redes sociales",
  "Búsqueda en Google",
  "Cliente o empresa anterior",
  "Evento o feria",
  "Otro",
] as const

export class RegisterDto {
  @IsString()
  @MinLength(2)
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  // Datos de la empresa: requeridos para reflejar que la mayoría de las cuentas en la
  // plataforma corresponden a personal que capacita a nombre de una empresa, no a
  // particulares. El resto de los campos empresariales quedan opcionales.
  @IsString()
  @MinLength(2)
  company: string

  @IsString()
  @MinLength(10)
  phone: string

  @IsOptional()
  @IsString()
  jobTitle?: string

  @IsOptional()
  @IsIn(INDUSTRIES)
  industry?: (typeof INDUSTRIES)[number]

  @IsOptional()
  @IsString()
  rfc?: string

  // Datos personales/profesionales adicionales, todos opcionales.
  @IsOptional()
  @IsDateString()
  birthDate?: string

  @IsOptional()
  @IsIn(EDUCATION_LEVELS)
  educationLevel?: (typeof EDUCATION_LEVELS)[number]

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  yearsExperience?: number

  @IsOptional()
  @IsIn(REFERRAL_SOURCES)
  referralSource?: (typeof REFERRAL_SOURCES)[number]
}
