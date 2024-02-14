import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { EmployeeModel } from '../../dtos/employee-model';
import { UserModel } from '../../dtos/user-model';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register-user')
  async createUser(@Body() body: UserModel): Promise<any> {
    const newUserModel: {
      name: string;
      email: string;
      password: string;
      type: number;
      expiration_trial: Date;
      cnpj: string;
      phone_number: string;
    } = {
      name: body.name,
      email: body.email,
      password: body.password,
      type: body.type,
      expiration_trial: body.expiration_trial,
      cnpj: body.cnpj,
      phone_number: body.phone_number,
    };
    return await this.userService.createUser(newUserModel);
  }

  @Post('login-user')
  async loginUser(
    @Body() body: { email: string; password: string }
  ): Promise<any> {
    const { email, password } = body;
    return await this.userService.loginUser(email, password);
  }

  @Post('register-employee')
  async registerEmployee(@Body() body: EmployeeModel): Promise<any> {
    const { name, email, lastname, password, type } = body;
    return await this.userService.createEmployee(
      name,
      email,
      lastname,
      password,
      type,
      body.employerEmail
    );
  }

  @Get(':id/account-info')
  async getAccountInfo(@Param('id') userId: string): Promise<UserEntity> {
    return await this.userService.getAccountInfo(userId);
  }
}
