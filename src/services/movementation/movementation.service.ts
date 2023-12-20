import { Injectable } from '@nestjs/common';

import { MovementationModel } from '../../dtos/movementation-model';
import { MovementationRepository } from '../../repositories/movementation-repositories';
import { ItemEntity } from '../../entity/item.entity';
import { MovementationEntity } from '../../entity/movementation.entity';

@Injectable()
export class MovementationService {
  constructor(private readonly movementationRepository: MovementationRepository) { }

  async getMovementations(userId: string): Promise<MovementationModel[] | any> {
    return await this.movementationRepository.getMovementations(userId)
  }

  async move(userId: string, itemId: string, body: MovementationModel): Promise<ItemEntity> {
    return await this.movementationRepository.move(userId, itemId, body)
  }

  async deleteMovementation(movementationId: string): Promise<MovementationEntity> {
    return await this.movementationRepository.deleteMovementation(movementationId)
  }
}
