import { ClientModel } from "../dtos/client-model";
import { ClientEntity } from "../entity/client.entity";

export abstract class ClientRepository {
  abstract getClients(userId: string): Promise<ClientEntity[]>
  abstract getClient(clientId: string): Promise<ClientEntity>
  abstract registerClient(userId: string, body: ClientModel): Promise<ClientEntity>
  abstract updateClient(clientId: string, body: ClientModel): Promise<ClientEntity>
  abstract deleteClient(clientId: string): Promise<ClientEntity>
}