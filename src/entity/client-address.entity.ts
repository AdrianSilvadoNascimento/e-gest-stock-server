import { ClientEntity } from "./client.entity";

export class ClientAddresEntity {
  street: string;
  house_number: number;
  neighborhood: string;
  postal_code: string;
  country: string;
  client_id: string;
  user: ClientEntity;

  created_at: Date;
  updated_at?: Date;

  constructor(
    street: string,
    house_number: number,
    neighborhood: string,
    postal_code: string,
    country: string,
    client_id: string,
    user: ClientEntity,
    created_at: Date,
    updated_at?: Date
  ) {
    this.street = street;
    this.house_number = house_number;
    this.neighborhood = neighborhood;
    this.postal_code = postal_code;
    this.country = country;
    this.client_id = client_id;
    this.user = user;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}