import { Test, TestingModule } from '@nestjs/testing';

import { ClientController } from './client.controller';
import { ClientService } from '../../services/client/client.service';
import { ClientEntity } from '../../entity/client.entity';
import { ClientModel } from '../../dtos/client-model';
import { UserEntity } from '../../entity/user.entity';

// Mock client
const client = new ClientEntity()
client.name = 'Adrian'
client.lastname = 'Silva'
client.age = 22
client.email = 'adrian@gmail.com'
client.sex = 'male'
client.created_at = new Date()

// Mock client list
const clientList: ClientEntity[] = [client]

// Mock new client
const newClient: ClientModel = {
  age: 22,
  created_at: new Date(),
  email: 'client@example.com',
  lastname: 'John',
  name: 'Doe',
  sex: 'male',
  user: new UserEntity(),
  user_id: '1',
}

// Mock update client
const updatedClient: ClientModel = {
  age: 22,
  created_at: new Date(),
  email: 'test@example.com',
  lastname: 'Updated Jhon',
  name: 'Doe',
  sex: 'male',
  user: new UserEntity(),
  user_id: '1',
}

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [{
        provide: ClientService,
        useValue: {
          getClient: jest.fn().mockResolvedValueOnce(client),
          getClients: jest.fn().mockResolvedValueOnce(clientList),
          registerClient: jest.fn().mockResolvedValue(newClient),
          updateClient: jest.fn().mockResolvedValue(updatedClient),
          deleteClient: jest.fn().mockResolvedValueOnce(client),
        }
      }],
    }).compile();

    service = module.get<ClientService>(ClientService)
    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('Should get all clients', async () => {
      // Arrange
      // Act
      const result = await service.getClients('1')
  
      // Assert
      expect(result).toEqual(clientList)
      expect(result.length).toBeGreaterThan(0)
      expect(typeof result).toEqual('object')
      expect(service.getClients).toHaveBeenCalledTimes(1)
    })

    it('Should get client', async () => {
      // Arrange
  
      // Act
      const result = await service.getClient('1')
  
      // Assert
      expect(result).toEqual(client)
      expect(typeof result).toEqual('object')
      expect(service.getClient).toHaveBeenCalledTimes(1)
    })
  })

  describe('Client', () => {
    it('Should register a new client', async () => {
      // Arrange
      // Act
      const result = await service.registerClient('1', newClient)
      
      // Assert
      expect(result).toEqual(newClient)
      expect(service.registerClient).toHaveBeenCalledTimes(1)
    })

    it('Should update a client', async () => {
      // Arrange
      // Act
      const result = await service.updateClient('1', updatedClient)
      
      // Assert
      expect(result).toEqual(updatedClient)
      expect(service.updateClient).toHaveBeenCalledTimes(1)
    })

    it('Should delete a client', async () => {
      // Arrange
      // Act

      const result = await service.deleteClient('1')
      
      // Assert
      expect(result).toBeTruthy()
    })
  })
});
