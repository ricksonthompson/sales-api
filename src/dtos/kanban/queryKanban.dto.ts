import { EKanbanType } from "../../utils/ETypes";

export interface IQueryKanban {
  sequenceQr?: number
  process?: string
  type?: EKanbanType
  product?: string
}