import { Injectable } from "@nestjs/common";
import { FiltersKanbanDTO } from "../../dtos/kanban/filtersKanban.dto";
import { Page, PageResponse } from "../../configs/database/page.model";
import { Pageable } from "../../configs/database/pageable.service";
import { PrismaService } from "../../configs/database/prisma.service";
import { Kanban } from "../../entities/kanban.entity";
import IKanbanRepository from "./kanban.repository.contract";
import { getDateInLocaleTime } from "../../utils/date.service";
import { generateQueryByFiltersForKanbans } from "../../configs/database/Queries";

@Injectable()
export class KanbanRepository extends Pageable<Kanban> implements IKanbanRepository {
  constructor(
    private readonly repository: PrismaService
  ) {
    super()
  }

  delete(id: string): Promise<Kanban> {
    return this.repository.kanban.delete({
      where: { id }
    });
  }

  update(data: Kanban): Promise<Kanban> {
    return this.repository.kanban.update({
      data: {
        id: data.id,
        sequenceQr: data.sequenceQr,
        type: data.type,
        product: data.product,
        process: data.process,
        createdAt: getDateInLocaleTime(new Date()),
        updatedAt: getDateInLocaleTime(new Date())
      },
      where: { id: data.id }
    })
  }

  findById(id: string): Promise<Kanban> {
    return this.repository.kanban.findUnique({
      where: { id }
    })
  }

  async findAll(page: Page, filters: FiltersKanbanDTO): Promise<PageResponse<Kanban>> {

    const condition = generateQueryByFiltersForKanbans(filters);

    const items = condition ? await this.repository.kanban.findMany({
      ...this.buildPage(page),
      where: condition
    }) : await this.repository.kanban.findMany({
      ...this.buildPage(page)
    });

    const total = condition ? await this.repository.kanban.findMany({
      where: {
        ...condition
      }
    }) : await this.repository.kanban.count();

    return this.buildPageResponse(items, Array.isArray(total) ? total.length : total);
  }

  findBySequenceQr(sequenceQr: number): Promise<Kanban> {
    return this.repository.kanban.findFirst({ 
      where: {
        sequenceQr
      }        
    })
  }

  create(data: Kanban): Promise<Kanban> {
    return this.repository.kanban.create({
      data: {
        id: data.id,
        sequenceQr: data.sequenceQr,
        type: data.type,
        product: data.product,
        process: data.process
      }
    });
  }
}