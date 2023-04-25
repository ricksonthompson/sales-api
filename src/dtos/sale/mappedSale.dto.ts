import { EPaymentMethod } from "@prisma/client";

export class MappedSaleDTO {
  id: string;
  customer: string;
  flavor: string;
  quantity: number;
  unitaryValue: number;
  amount: number;
  paymentMethod: EPaymentMethod;
  createdAt: Date;
  updatedAt?: Date;
}
