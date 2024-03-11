/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repositories/user-respositories';
import { UserEntity } from '../../entity/user.entity';
import { UserModel } from 'src/dtos/user-model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createEmployee(
    name: string,
    email: string,
    lastname: string,
    password: string,
    type: number,
    employerEmail: string
  ): Promise<any> {
    return await this.userRepository.createEmployee(
      name,
      email,
      lastname,
      password,
      type,
      employerEmail
    );
  }

  async loginUser(email: string, password: string): Promise<any> {
    return await this.userRepository.loginUser(email, password);
  }

  async createUser(newUserModel: {
    name: string;
    email: string;
    password: string;
    type: number;
    expiration_trial: Date;
    cnpj: string;
    phone_number: string;
  }): Promise<any> {
    return await this.userRepository.createUser(newUserModel);
  }

  async updateUserAccount(
    user_id: string,
    account_info: UserModel
  ): Promise<UserEntity> {
    return await this.userRepository.updateUserAccount(user_id, account_info);
  }

  async checkUser(userId: string): Promise<boolean> {
    return this.userRepository.checkUser(userId);
  }

  async getAccountInfo(userId: string): Promise<UserEntity> {
    return await this.userRepository.getAccountInfo(userId);
  }
}
