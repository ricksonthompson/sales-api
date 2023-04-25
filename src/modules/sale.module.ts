import { Module } from "@nestjs/common";
import { SaleRepository } from "../repositories/sale/sale.repository";
import { SaleController } from "../controllers/sale.controller";
import { SaleService } from "../services/sale.service";

@Module({
  controllers: [SaleController],
  providers: [
    SaleService,
    {
      provide: "ISaleRepository",
      useClass: SaleRepository,
    },
  ],
  exports: [SaleService],
})
export class SaleModule {}
