import { IsNotEmpty } from 'class-validator';

import { ClientModel } from './client-model';

export class ClientAddress {
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
  client_id: string;
  user: ClientModel;

  created_at: Date;
  updated_at?: Date;
}
