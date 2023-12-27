import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { ItemService } from '../../services/item/item.service';
import { ItemEntity } from '../../entity/item.entity';
import { ItemModel } from '../../dtos/item-model';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  
  @Get('/:id')
  async getItems(@Param('id') userId: string): Promise<ItemEntity[]> {
    return await this.itemService.getItems(userId)
  }

  @Get('get-item/:id')
  async getItem(@Param('id') itemId: string): Promise<ItemEntity> {7
    return await this.itemService.getItem(itemId)
  }
  
  @Get('get-item-by-barcode/:id')
  async getItemByBarcode(@Param('id') barcode: string): Promise<ItemEntity> {7
    return await this.itemService.getItemByBarcode(barcode)
  }

  @Post('register-item/:id')
  async registerItem(@Param('id') userId: string, @Body() body: ItemModel): Promise<ItemEntity> {
    return await this.itemService.registerItem(userId, body)
  }

  @Post('update-item/:id')
  async updateItem(@Param('id') itemId: string, @Body() body: ItemModel): Promise<ItemEntity> {
    return await this.itemService.updateItem(itemId, body)
  }
  @Delete('delete-item/:id')
  async deleteItem(@Param('id') itemId: string): Promise<ItemEntity> {
    return await this.itemService.deleteItem(itemId)
  }
}
