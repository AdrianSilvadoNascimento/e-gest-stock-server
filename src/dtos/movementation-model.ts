import { IsNotEmpty } from 'class-validator';

import { UserModel } from './user-model';
import { EmployeeModel } from './employee-model';
import { ItemModel } from './item-model';

export class MovementationModel {
  @IsNotEmpty()
  move_type: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  item_id?: string;
  item?: ItemModel;

  @IsNotEmpty()
  user_id?: string;
  user?: UserModel;

  @IsNotEmpty()
  employee_id?: string;
  employee?: EmployeeModel;

  created_at: Date;
  updated_at?: Date;
}
