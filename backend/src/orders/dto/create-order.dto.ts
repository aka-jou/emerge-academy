import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsOptional, IsString, Min, ValidateNested } from "class-validator"

export class OrderItemInputDto {
  @IsString()
  courseId: string

  @IsOptional()
  @Min(1)
  quantity?: number
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items: OrderItemInputDto[]

  @IsOptional()
  @IsString()
  couponCode?: string
}
