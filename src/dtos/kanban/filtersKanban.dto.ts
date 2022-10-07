import { IsNumber, IsOptional, IsString } from "class-validator"

export class FiltersKanbanDTO {
  sequenceQr?: number
  process?: string
  type?: string
  product?: string
}
