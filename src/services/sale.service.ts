import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Sale } from "../entities/sale.entity";
import ISaleRepository from "../repositories/sale/sale.repository.contract";
import { Page, PageResponse } from "../configs/database/page.model";
import { FiltersSaleDTO } from "../dtos/sale/filtersSale.dto";
import { MappedSaleDTO } from "../dtos/sale/mappedSale.dto";
import { CreateSaleDTO } from "../dtos/sale/createSale.dto";
import { UpdateSaleDTO } from "../dtos/sale/updateSale.dto";

@Injectable()
export class SaleService {
  constructor(
    @Inject("ISaleRepository")
    private readonly saleRepository: ISaleRepository
  ) {}

  async create(props: CreateSaleDTO): Promise<Sale> {
    const { quantity, unitaryValue } = props;
    const amount = unitaryValue * quantity;

    const sale = await this.saleRepository.create(
      new Sale({ ...props, amount })
    );

    return this.mapperOne(sale);
  }

  async delete(id: string): Promise<Sale> {
    const sale = await this.listById(id);

    return await this.saleRepository.delete(sale.id);
  }

  async listById(id: string): Promise<Sale> {
    const sale = await this.saleRepository.findById(id);

    if (!sale)
      throw new HttpException(
        "A venda não foi encontrada!",
        HttpStatus.NOT_FOUND
      );

    return this.mapperOne(sale);
  }

  async listAll(
    page: Page,
    filters?: FiltersSaleDTO
  ): Promise<PageResponse<MappedSaleDTO>> {
    const sales = await this.saleRepository.findAll(page, filters);

    if (sales.total === 0) {
      throw new HttpException(
        "Não existe vendas para esta pesquisa!",
        HttpStatus.NOT_FOUND
      );
    }

    const items = this.mapperMany(sales.items);

    return {
      total: sales.total,
      items,
    };
  }

  async update(id: string, data: UpdateSaleDTO): Promise<Sale> {
    const sale = await this.listById(id);

    if (data.unitaryValue && data.unitaryValue !== sale.unitaryValue) {
      sale.amount = data.unitaryValue * (data.quantity || sale.quantity);
    }

    if (data.quantity && data.quantity !== sale.quantity) {
      sale.amount = (data.unitaryValue || sale.unitaryValue) * data.quantity;
    }

    console.log(sale);

    const updatedSale = await this.saleRepository.update(
      Object.assign(sale, data)
    );

    return this.mapperOne(updatedSale);
  }

  private mapperOne(sale: Sale): MappedSaleDTO {
    return {
      id: sale.id,
      customer: sale.customer,
      flavor: sale.flavor,
      quantity: sale.quantity,
      unitaryValue: sale.unitaryValue,
      amount: sale.amount,
      paymentMethod: sale.paymentMethod,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    };
  }

  private mapperMany(sales: Sale[]): MappedSaleDTO[] {
    return sales.map((sale) => {
      return {
        id: sale.id,
        customer: sale.customer,
        flavor: sale.flavor,
        quantity: sale.quantity,
        unitaryValue: sale.unitaryValue,
        amount: sale.amount,
        paymentMethod: sale.paymentMethod,
        createdAt: sale.createdAt,
        updatedAt: sale.updatedAt,
      };
    });
  }
}
