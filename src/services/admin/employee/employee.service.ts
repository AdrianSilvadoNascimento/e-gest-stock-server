import { Injectable } from '@nestjs/common';

import { EmployeeEntity } from '../../../entity/employee.entity';
import { EmployeeRepository } from '../../../repositories/admin/employee-repositories/employee-repositories';
import { EmployeeModel } from '../../../dtos/employee-model';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  
  async getEmployees(userId: string): Promise<EmployeeEntity[]> {
    return this.employeeRepository.getEmployees(userId)
  }
  async getEmployeeInfo(employeeId: string): Promise<EmployeeEntity> {
    return this.employeeRepository.getEmployeeInfo(employeeId)
  }

  async registerEmployee(userId: string, employeeModel: EmployeeModel): Promise<EmployeeEntity> {
    return this.employeeRepository.registerEmployee(userId, employeeModel)
  }

  async updateEmployeeType(employeeId: string, employeeType: number): Promise<EmployeeEntity> {
    return this.employeeRepository.updateEmployeeType(employeeId, employeeType)
  }

  async updateEmployee(employeeId: string, employeeModel: EmployeeModel): Promise<EmployeeEntity> {
    return this.employeeRepository.updateEmployee(employeeId, employeeModel)
  }

  async deleteEmployee(employeeId: string): Promise<EmployeeEntity> {
    return this.employeeRepository.deleteEmployee(employeeId)
  }

  async checkEmployee(employeeId: string): Promise<Boolean> {
    return this.employeeRepository.checkEmployee(employeeId)
  }
}
