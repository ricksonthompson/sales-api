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
  Query,
} from "@nestjs/common";
import { FiltersSaleDTO } from "../dtos/sale/filtersSale.dto";
import { MappedSaleDTO } from "../dtos/sale/mappedSale.dto";
import { Page, PageResponse } from "../configs/database/page.model";
import { Sale } from "../entities/sale.entity";
import { SaleService } from "../services/sale.service";
import { CreateSaleDTO } from "../dtos/sale/createSale.dto";
import { UpdateSaleDTO } from "../dtos/sale/updateSale.dto";

@Controller("/api/sales")
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateSaleDTO): Promise<Sale> {
    return await this.saleService.create(payload);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id") id: string): Promise<Sale> {
    return await this.saleService.delete(id);
  }

  @Put("/:id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id") id: string,
    @Body() data: UpdateSaleDTO
  ): Promise<Sale> {
    return await this.saleService.update(id, data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() page: Page,
    @Query() filters: FiltersSaleDTO
  ): Promise<PageResponse<MappedSaleDTO>> {
    return await this.saleService.listAll(page, filters);
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  async getById(@Param("id") id: string): Promise<Sale> {
    return await this.saleService.listById(id);
  }
}
