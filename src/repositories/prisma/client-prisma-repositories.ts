import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { ClientModel } from "../../dtos/client-model";
import { ClientEntity } from "../../entity/client.entity";

@Injectable()
export class ClientPrismaRepository {
  constructor(private prismaService: PrismaService) { }

  async getClients(userId: string): Promise<ClientEntity[]> {
    try {
      return await this.prismaService.client.findMany({
        where: {
          user_id: userId,
        },
      })
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error fetching clients information')
    }
  }

  async getClient(clientId: string): Promise<ClientEntity> {
    try {
      return await this.prismaService.client.findUnique({
        where: {
          id: clientId,
        },
      })
    } catch (error) {
      throw new Error('Error fetching client information')
    }
  }

  async registerClient(userId: string, body: ClientModel): Promise<ClientEntity> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      })

      if (!user) {
        throw new Error('Could not find user with id ' + userId)
      } else {
        return await this.prismaService.client.create({
          data: {
            age: body.age,
            email: body.email,
            lastname: body.lastname,
            name: body.name,
            sex: body.sex,
            user_id: body.user_id,
          }
        })
      }
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error fetching client information')
    }
  }

  async updateClient(clientId: string, body: ClientModel): Promise<ClientEntity> {
    try {
      const client = await this.prismaService.client.findUnique({
        where: {
          id: clientId,
        },
      })

      if (!client) {
        throw new NotFoundException('Client not found')
      } else {
        return await this.prismaService.client.update({
          where: {
            id: clientId,
          },
          data: {
            age: body?.age,
            updated_at: new Date().toISOString(),
            email: body?.email,
            lastname: body?.lastname,
            name: body?.name,
            sex: body?.sex,
          }
        })
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async deleteClient(clientId: string): Promise<void> {
    try {
      const client = await this.prismaService.client.findUnique({
        where: {
          id: clientId,
        },
      })

      if (!client) {
        throw new NotFoundException('Client not found')
      } else {
        await this.prismaService.client.delete({
          where: {
            id: clientId,
          },
        })
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error while deleting client')
    }
  }
}