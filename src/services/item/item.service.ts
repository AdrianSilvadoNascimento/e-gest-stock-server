import { Injectable } from '@nestjs/common';

import { ItemModel } from '../../dtos/item-model';
import { ItemRepository } from '../../repositories/item-repositories';
import { ItemEntity } from '../../entity/item.entity';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getItems(itemId: string): Promise<ItemEntity[]> {
    return await this.itemRepository.getItems(itemId)
  }

  async getItem(itemId: string): Promise<ItemEntity> {
    return await this.itemRepository.getItem(itemId)
  }

  async getItemByBarcode(barcode: string): Promise<ItemEntity> {
    return await this.itemRepository.getItemByBarcode(barcode)
  }

  async updateItem(itemId: string, body: ItemModel): Promise<ItemEntity> {
    return await this.itemRepository.updateItem(itemId, body)
  }

  async registerItem(userId: string, body: ItemModel): Promise<ItemEntity> {
    return await this.itemRepository.registerItem(userId, body)
  }

  async deleteItem(itemId: string): Promise<ItemEntity> {
    return await this.itemRepository.deleteItem(itemId)
  }
}
