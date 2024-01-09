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

  async move(movementationModel: MovementationModel): Promise<ItemEntity> {
    return await this.movementationRepository.move(movementationModel)
  }

  async deleteMovementation(movementationId: string): Promise<MovementationEntity> {
    return await this.movementationRepository.deleteMovementation(movementationId)
  }
}
