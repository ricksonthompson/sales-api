import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { EKanbanType } from "../../utils/ETypes";

export class UpdateKanbanDTO {
  @IsString()
  @IsOptional()
  process?: string

  @IsString()
  @MaxLength(15)
  @IsOptional()
  product?: string

  @IsString()
  @IsOptional()
  sequenceQr?: number

  @IsEnum(EKanbanType)
  @MinLength(2)
  @MaxLength(3)
  @IsOptional()
  type?: EKanbanType
}
