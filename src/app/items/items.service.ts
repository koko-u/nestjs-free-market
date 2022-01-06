import { Injectable } from '@nestjs/common'

import { ItemStatus } from './models/item-status.model'
import { v4 as uuidv4 } from 'uuid'
import { ItemRepository } from './item.repository'
import { CreateItemDto } from './dtos/create-item.dto'
import { Item } from './models/item.model'

@Injectable()
export class ItemsService {
  // // in-memory
  // private readonly _items: Item[] = []

  constructor(private itemRepository: ItemRepository) {}

  async findAll(): Promise<Item[]> {
    const entities = await this.itemRepository.find()
    return entities.map((entity) => ({ ...entity }))
  }

  async findById(id: string): Promise<Item | undefined> {
    const entity = await this.itemRepository.findOne(id)
    if (entity) {
      return { ...entity }
    }
    return undefined
  }

  async create(item: CreateItemDto): Promise<Item> {
    const created = this.itemRepository.create({ ...item, id: uuidv4() })
    const entity = await this.itemRepository.save(created)
    return { ...entity }
  }

  async updateStatus(
    id: string,
    status: ItemStatus,
  ): Promise<Item | undefined> {
    const item = await this.itemRepository.findOne(id)
    if (item) {
      item.status = status
      const entity = await this.itemRepository.save(item)
      return { ...entity }
    }
  }

  async remove(id: string): Promise<void> {
    const item = await this.itemRepository.findOne(id)
    if (item) {
      await this.itemRepository.remove(item)
    }
  }
}
