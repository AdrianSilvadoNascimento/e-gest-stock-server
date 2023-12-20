import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { UserModel } from 'src/dtos/user-model';
import { UserController } from '../../controllers/user/user.controller'

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createEmployee: jest.fn(),
            loginUser: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })
})
  
describe('CreateUser', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createEmployee: jest.fn(),
            loginUser: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService);
  })

  it ('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('Should create a user', async () => {
    // Call to the service
    const userData: UserModel = {
      name: 'Adrian',
      email: 'adrian@email.com',
      confirmed_email: false,
      is_assinant: false,
      is_trial: false,
      password: '123456',
      type: 0,
    }

    const user = await service.createUser(userData.name, userData.email, userData.password, userData.type)
    console.log(user)
    expect(user).toHaveProperty('id')
  })
})
