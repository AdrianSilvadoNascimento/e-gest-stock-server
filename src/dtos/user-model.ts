/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

import { ItemModel } from './item-model';
import { MovementationModel } from './movementation-model';
import { EmployeeModel } from './employee-model';
import { ClientModel } from './client-model';
import { UserAddressModel } from './user-address-model';

export class UserModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  type: number;

  cnpj: string;
  phone_number: string;
  confirmed_email: boolean;
  is_assinant: boolean;
  is_trial: boolean;
  expiration_trial: Date;

  subscription_plan?: string;
  subscription_id?: string;
  item?: ItemModel[];
  movementations?: MovementationModel[];
  clients?: ClientModel[];
  employee?: EmployeeModel[];
  user_address?: UserAddressModel[];
}
