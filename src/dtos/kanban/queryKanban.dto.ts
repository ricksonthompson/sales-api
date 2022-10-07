import { EKanbanType } from "src/utils/ETypes"

export interface IQueryKanban {
  sequenceQr?: number
  process?: string
  type?: EKanbanType
  product?: string
}