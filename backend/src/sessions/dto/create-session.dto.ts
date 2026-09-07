import { IsDateString, IsString, IsUrl, MinLength } from "class-validator"

export class CreateSessionDto {
  @IsString()
  @MinLength(1)
  courseId: string

  @IsString()
  @MinLength(3)
  title: string

  @IsDateString()
  scheduledAt: string

  @IsUrl({ require_protocol: true })
  meetingUrl: string
}
