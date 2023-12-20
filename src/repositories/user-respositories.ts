import { EmployeeEntity } from "../entity/employee.entity";
import { UserEntity } from "../entity/user.entity";

export abstract class UserRepository {
  abstract createUser(
    name: string,
    email: string,
    password: string,
    type: number
  ): Promise<UserEntity>;

  abstract createEmployee(
    name: string,
    email: string,
    lastname: string,
    password: string,
    type: number,
    employerEmail: string
  ): Promise<EmployeeEntity>;

  abstract loginUser(email: string, password: string): Promise<any>;

  abstract checkUser(userId: string): Promise<boolean>;
}
