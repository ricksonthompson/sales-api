import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Param, 
  Post, 
  Put, 
  Query
} from "@nestjs/common";
import { FiltersKanbanDTO } from "../dtos/kanban/filtersKanban.dto";
import { MappedKanbanDTO } from "../dtos/kanban/mappedKanban.dto";
import { Page, PageResponse } from "../configs/database/page.model";
import { Kanban } from "../entities/kanban.entity";
import { KanbanService } from "../services/kanban.service";
import { CreateKanbanDTO } from "../dtos/kanban/createKanban.dto";
import { UpdateKanbanDTO } from "../dtos/kanban/updateKanban.dto";

@Controller("/api/kanbans")
export class KanbanController {
  constructor(
    private readonly kanbanService: KanbanService
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateKanbanDTO): Promise<Kanban> {
    return await this.kanbanService.create(payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<Kanban> {
    return await this.kanbanService.delete(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() data: UpdateKanbanDTO): Promise<Kanban> {
    return await this.kanbanService.update(id, data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() page: Page, @Query() filters: FiltersKanbanDTO): Promise<PageResponse<MappedKanbanDTO>> {
    return await this.kanbanService.listAll(page, filters);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<Kanban> {
    return await this.kanbanService.listById(id);
  }
}
