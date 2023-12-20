export class CategoryEntity {
  name: string
  value: string
  created_at: Date
  updated_at?: Date

  constructor(name: string, value: string, created_at: Date, updated_at?: Date) {
    this.name = name
    this.value = value
    this.created_at = created_at
    this.updated_at = updated_at
  }
}