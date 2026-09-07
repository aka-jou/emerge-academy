import { IsDateString, IsOptional, IsString, IsUrl, MinLength } from "class-validator"

export class UpdateSessionDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string

  @IsOptional()
  @IsDateString()
  scheduledAt?: string

  @IsOptional()
  @IsUrl({ require_protocol: true })
  meetingUrl?: string
}
