import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsPositive,
} from "class-validator";
import { EPaymentMethod } from "../../utils/ETypes";

export class CreateSaleDTO {
  @IsString()
  @IsNotEmpty()
  customer: string;

  @IsString()
  @IsNotEmpty()
  flavor: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsPositive()
  @IsNotEmpty()
  unitaryValue: number;

  @IsEnum(EPaymentMethod)
  @IsNotEmpty()
  paymentMethod: EPaymentMethod;
}
