import { v4 as uuid } from 'uuid';

export class Kanban {
  id: string
  sequenceQr: number
  type: string
  process: string
  product: string
  createdAt: Date
  updatedAt?: Date

  constructor(
    props: Omit<Kanban, "id" | "createdAt">,
    id?: string
  ) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
