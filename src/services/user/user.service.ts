import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repositories/user-respositories';

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

  async createUser(
    name: string,
    email: string,
    password: string,
    type: number
  ): Promise<any> {
    return await this.userRepository.createUser(name, email, password, type);
  }

  async checkUser(userId: string): Promise<boolean> {
    return this.userRepository.checkUser(userId)
  }
}
