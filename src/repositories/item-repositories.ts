import { ItemModel } from "../dtos/item-model";
import { ItemEntity } from "../entity/item.entity";

export abstract class ItemRepository {
  abstract getItem(itemId: string): Promise<ItemEntity>
  abstract getItems(userId: string): Promise<ItemEntity[]>
  abstract getItemByBarcode(barcode: string): Promise<ItemEntity>
  abstract updateItem(itemId: string, body: ItemModel): Promise<ItemEntity>
  abstract registerItem(userId: string, body: ItemModel): Promise<ItemEntity>
  abstract deleteItem(itemId: string): Promise<ItemEntity>
}