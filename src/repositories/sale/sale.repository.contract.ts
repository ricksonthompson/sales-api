import { FiltersSaleDTO } from "../../dtos/sale/filtersSale.dto";
import { Page, PageResponse } from "../../configs/database/page.model";
import { Sale } from "../../entities/sale.entity";

export default interface ISaleRepository {
  create(data: Sale): Promise<Sale>;
  delete(id: string): Promise<Sale>;
  findAll(page: Page, filters?: FiltersSaleDTO): Promise<PageResponse<Sale>>;
  findById(id: string): Promise<Sale>;
  update(data: Sale): Promise<Sale>;
}
