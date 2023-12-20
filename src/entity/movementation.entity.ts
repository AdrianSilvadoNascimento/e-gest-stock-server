import { EmployeeModel } from "../dtos/employee-model"
import { ItemEntity } from "./item.entity"
import { UserEntity } from "./user.entity"

export class MovementationEntity {
  move_type: string
  quantity: number
  item_id?: string
  item?: ItemEntity
  user_id?: string
  user?: UserEntity
  employee_id?: string
  employee?: EmployeeModel
  created_at: Date
  updated_at?: Date

  constructor(
    move_type: string,
    quantity: number,
    created_at: Date,
    updated_at?: Date,
    item_id?: string,
    item?: ItemEntity,
    user_id?: string,
    user?: UserEntity,
    employee_id?: string,
    employee?: EmployeeModel
  ) {
    this.move_type = move_type
    this.quantity = quantity
    this.created_at = created_at
    this.updated_at = updated_at
    this.item_id = item_id
    this.item = item
    this.user_id = user_id
    this.user = user
    this.employee_id = employee_id
    this.employee = employee
  }
}