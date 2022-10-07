import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { KanbanModule } from "./kanban.module";
import { ApiModule } from "./api.module";
import { RepositoryModule } from "./repository.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    RepositoryModule,
    ApiModule,
    KanbanModule
  ],
})

export class AppModule {}
