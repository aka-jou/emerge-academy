import { IsDateString, IsInt, IsOptional, IsString, Max, Min, MinLength } from "class-validator"

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  company?: string

  @IsOptional()
  @IsString()
  jobTitle?: string

  @IsOptional()
  @IsString()
  industry?: string

  @IsOptional()
  @IsString()
  rfc?: string

  @IsOptional()
  @IsDateString()
  birthDate?: string

  @IsOptional()
  @IsString()
  educationLevel?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  yearsExperience?: number

  @IsOptional()
  @IsString()
  referralSource?: string

  @IsOptional()
  @IsString()
  cityCountry?: string
}
