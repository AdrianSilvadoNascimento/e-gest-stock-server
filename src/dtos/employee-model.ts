import { IsNotEmpty } from 'class-validator';
import { UserModel } from './user-model';
import { ItemModel } from './item-model';
import { MovementationModel } from './movementation-model';

export class EmployeeModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  type: number;

  @IsNotEmpty()
  password: string;

  user_id?: string;
  user?: UserModel;

  item?: ItemModel[];
  movementation?: MovementationModel[];

  employerEmail: string;

  created_at: Date;
  updated_at?: Date;
}
