import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator"

const INDUSTRIES = [
  "Energía eólica",
  "Energía solar",
  "Industrial / Manufactura",
  "Construcción",
  "Oil & Gas",
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
}
