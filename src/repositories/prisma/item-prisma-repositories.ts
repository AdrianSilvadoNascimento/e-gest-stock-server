import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { ItemModel } from "../../dtos/item-model";
import { ItemRepository } from "../item-repositories";
import { ItemEntity } from "../../entity/item.entity";

@Injectable()
export class ItemPrismaRepository implements ItemRepository {
  constructor(private prismaService: PrismaService) { }

  async getItem(itemId: string): Promise<ItemEntity> {
    try {
      const item = await this.prismaService.item.findUnique({
        where: {
          id: itemId,
        }
      })

      if (!item) {
        throw new NotFoundException('Não foi possível encontrar o item com o ID: ' + itemId)
      } else {
        return item
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
  
  async getItems(userId: string): Promise<ItemEntity[]> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      })

      if (!user) {
        throw new NotFoundException('Não foi possível encontrar o user de ID:' + userId)
      } else {
        const items = await this.prismaService.item.findMany({
          where: {
            user_id: userId,
          },
        })

        return items
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async getItemByBarcode(barcode: string): Promise<ItemEntity> {
    try {
      const item = await this.prismaService.item.findUnique({
        where: {
          barcode: barcode,
        },
      })
  
      if (!item) {
        throw new NotFoundException('Produto não encontrado')
      } else {
        return item
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async updateItem(itemId: string, body: ItemModel): Promise<ItemEntity> {
    try {
      const {
        name,
        category,
        unit_price,
        sale_price,
        barcode,
        quantity,
        product_image,
      } = body
      const item = await this.prismaService.item.findUnique({
        where: {
          id: itemId,
        },
      })

      if (!item) {
        throw new NotFoundException('Produto não encontrado')
      } else {
        return await this.prismaService.item.update({
          where: {
            id: itemId,
          },
          data: {
            name,
            category,
            unit_price,
            sale_price,
            barcode,
            quantity,
            product_image,
            updated_at: new Date().toISOString(),
          }
        })
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async registerItem(userId: string, body: ItemModel): Promise<ItemEntity> {
    const {
      name,
      category,
      unit_price,
      sale_price,
      barcode,
      quantity,
      product_image,
    } = body
    
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException('Estabelecimento não encontrado')
    } else {
      return await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          item: {
            create: {
              name,
              category,
              product_image,
              unit_price,
              sale_price,
              barcode,
              quantity,
            },
          },
        }
      })
    }
  }
  
  async deleteItem(itemId: string): Promise<ItemEntity> {
    try {
      const item = await this.prismaService.item.findUnique({
        where: {
          id: itemId,
        },
      })

      if (!item) {
        throw new NotFoundException('Produto não encontrado')
      } else {
        await this.prismaService.movementation.deleteMany({
          where: {
            item_id: itemId,
          },
        })

        return await this.prismaService.item.delete({
          where: {
            id: itemId,
          },
        })
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
}