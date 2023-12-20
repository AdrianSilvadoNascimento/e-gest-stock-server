import { Injectable, NotAcceptableException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { env } from 'process';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { PrismaService } from '../../database/prisma.service';
import { UserRepository } from '../user-respositories';
import { UserEntity } from '../../entity/user.entity';
import { EmployeeEntity } from '../../entity/employee.entity';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) { }

  async createUser(
    name: string,
    email: string,
    password: string,
    type: number
  ): Promise<UserEntity> {
    try {
      const existUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existUser) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        return await this.prisma.user.create({
          data: {
            name,
            email,
            password,
            type,
          },
        });
      } else {
        throw new Error('Conta já registrada');
      }
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  }

  async createEmployee(
    name: string,
    email: string,
    lastname: string,
    password: string,
    type: number,
    employerEmail: string
  ): Promise<EmployeeEntity> {
    try {
      const employer = await this.prisma.user.findUnique({
        where: {
          email: employerEmail,
        },
      });

      if (!employer) throw new NotFoundException('Estabelecimento não encontrado')

      const existEmployee = await this.prisma.employee.findUnique({
        where: {
          email: email,
        },
      });

      if (!existEmployee) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        return await this.prisma.employee.create({
          data: {
            user_id: employer.id,
            name,
            email,
            lastname,
            password,
            type,
          }
        })

        // return await this.prisma.user.update({
        //   where: {
        //     email: employerEmail,
        //   },

        //   data: {
        //     employee: {
        //       create: {
        //         name,
        //         email,
        //         lastname,
        //         password,
        //         type,
        //       },
        //     },
        //   },
        // });
      } else {
        throw new NotImplementedException('Funcionário já registrado')
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async loginUser(email: string, password: string): Promise<any> {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: {
          email,
        },
      });

      const employer = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      const user = employee ? employee : employer;

      if (!user) {
        return new NotAcceptableException('Credenciais Inválidas! Favor, tentar novamente');
      }

      if (user) {
        const invalidPassword = await bcrypt.compare(password, user.password);

        if (!invalidPassword) {
          return new NotAcceptableException('Senha inválida');
        } else {
          const token = jwt.sign(
            {
              user: user.name,
              email: user.email,
              userId: employer ? employer.id : employee.id,
              employeeId: employee ? employee.id : '',
            },
            env.SECRET_MESSAGE,
            {
              expiresIn: '1h',
            }
          );

          return {
            token,
            userId: employer ? employer.id : employee.id,
            employeeId: employee ? employee.id : '',
            expiresIn: 3600,
            user: user.name,
            type: user.type,
          };
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async checkUser(userId: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      })

      return !!user
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
