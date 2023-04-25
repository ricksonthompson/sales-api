import { Injectable } from "@nestjs/common";
import { FiltersSaleDTO } from "../../dtos/sale/filtersSale.dto";
import { Page, PageResponse } from "../../configs/database/page.model";
import { Pageable } from "../../configs/database/pageable.service";
import { PrismaService } from "../../configs/database/prisma.service";
import { Sale } from "../../entities/sale.entity";
import ISaleRepository from "./sale.repository.contract";
import { getDateInLocaleTime } from "../../utils/date.service";
import { generateQueryByFiltersForSales } from "../../configs/database/Queries";

@Injectable()
export class SaleRepository extends Pageable<Sale> implements ISaleRepository {
  constructor(private readonly repository: PrismaService) {
    super();
  }

  delete(id: string): Promise<Sale> {
    return this.repository.sale.delete({
      where: { id },
    });
  }

  update(data: Sale): Promise<Sale> {
    return this.repository.sale.update({
      data: {
        id: data.id,
        amount: data.amount,
        customer: data.customer,
        flavor: data.flavor,
        paymentMethod: data.paymentMethod,
        quantity: data.quantity,
        unitaryValue: data.unitaryValue,
        createdAt: getDateInLocaleTime(new Date()),
        updatedAt: getDateInLocaleTime(new Date()),
      },
      where: { id: data.id },
    });
  }

  findById(id: string): Promise<Sale> {
    return this.repository.sale.findUnique({
      where: { id },
    });
  }

  async findAll(
    page: Page,
    filters: FiltersSaleDTO
  ): Promise<PageResponse<Sale>> {
    const condition = generateQueryByFiltersForSales(filters);

    const items = condition
      ? await this.repository.sale.findMany({
          ...this.buildPage(page),
          where: condition,
        })
      : await this.repository.sale.findMany({
          ...this.buildPage(page),
        });

    const total = condition
      ? await this.repository.sale.findMany({
          where: {
            ...condition,
          },
        })
      : await this.repository.sale.count();

    return this.buildPageResponse(
      items,
      Array.isArray(total) ? total.length : total
    );
  }

  create(data: Sale): Promise<Sale> {
    return this.repository.sale.create({
      data: {
        id: data.id,
        amount: data.amount,
        customer: data.customer,
        flavor: data.flavor,
        paymentMethod: data.paymentMethod,
        quantity: data.quantity,
        unitaryValue: data.quantity,
        createdAt: getDateInLocaleTime(new Date()),
      },
    });
  }
}
