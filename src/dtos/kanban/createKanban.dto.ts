import { IsString, IsEnum, MinLength, MaxLength, IsNotEmpty } from "class-validator";
import { EKanbanType } from "../../utils/ETypes";

export class CreateKanbanDTO {
  @IsString()
  @IsNotEmpty()
  process: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  product: string

  @IsString()
  @IsNotEmpty()
  sequenceQr: number

  @IsEnum(EKanbanType)
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(3)
  type: EKanbanType
}
