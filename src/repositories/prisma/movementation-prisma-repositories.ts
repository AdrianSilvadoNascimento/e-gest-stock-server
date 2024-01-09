import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";

import { MovementationRepository } from "../movementation-repositories";
import { MovementationModel } from "../../dtos/movementation-model";
import { PrismaService } from "../../database/prisma.service";
import { MovementationEntity } from "../../entity/movementation.entity";
import { ItemEntity } from "../../entity/item.entity";
import { Utils } from "../../utils/messages/utils";
import { ItemModel } from "src/dtos/item-model";
import { EmployeeEntity } from "src/entity/employee.entity";

@Injectable()
export class MovementationPrismaRepository implements MovementationRepository {
  private utils = new Utils()
  private stockLowMessage = this.utils.stockQuantityIsLowThenRequested()

  private move_type: { entrada: string } = {
    entrada: 'entrada'
  }

  constructor(private prismaService: PrismaService) { }

  async getMovementations(userId: string): Promise<MovementationEntity[] | any> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      })

      if (!user) {
        throw new NotFoundException('Estabelecimento não encontrado')
      } else {
        return await this.prismaService.movementation.findMany({
          where: {
            user_id: userId,
          },
          include: {
            user: true,
            item: true,
            employee: true,
          },
        })
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async move(movementationModel: MovementationModel): Promise<ItemEntity> {
    const userId = movementationModel.user_id
    const itemId = movementationModel.item_id
    const employeeId = movementationModel?.employee_id

    try {
      if (!userId || !itemId) throw new NotFoundException('ID do usuário ou do produto inválido')

      const employer = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      })

      const item = await this.prismaService.item.findUnique({
        where: {
          id: itemId,
        },
      })

      let newQuantity = this.calculateStockQuantity(movementationModel, item)

      const newMovementation: {
        move_type: string,
        user_id: string,
        quantity: number,
        updated_at: string,
        employee_id?: string
      } = {
        move_type: movementationModel.move_type,
        user_id: userId,
        quantity: movementationModel.quantity,
        updated_at: new Date().toISOString(),
      }

      if (employeeId) {
        newMovementation.employee_id = employeeId
      }

      if (employer && item) {
        return await this.prismaService.item.update({
          where: {
            id: itemId,
          },
          data: {
            quantity: newQuantity,
            updated_at: new Date().toISOString(),

            movementations: {
              create: newMovementation,
            }
          },
        })
      }
    } catch (error) {
      console.error(error)
      if (error.message === this.stockLowMessage) {
        throw new HttpException(this.stockLowMessage, HttpStatus.BAD_REQUEST)
      } else {
        throw new Error(error)
      }
    }
  }

  private calculateStockQuantity(movementationModel: MovementationModel, itemModel: ItemEntity): number {
    if (movementationModel.move_type.toLowerCase() === this.move_type.entrada) return itemModel.quantity + movementationModel.quantity

    if (movementationModel.quantity > itemModel.quantity) {
      throw new HttpException(this.stockLowMessage, HttpStatus.BAD_REQUEST)
    } else {
      return itemModel.quantity - movementationModel.quantity
    }
  }

  async deleteMovementation(movementationId: string): Promise<MovementationEntity> {
    try {
      const movementation = await this.prismaService.movementation.findUnique({
        where: {
          id: movementationId,
        },
      })

      if (!movementation) {
        throw new NotFoundException('Movimentação não encontrado')
      } else {
        const itemReference = await this.prismaService.item.findUnique({
          where: {
            id: movementation.item_id,
          },
        })

        if (!itemReference) {
          throw new NotFoundException('Produto não encontrado')
        } else {
          const newQuantity = movementation.move_type != this.move_type.entrada
            ? itemReference.quantity + movementation.quantity
            : itemReference.quantity - movementation.quantity

          await this.prismaService.item.update({
            where: {
              id: movementation.item_id,
            },
            data: {
              quantity: newQuantity,
            },
          })

          return await this.prismaService.movementation.delete({
            where: {
              id: movementationId,
            },
          })
        }
      }
    } catch (error) {
      console.error(error)
      throw new Error('Ocorreu algum erro')
    }
  }
}
