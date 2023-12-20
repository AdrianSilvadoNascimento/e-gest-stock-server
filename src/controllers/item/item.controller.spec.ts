import { Test, TestingModule } from '@nestjs/testing';

import { ItemController } from './item.controller';
import { ItemService } from '../../services/item/item.service';
import { ItemModel } from '../../dtos/item-model';
import { ItemEntity } from '../../entity/item.entity';

const userId: string = '651f4714198189eebffef220'

const itemsList: ItemEntity[] = [
  new ItemEntity('Adrian', '', 0, 0, 0, '', userId, [], new Date(), null),
  new ItemEntity('Adrian', '', 0, 0, 0, '', userId, [], new Date(), null),
  new ItemEntity('Adrian', '', 0, 0, 0, '', userId, [], new Date(), null)
]

const newItem: ItemModel = {
  name: 'Produto-teste',
  category: '',
  created_at: new Date(),
  user_id: userId,
  product_image: '',
  quantity: 0,
  movementations: [],
  sale_price: 0,
  unit_price: 0,
  user: {
    name: 'Adrian',
    email: 'adrian@email.com',
    confirmed_email: false,
    is_assinant: false,
    is_trial: false,
    password: '123456',
    type: 0,
  }
}

describe('ItemController', () => {
  let controller: ItemController;
  let itemService: ItemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: {
            getItems: jest.fn().mockResolvedValue(itemsList),
            getItem: jest.fn(),
            getItemByBarcode: jest.fn(),
            updateItem: jest.fn(),
            registerItem: jest.fn().mockResolvedValue(newItem),
            deleteItem: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    itemService = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(itemService).toBeDefined();
  });

  describe('index', () => {
    it('Should get all Items successfuly', async () => {
      // Arrange
      
      // Act
      const result = await controller.getItems(userId)

      // Assert
      expect(result).toEqual(itemsList)
      expect(typeof result).toEqual('object')
      expect(itemService.getItems).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(itemService, 'getItems').mockRejectedValueOnce(new Error())

      // Assert
      expect(controller.getItems(userId)).rejects.toThrow()
    })
  })

  describe('register item', () => {
    it ('should create new item successfully', async () => {
      // Arrange
      const body: ItemModel = {
        name: 'Produto-teste',
        category: '',
        created_at: new Date(),
        user_id: userId,
        product_image: '',
        quantity: 0,
        movementations: [],
        sale_price: 0,
        unit_price: 0,
        user: {
          name: 'Adrian',
          email: 'adrian@email.com',
          confirmed_email: false,
          is_assinant: false,
          is_trial: false,
          password: '123456',
          type: 0,
        }
      }

      // Act
      const result = await itemService.registerItem(userId, body)

      // Assert
      expect(result).toEqual(newItem)
      expect(itemService.registerItem).toHaveBeenCalledTimes(1)
      expect(itemService.registerItem).toHaveBeenCalledWith(userId, body)
    })

    it ('should throw an exception', () => {
      // Arrange
      const body: ItemModel = {
        name: 'Produto-teste',
        category: '',
        created_at: new Date(),
        user_id: userId,
        product_image: '',
        quantity: 0,
        movementations: [],
        sale_price: 0,
        unit_price: 0,
        user: {
          name: 'Adrian',
          email: 'adrian@email.com',
          confirmed_email: false,
          is_assinant: false,
          is_trial: false,
          password: '123456',
          type: 0,
        }
      }

      jest.spyOn(itemService, 'registerItem').mockRejectedValueOnce(new Error())

      // Assert
      expect(controller.registerItem(userId, body)).rejects.toThrow()
    })
  })

  describe('get item', () => {
    it ('should get an item successfully', () => {
      
    })
  })
});
