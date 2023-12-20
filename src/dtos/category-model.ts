import { IsNotEmpty } from 'class-validator';

export class Category {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: string;

  created_at: Date;
  updated_at?: Date;
}
