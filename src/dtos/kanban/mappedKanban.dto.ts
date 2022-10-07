import { EKanbanType } from "../../utils/ETypes";

export class MappedKanbanDTO {
  id: string
  process: string
  product: string
  sequenceQr: number
  type: EKanbanType | string
  createdAt: Date
}
