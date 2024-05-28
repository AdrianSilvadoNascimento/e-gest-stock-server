/* eslint-disable prettier/prettier */
import { ItemEntity } from './item.entity';
import { ClientEntity } from './client.entity';
import { MovementationEntity } from './movementation.entity';
import { EmployeeEntity } from './employee.entity';
import { UserAddressEntity } from './user-address-entity';

export class UserEntity {
  name: string;
  email: string;
  password: string;
  type: number;
  cnpj: string;
  phone_number: string;

  confirmed_email: boolean;
  is_assinant: boolean;
  is_trial: boolean;
  expiration_trial: Date;

  subscription_plan?: number;
  subscription_id?: number;
  item?: ItemEntity[];
  movementations?: MovementationEntity[];
  clients?: ClientEntity[];
  employee?: EmployeeEntity[];
  user_address?: UserAddressEntity[];

  created_at: Date;
  updated_at: Date;
}
