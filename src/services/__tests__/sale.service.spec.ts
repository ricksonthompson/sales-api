import { Test, TestingModule } from "@nestjs/testing";
import ISaleRepository from "../../repositories/sale/sale.repository.contract";
import { SaleService } from "../sale.service";
import { createMock } from "@golevelup/ts-jest";
import { CreateSaleDTO } from "../../dtos/sale/createSale.dto";
import { EPaymentMethod } from "../../utils/ETypes";
import { Sale } from "../../entities/sale.entity";
import { UpdateSaleDTO } from "../../dtos/sale/updateSale.dto";

const props: CreateSaleDTO = {
  customer: "Rickson Thompson",
  flavor: "Cupuaçu",
  paymentMethod: EPaymentMethod.PIX,
  quantity: 10,
  unitaryValue: 6.5,
};

const updateProps: UpdateSaleDTO = {
  quantity: 15,
  unitaryValue: 12,
};

const createdSale = new Sale({
  ...props,
  amount: props.unitaryValue * props.quantity,
});

const SaleRepositoryMock = createMock<ISaleRepository>();

describe("SaleService", () => {
  let service: SaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleService,
        {
          useValue: SaleRepositoryMock,
          provide: "ISaleRepository",
        },
      ],
    }).compile();

    service = module.get<SaleService>(SaleService);
  });

  describe("Create sale", () => {
    it("should be able to create a sale", async () => {
      jest
        .spyOn(SaleRepositoryMock, "create")
        .mockResolvedValueOnce(createdSale);

      const response = await service.create(props);

      expect(response.customer).toEqual(props.customer);
      expect(response.flavor).toEqual(props.flavor);
    });
  });

  describe("Delete sale", () => {
    it("should be able to delete sale", async () => {
      jest
        .spyOn(SaleRepositoryMock, "findById")
        .mockResolvedValueOnce(createdSale);
      jest
        .spyOn(SaleRepositoryMock, "delete")
        .mockResolvedValueOnce(createdSale);

      const id = createdSale.id;

      const response = await service.delete(id);

      expect(response.customer).toEqual(props.customer);
      expect(response.flavor).toEqual(props.flavor);
    });
  });

  describe("List sale", () => {
    it("should be able to list sale by id", async () => {});
  });

  describe("Update sale", () => {
    it("should be able to update sale", async () => {
      jest
        .spyOn(SaleRepositoryMock, "findById")
        .mockResolvedValueOnce(createdSale);
      jest
        .spyOn(SaleRepositoryMock, "update")
        .mockResolvedValueOnce(
          Object.assign({ ...createdSale, ...updateProps })
        );

      const id = createdSale.id;

      const response = await service.update(id, updateProps);

      expect(response.customer).toEqual(updateProps.customer);
      expect(response.flavor).toEqual(updateProps.flavor);
    });
  });
});
