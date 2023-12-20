import { Injectable, NotFoundException } from "@nestjs/common";

import { MovementationRepository } from "../movementation-repositories";
import { MovementationModel } from "../../dtos/movementation-model";
import { PrismaService } from "../../database/prisma.service";
import { MovementationEntity } from "../../entity/movementation.entity";
import { ItemEntity } from "../../entity/item.entity";

@Injectable()
export class MovementationPrismaRepository implements MovementationRepository {
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

  async move(userId: string, itemId: string, body: MovementationModel): Promise<ItemEntity> {
    try {
      if (!userId || !itemId) throw new NotFoundException('ID do usuário ou do produto inválido')

      const employer = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      })

      const employee = await this.prismaService.employee.findUnique({
        where: {
          id: userId,
        },
      })

      const item = await this.prismaService.item.findUnique({
        where: {
          id: itemId,
        },
      })

      let newQuantity = 0
      if (body.move_type !== this.move_type.entrada) {
        if (body.quantity > item.quantity) {
          throw new Error('A quantidade do produto em estoque é inferior ao solicitado')
        } else {
          newQuantity = item.quantity - body.quantity
        }
      } else {
        newQuantity = item.quantity + body.quantity
      }

      if ((employer || employee) && item) {
        return await this.prismaService.item.update({
          where: {
            id: itemId,
          },
          data: {
            quantity: newQuantity,
            updated_at: new Date().toISOString(),

            movementations: {
              create: {
                move_type: body.move_type,
                user_id: employer ? employer.id : employee.id,
                quantity: body.quantity,
                employee_id: employee?.id,
                updated_at: new Date().toISOString(),
              },
            }
          },
        })
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
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
