import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { EPaymentMethod } from "src/utils/ETypes";

export class UpdateSaleDTO {
  @IsString()
  @IsOptional()
  customer?: string;

  @IsString()
  @IsOptional()
  flavor?: string;

  @IsInt()
  @IsOptional()
  quantity?: number;

  @IsPositive()
  @IsOptional()
  unitaryValue?: number;

  @IsEnum(EPaymentMethod)
  @IsOptional()
  paymentMethod?: EPaymentMethod;
}
