import { ItemStatus } from './item-status.model'

export type Item = {
  id: string
  name: string
  price: number
  description: string
  status: ItemStatus
}
