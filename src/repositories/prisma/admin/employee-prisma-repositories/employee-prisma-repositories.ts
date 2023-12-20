import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../../database/prisma.service";
import { EmployeeModel } from "../../../../dtos/employee-model";
import { EmployeeEntity } from "../../../../entity/employee.entity";

import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeePrismaRepositories {
  constructor(private prisma: PrismaService) { }

  async getEmployees(userId: string): Promise<EmployeeEntity[]> {
    try {
      return await this.prisma.employee.findMany({
        where: {
          user_id: userId,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async getEmployeeInfo(employeeId: string): Promise<EmployeeEntity> {
    try {
      return await this.prisma.employee.findUnique({
        where: {
          id: employeeId,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async registerEmployee(userId: string, employeeModel: EmployeeModel): Promise<EmployeeEntity> {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: {
          email: employeeModel.email,
        }
      })

      if (employee) {
        throw new Error('Funcionário já registrado')
      } else {
        const salt = await bcrypt.genSalt(10)
        employeeModel.password = await bcrypt.hash(employeeModel.password, salt)

        return await this.prisma.employee.create({
          data: {
            user_id: userId,
            name: employeeModel.name,
            lastname: employeeModel.lastname,
            email: employeeModel.email,
            password: employeeModel.password,
            type: employeeModel.type,
          }
        })
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async updateEmployeeType(employeeId: string, employeeType: number): Promise<EmployeeEntity> {
    try {
      return await this.prisma.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          type: employeeType,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async updateEmployee(employeeId: string, employeeModel: EmployeeModel): Promise<EmployeeEntity> {
    try {
      if (employeeModel.password?.length) {
        const salt = await bcrypt.genSalt(10)
        employeeModel.password = await bcrypt.hash(employeeModel.password, salt)
      }

      return await this.prisma.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          email: employeeModel.email,
          lastname: employeeModel.lastname,
          name: employeeModel.name,
          password: employeeModel.password,
          type: employeeModel.type,
          updated_at: new Date().toISOString()
        }
      })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async deleteEmployee(employeeId: string): Promise<EmployeeEntity> {
    try {
      return await this.prisma.employee.delete({
        where: {
          id: employeeId,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async checkEmployee(employeeId: string): Promise<boolean> {
    try {
      return await !!this.prisma.employee.findUnique({
        where: {
          id: employeeId,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
}
