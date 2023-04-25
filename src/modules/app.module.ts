import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SaleModule } from "./sale.module";
import { ApiModule } from "./api.module";
import { RepositoryModule } from "./repository.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    RepositoryModule,
    ApiModule,
    SaleModule,
  ],
})
export class AppModule {}
