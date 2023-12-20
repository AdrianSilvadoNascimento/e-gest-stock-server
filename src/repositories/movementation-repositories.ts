import { MovementationEntity } from "../entity/movementation.entity";
import { MovementationModel } from "../dtos/movementation-model";
import { ItemEntity } from "../entity/item.entity";

export abstract class MovementationRepository {
  abstract getMovementations(userId: string): Promise<MovementationEntity[]>
  abstract move(userId: string, itemId: string, body: MovementationModel): Promise<ItemEntity>
  abstract deleteMovementation(movementationId: string): Promise<MovementationEntity>
}
