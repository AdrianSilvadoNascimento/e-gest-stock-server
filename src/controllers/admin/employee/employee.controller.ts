import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';

import { EmployeeService } from '../../../services/admin/employee/employee.service';
import { EmployeeEntity } from '../../../entity/employee.entity';
import { UserService } from '../../../services/user/user.service';
import { EmployeeModel } from '../../../dtos/employee-model';

@Controller('admin/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService, private readonly userService: UserService) {}

  @Get('get-employees/:id')
  async getEmployees(@Param('id') userId: string): Promise<EmployeeEntity[]> {
    const user = await this.userService.checkUser(userId)
    if (!user) {
      throw new NotFoundException('Não foi possível encontrar o estabelecimento com o ID: ' + userId)
    }

    return await this.employeeService.getEmployees(userId)
  }

  @Get('get-employee-info/:employeeId/:userId')
  async getEmployeeInfo(@Param('employeeId') employeeId: string, @Param('userId') userId: string): Promise<EmployeeEntity> {
    const user = await this.userService.checkUser(userId)
    if (!user) {
      throw new NotFoundException('Não foi possível encontrar o estabelecimento com o ID: ' + userId)
    }

    return await this.employeeService.getEmployeeInfo(employeeId)
  }

  @Post('register-employee/:id')
  async registerEmployee(@Param('id') userId: string, @Body() body: EmployeeModel): Promise<EmployeeEntity> {
    const user = await this.userService.checkUser(userId)
    if (!user) {
      throw new NotFoundException('Não foi possível encontrar o estabelecimento com o ID: ' + userId)
    } else {
      return await this.employeeService.registerEmployee(userId, body)
    }
  }

  @Put('update-employee/:id')
  async updateEmployee(@Param('id') employeeId: string, @Body() employeeModel: EmployeeModel): Promise<EmployeeEntity> {
    const employee = await this.employeeService.checkEmployee(employeeId)

    if (!employee) {
      throw new NotFoundException('Não foi possível encontrar o funcionário com o ID: ' + employeeId)
    } else {
      return await this.employeeService.updateEmployee(employeeId, employeeModel)
    }
  }

  @Patch('update-employee-type/:id/:type')
  async updateEmployeeType(@Param('id') employeeId: string, @Param('type') employeeType: number): Promise<EmployeeEntity> {
    const employee = await this.employeeService.checkEmployee(employeeId)

    if (!employee) {
      throw new NotFoundException(`Não foi possível encontrar o funcionário com o ID: ${employeeId}`)
    } else {
      return await this.employeeService.updateEmployeeType(employeeId, employeeType)
    }
  }

  @Delete('delete-employee/:id')
  async deleteEmployee(@Param('id') employeeId: string): Promise<EmployeeEntity> {
    const employee = await this.employeeService.checkEmployee(employeeId)

    if (!employee) {
      throw new NotFoundException(`Não foi possível encontrar o funcionário com o ID: ${employeeId}`)
    } else {
      return this.employeeService.deleteEmployee(employeeId)
    }
  }
}
