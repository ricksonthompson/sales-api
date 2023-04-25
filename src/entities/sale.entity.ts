import { EPaymentMethod } from "@prisma/client";
import { v4 as uuid } from "uuid";

export class Sale {
  id: string;
  customer: string;
  flavor: string;
  quantity: number;
  unitaryValue: number;
  amount: number;
  paymentMethod: EPaymentMethod;
  createdAt: Date;
  updatedAt?: Date;

  constructor(props: Omit<Sale, "id" | "createdAt">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
