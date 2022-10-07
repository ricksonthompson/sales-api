import { Module } from "@nestjs/common";
import { KanbanController } from "../controllers/kanban.controller";
import { KanbanRepository } from "../repositories/kanban/kanban.repository";
import { KanbanService } from "../services/kanban.service";

@Module({
  controllers: [KanbanController],
  providers: [
    KanbanService,
    {
      provide: "IKanbanRepository",
      useClass: KanbanRepository
    }
  ],
  exports: [KanbanService]
})

export class KanbanModule {}
