import { FiltersSaleDTO } from "../../dtos/sale/filtersSale.dto";
import { IQuerySale } from "../../dtos/sale/querySale.dto";
import { convertAndVerifyNumber } from "../../utils/Utils";

export function generateQueryByFiltersForSales(filters: FiltersSaleDTO): IQuerySale {

  const fields = {
    amount: () => ({
      amount: convertAndVerifyNumber(filters.amount)
    }),
    customer: () => ({
      customer: filters.customer 
    }),
    flavor: () => ({
      flavor: filters.flavor
    }),
    paymentMethod: () => ({
      paymentMethod: filters.paymentMethod
    }),
    quantity: () => ({
      quantity: filters.quantity
    }),
    unitaryValue: () => ({
      unitaryValue: filters.unitaryValue
    }),
  }

  const keysFields = Object.keys(fields);

  let query: IQuerySale;

  let queryBuilder: Function;

  for (const filter in filters) {
    
    if (keysFields.includes(filter)) {

      queryBuilder = fields[filter];

      if (query) { 
        const newCondition = queryBuilder();

        Object.assign(query, {...newCondition});
      } else {
        query = queryBuilder();
      }
    }
  }

  return query;
}
