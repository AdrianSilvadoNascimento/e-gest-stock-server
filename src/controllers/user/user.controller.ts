import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';

import { EmployeeModel } from '../../dtos/employee-model';
import { UserModel } from '../../dtos/user-model';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register-user')
  async createUser(@Body() body: UserModel): Promise<any> {
    const { name, email, password, type } = body;
    return await this.userService.createUser(name, email, password, type);
  }

  @Post('login-user')
  async loginUser(@Body() body: { email: string, password: string }): Promise<any> {
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
}
