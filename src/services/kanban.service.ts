import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Kanban } from "../entities/kanban.entity";
import IKanbanRepository from "../repositories/kanban/kanban.repository.contract";
import { Page, PageResponse } from "../configs/database/page.model";
import { FiltersKanbanDTO } from "../dtos/kanban/filtersKanban.dto";
import { MappedKanbanDTO } from "../dtos/kanban/mappedKanban.dto";
import { CreateKanbanDTO } from "../dtos/kanban/createKanban.dto";
import { UpdateKanbanDTO } from "../dtos/kanban/updateKanban.dto";

@Injectable()
export class KanbanService {
  constructor(
    @Inject("IKanbanRepository")
    private readonly kanbanRepository: IKanbanRepository
  ) { }

  async create(payload: CreateKanbanDTO): Promise<Kanban> {
    const kanban = await this.kanbanRepository.findBySequenceQr(payload.sequenceQr);
  
    if (kanban) throw new HttpException(
      `Já existe um kanban com o número de sequência informado: ${payload.sequenceQr}!`, 
      HttpStatus.CONFLICT
    );

    return await this.kanbanRepository.create(new Kanban(payload));
  }

  async delete(id: string): Promise<Kanban> {
    const kanban = await this.listById(id);

    return await this.kanbanRepository.delete(kanban.id);
  }

  async listById(id: string): Promise<Kanban> {
    const kanban = await this.kanbanRepository.findById(id);

    if (!kanban) throw new HttpException(`Não foi encontrado um kanban com o id: ${id}`, HttpStatus.NOT_FOUND);

    return kanban;
  }

  async listAll(page: Page, filters?: FiltersKanbanDTO): Promise<PageResponse<MappedKanbanDTO>> {

    const kanbans = await this.kanbanRepository.findAll(page, filters);

    if (kanbans.total === 0) {
      throw new HttpException("Não existe kanbans para esta pesquisa!", HttpStatus.NOT_FOUND);
    }

    const items = this.toDTO(kanbans.items);

    return {
      total: kanbans.total,
      items
    }
  }

  async update(id: string, data: UpdateKanbanDTO): Promise<Kanban> {

    const kanban = await this.listById(id);

    if (data.sequenceQr) {
      const kanban = await this.kanbanRepository.findBySequenceQr(data.sequenceQr);
  
      if (kanban && kanban.id !== id) throw new HttpException(
        `Já existe um kanban com o número de sequência informado: ${data.sequenceQr}!`, 
        HttpStatus.CONFLICT
      );
    }

    return await this.kanbanRepository.update(Object.assign(kanban, {...kanban, ...data}));
  }

  private toDTO(kanbans: Kanban[]): MappedKanbanDTO[] {
    return kanbans.map(kanban => {
      return {
        id: kanban.id,
        process: kanban.process,
        product: kanban.product,
        sequenceQr: kanban.sequenceQr,
        type: kanban.type,
        createdAt: kanban.createdAt
      }
    })
  }
}
