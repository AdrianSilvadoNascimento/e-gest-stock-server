/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { UserModel } from './user-model';

export class UserAddressModel {
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  house_number: number;
  @IsNotEmpty()
  neighborhood: string;
  @IsNotEmpty()
  postal_code: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  user_id: string;
  user?: UserModel;
}
