import { ItemEntity } from "./item.entity"
import { MovementationEntity } from "./movementation.entity"
import { UserEntity } from "./user.entity"

export class EmployeeEntity {
  name?: string
  lastname?: string
  email?: string
  password?: string
  type?: number
  employerEmail?: string

  user_id?: string
  user?: UserEntity
  
  item?: ItemEntity[]
  movementations?: MovementationEntity[]

  created_at: Date
  updated_at: Date

  constructor(
    name?: string,
    password?: string,
    email?: string,
    employerEmail?: string,
    type?: number,
    created_at?: Date,
    updated_at?: Date,
    item?: ItemEntity[],
    movementations?: MovementationEntity[],
  ) {
    this.name = name
    this.email = email
    this.password = password
    this.employerEmail = employerEmail
    this.type = type
    this.item = item
    this.movementations = movementations
    this.created_at = created_at
    this.updated_at = updated_at
  }
}