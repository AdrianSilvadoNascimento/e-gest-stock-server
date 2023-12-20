import { EmployeeModel } from "../../../dtos/employee-model";
import { EmployeeEntity } from "../../../entity/employee.entity";

export abstract class EmployeeRepository {
  abstract getEmployees(userId: string): Promise<EmployeeEntity[]>
  abstract getEmployeeInfo(employeeId: string): Promise<EmployeeEntity>
  abstract registerEmployee(userId: string, employeeModel: EmployeeModel): Promise<EmployeeEntity>
  abstract updateEmployee(employeeId: string, employeeModel: EmployeeModel): Promise<EmployeeEntity>
  abstract updateEmployeeType(employeeId: string, employeeType: number): Promise<EmployeeEntity>
  abstract deleteEmployee(employeeId: string): Promise<EmployeeEntity>
  abstract checkEmployee(employeeId: string): Promise<boolean>
}
