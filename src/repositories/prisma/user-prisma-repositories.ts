/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { env } from 'process';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { PrismaService } from '../../database/prisma.service';
import { UserRepository } from '../user-respositories';
import { UserEntity } from '../../entity/user.entity';
import { EmployeeEntity } from '../../entity/employee.entity';
import { UserModel } from 'src/dtos/user-model';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(newUserModel: {
    name: string;
    email: string;
    password: string;
    type: number;
    expiration_trial: Date;
    cnpj: string;
    phone_number: string;
  }): Promise<UserEntity> {
    try {
      const existUser = await this.prisma.user.findUnique({
        where: {
          email: newUserModel.email,
        },
      });

      if (!existUser) {
        const salt = await bcrypt.genSalt(10);
        newUserModel.password = await bcrypt.hash(newUserModel.password, salt);

        return await this.prisma.user.create({
          data: {
            name: newUserModel.name,
            email: newUserModel.email,
            password: newUserModel.password,
            type: newUserModel.type,
            cnpj: newUserModel.cnpj,
            phone_number: newUserModel.phone_number,
            is_trial: true,
            is_assinant: false,
            expiration_trial: newUserModel.expiration_trial,
          },
        });
      } else {
        throw new Error('Conta já registrada');
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
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

      const userWithEmployeeEmail = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!employer)
        throw new NotFoundException('Estabelecimento não encontrado');

      if (userWithEmployeeEmail) {
        throw new NotImplementedException('Já existe conta com este email');
      } else {
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
            },
          });
        } else {
          throw new NotImplementedException('Funcionário já registrado');
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async updateUserAccount(user_id: string, account_info: UserModel): Promise<UserEntity> {
    try {
      const user = await this.getAccountInfo(user_id)
      
      if (user) {
        return await this.prisma.user.update({
          where: {
            id: user_id,
          }, data: {
            is_assinant: account_info.is_assinant,
            is_trial: account_info.is_trial,
            confirmed_email: account_info.confirmed_email,
            email: account_info.email,
            subscription_id: account_info.subscription_id,
            subscription_plan: account_info.subscription_plan,
          },
        })
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
        return new NotAcceptableException(
          'Credenciais Inválidas! Favor, tentar novamente'
        );
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
              userId: employer ? employer.id : employee.user_id,
              employeeId: employee ? employee.id : '',
            },
            env.SECRET_MESSAGE,
            {
              expiresIn: '1h',
            }
          );

          return {
            token,
            userId: employer ? employer.id : employee.user_id,
            employeeId: employee ? employee.id : '',
            expiresIn: 3600,
            user: user.name,
            type: user.type,
            expiration_trial: employer.expiration_trial,
            is_assinant: employer.is_assinant,
            is_trial: employer.is_trial,
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
      });

      return !!user;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getAccountInfo(userId: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException(
          'Não foi possível encontrar o user de ID:' + userId
        );
      } else {
        return user;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
