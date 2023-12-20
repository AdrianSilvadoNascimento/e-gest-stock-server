import { ItemEntity } from "./item.entity"
import { ClientEntity } from "./client.entity"
import { MovementationEntity } from "./movementation.entity"
import { EmployeeEntity } from "./employee.entity"

export class UserEntity {
  name: string
  email: string
  password: string
  type: number

  confirmed_email: boolean
  is_assinant: boolean
  is_trial: boolean

  item?: ItemEntity[]
  movementations?: MovementationEntity[]
  clients?: ClientEntity[]
  employee?: EmployeeEntity[]

  created_at: Date
  updated_at: Date

  // constructor(
  //   name: string,
  //   password: string,
  //   confirmed_email: boolean,
  //   is_assinant: boolean,
  //   is_trial: boolean,
  //   email: string,
  //   created_at: Date,
  //   updated_at: Date,
  //   item?: ItemEntity[],
  //   clients?: ClientEntity[],
  //   movementations?: MovementationEntity[],
  //   employee?: EmployeeEntity[],
  // ) {
  //   this.name = name
  //   this.email = email
  //   this.password = password
  //   this.confirmed_email = confirmed_email
  //   this.is_assinant = is_assinant
  //   this.is_trial = is_trial
  //   this.item = item
  //   this.clients = clients
  //   this.movementations = movementations
  //   this.employee = employee
  //   this.created_at = created_at
  //   this.updated_at = updated_at
  // }
}