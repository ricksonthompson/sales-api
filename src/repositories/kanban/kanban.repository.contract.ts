import { FiltersKanbanDTO } from "../../dtos/kanban/filtersKanban.dto";
import { Page, PageResponse } from "../../configs/database/page.model";
import { Kanban } from "../../entities/kanban.entity";

export default interface IKanbanRepository {
  create(data: Kanban): Promise<Kanban>
  delete(id: string): Promise<Kanban>
  findAll(page: Page, filters?: FiltersKanbanDTO): Promise<PageResponse<Kanban>>
  findById(id: string): Promise<Kanban>
  findBySequenceQr(sequenceQr: number): Promise<Kanban>
  update(data: Kanban): Promise<Kanban>
}
