import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException } from '@nestjs/common'

import { ClientEntity } from '../../entity/client.entity'
import { ClientService } from '../../services/client/client.service'
import { ClientModel } from '../../dtos/client-model'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('get-client/:id')
  async getClient(@Param('id') clientId: string): Promise<ClientEntity> {
    const client = await this.clientService.getClient(clientId)

    if (!client) {
      console.log('client not found')
      throw new NotFoundException('Could not find client')
    }

    return client
  }

  @Get('get-clients/:id')
  async getClients(@Param('id') userId: string): Promise<ClientEntity[]> {
    return await this.clientService.getClients(userId)
  }

  @Post('register-client/:id')
  async registerClient(@Param('id') userId: string, @Body() body: ClientModel): Promise<ClientEntity> {
    return await this.clientService.registerClient(userId, body)
  }

  @Put('update-client/:id')
  async updateClient(@Param('id') clientId: string, @Body() body: ClientModel): Promise<ClientEntity> {
    return await this.clientService.updateClient(clientId, body)
  }

  @Delete('delete-client/:id')
  async deleteClient(@Param('id') clientId: string): Promise<ClientEntity> {
    return await this.clientService.deleteClient(clientId)
  }
}
