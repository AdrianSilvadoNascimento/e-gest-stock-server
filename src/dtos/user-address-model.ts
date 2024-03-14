/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { UserModel } from './user-model';

export class UserAddressModel {
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  house_number: string;
  @IsNotEmpty()
  neighborhood: string;
  @IsNotEmpty()
  postal_code: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  state: string;
  @IsNotEmpty()
  complement: string;
  user_id: string;
  user?: UserModel;
}
