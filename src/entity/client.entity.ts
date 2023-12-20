import { ClientAddress } from "@prisma/client"

import { UserEntity } from "./user.entity"

export class ClientEntity {
  name: string
  lastname: string
  age: number
  email: string
  sex: string
  user_id: string
  user?: UserEntity
  created_at: Date
  updated_at: Date
  address?: ClientAddress

  // constructor(
  //   name: string,
  //   lastname: string,
  //   email: string,
  //   sex: string,
  //   user_id: string,
  //   created_at: Date,
  //   updated_at: Date,
  //   user?: UserEntity,
  // ) {
  //   this.name = name
  //   this.lastname = lastname
  //   this.email = email
  //   this.sex = sex
  //   this.user_id = user_id
  //   this.user = user
  //   this.created_at = created_at
  //   this.updated_at = updated_at
  // }
}