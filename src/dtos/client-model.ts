import { IsNotEmpty } from 'class-validator';

import { ClientAddress } from '@prisma/client';
import { UserEntity } from '../entity/user.entity';

export class ClientModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  sex: string;

  @IsNotEmpty()
  user_id: string;
  user: UserEntity;

  address?: ClientAddress[];

  created_at: Date;
  updated_at?: Date;
}
