/* eslint-disable prettier/prettier */
import { UserModel } from '../dtos/user-model';
import { EmployeeEntity } from '../entity/employee.entity';
import { UserEntity } from '../entity/user.entity';
import { UserAddressEntity } from '../entity/user-address-entity';
import { UserAddressModel } from '../dtos/user-address-model';

export abstract class UserRepository {
  abstract createUser(newUserModel: {
    name: string;
    email: string;
    password: string;
    type: number;
    expiration_trial: Date;
    cnpj: string;
    phone_number: string;
  }): Promise<UserEntity>;

  abstract createEmployee(
    name: string,
    email: string,
    lastname: string,
    password: string,
    type: number,
    employerEmail: string
  ): Promise<EmployeeEntity>;

  abstract registerAddress(
    user_id: string,
    account_info: UserAddressModel
  ): Promise<UserAddressEntity>;

  abstract updateUserAccount(
    user_id: string,
    account_info: UserModel
  ): Promise<UserEntity>;

  abstract loginUser(email: string, password: string): Promise<any>;

  abstract checkUser(userId: string): Promise<boolean>;

  abstract getAccountInfo(userId: string): Promise<UserEntity>;
}
