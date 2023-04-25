import { EPaymentMethod } from "../../utils/ETypes";

export class FiltersSaleDTO {
  customer?: string;
  flavor?: string;
  quantity?: number;
  unitaryValue?: number;
  amount?: number;
  paymentMethod?: EPaymentMethod;
}
