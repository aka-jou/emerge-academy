import { IsOptional, IsString, MinLength } from "class-validator"

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
  @IsString()
  cityCountry?: string
}
