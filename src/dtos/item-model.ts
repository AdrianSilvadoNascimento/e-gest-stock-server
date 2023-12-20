import { IsNotEmpty } from 'class-validator';

import { UserModel } from './user-model';
import { EmployeeModel } from './employee-model';
import { MovementationModel } from './movementation-model';

export class ItemModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  unit_price: number;

  @IsNotEmpty()
  sale_price: number;

  barcode?: string;

  quantity: number;

  @IsNotEmpty()
  product_image: string;

  @IsNotEmpty()
  user_id: string;
  user: UserModel;

  employee_id?: string;
  employee?: EmployeeModel;

  movementations: MovementationModel[];

  created_at: Date;
  update_at?: Date;
}
