import { EmployeeEntity } from "./employee.entity"
import { MovementationEntity } from "./movementation.entity"
import { UserEntity } from "./user.entity"

export class ItemEntity {
  id?: string
  name?: string
  category?: string
  unit_price?: number
  sale_price?: number
  barcode?: string
  quantity?: number
  product_image?: string
  user_id?: string
  user?: UserEntity
  employee_id?: string
  employee?: EmployeeEntity
  movementations?: MovementationEntity[]
  created_at: Date
  updated_at: Date

  constructor(
    name?: string,
    category?: string,
    unit_price?: number,
    sale_price?: number,
    quantity?: number,
    product_image?: string,
    user_id?: string,
    movementations?: MovementationEntity[],
    created_at?: Date,
    updated_at?: Date,
    barcode?: string,
    user?: UserEntity,
    employee_id?: string,
    employee?: EmployeeEntity,
  ) {
    this.name = name
    this.category = category
    this.unit_price = unit_price
    this.sale_price = sale_price
    this.barcode = barcode
    this.quantity = quantity
    this.product_image = product_image
    this.user_id = user_id
    this.user = user
    this.employee = employee
    this.employee_id = employee_id
    this.movementations = movementations
    this.created_at = created_at
    this.updated_at = updated_at
  }
}