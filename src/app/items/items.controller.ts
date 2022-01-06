import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ItemsService } from './items.service'
import { Item } from './models/item.model'
import { ItemStatus } from './models/item-status.model'
import { StatusCodes } from 'http-status-codes'
import { CreateItemDto } from './dtos/create-item.dto'

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get('')
  findAll() {
    return this.itemsService.findAll()
  }

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ): Promise<Item> {
    const item = await this.itemsService.findById(id)
    if (item) {
      return item
    } else {
      throw new NotFoundException()
    }
  }

  @Post('')
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemsService.create(body)
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body('status') status: ItemStatus,
  ): Promise<Item> {
    const updated = await this.itemsService.updateStatus(id, status)
    if (updated) {
      return updated
    } else {
      throw new NotFoundException()
    }
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.itemsService.remove(id)
  }
}
