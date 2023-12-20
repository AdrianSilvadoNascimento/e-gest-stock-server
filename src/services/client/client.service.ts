import { Injectable } from '@nestjs/common'

import { ClientModel } from '../../dtos/client-model'
import { ClientEntity } from '../../entity/client.entity'
import { ClientRepository } from '../../repositories/client-repositories'

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}
  
  async getClients(userId: string): Promise<ClientEntity[]> {
    return await this.clientRepository.getClients(userId)
  }

  async getClient(clientId: string): Promise<ClientEntity> {
    return await this.clientRepository.getClient(clientId)
  }

  async registerClient(userId: string, body: ClientModel): Promise<ClientEntity> {
    return await this.clientRepository.registerClient(userId, body)
  }

  async updateClient(clientId: string, body: ClientModel): Promise<ClientEntity> {
    return await this.clientRepository.registerClient(clientId, body)
  }

  async deleteClient(clientId: string): Promise<ClientEntity> {
    return await this.clientRepository.deleteClient(clientId)
  }
}
