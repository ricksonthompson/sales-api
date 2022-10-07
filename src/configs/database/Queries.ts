import { FiltersKanbanDTO } from "../../dtos/kanban/filtersKanban.dto";
import { IQueryKanban } from "../../dtos/kanban/queryKanban.dto";
import { convertAndVerifyNumber } from "../../utils/Utils";

export function generateQueryByFiltersForKanbans(filters: FiltersKanbanDTO): IQueryKanban {

  const fields = {
    sequenceQr: () => ({
      sequenceQr: convertAndVerifyNumber(filters.sequenceQr)
    }),
    process: () => ({
      process: filters.process 
    }),
    type: () => ({
      type: filters.type
    }),
    product: () => ({
      product: filters.product
    }),
  }

  const keysFields = Object.keys(fields);

  let query: IQueryKanban;

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
