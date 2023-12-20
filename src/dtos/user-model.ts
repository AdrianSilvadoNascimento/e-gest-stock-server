import { IsNotEmpty } from 'class-validator';

import { ItemModel } from './item-model';
import { MovementationModel } from './movementation-model';
import { EmployeeModel } from './employee-model';
import { ClientModel } from './client-model';

export class UserModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  type: number;

  confirmed_email: boolean;
  is_assinant: boolean;
  is_trial: boolean;

  item?: ItemModel[];
  movementations?: MovementationModel[];
  clients?: ClientModel[];
  employee?: EmployeeModel[];
}
