import { ItemStatus } from '../models/item-status.model'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name?: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.25)
  @Type(() => Number)
  price?: number

  @IsString()
  @IsNotEmpty()
  description?: string

  @IsOptional()
  @IsEnum(ItemStatus)
  status?: ItemStatus
}
