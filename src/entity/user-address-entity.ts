/* eslint-disable prettier/prettier */
import { UserEntity } from './user.entity';

export class UserAddressEntity {
  street: string;
  house_number: number;
  neighborhood: string;
  postal_code: string;
  country: string;
  user_id: string;
  user?: UserEntity;

  created_at: Date;
  updated_at?: Date;
}
