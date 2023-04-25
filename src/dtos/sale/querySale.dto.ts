import { EPaymentMethod } from "../../utils/ETypes";

export interface IQuerySale {
  customer?: string;
  flavor?: string;
  quantity?: number;
  unitaryValue?: number;
  amount?: number;
  paymentMethod?: EPaymentMethod;
}
