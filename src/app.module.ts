import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';

import { AppController } from './app.controller';
import { UserService } from './services/user/user.service';
import { MovementationService } from './services/movementation/movementation.service';
import { ClientService } from './services/client/client.service';
import { ItemService } from './services/item/item.service';
import { UserController } from './controllers/user/user.controller';
import { ItemController } from './controllers/item/item.controller';
import { MovementationController } from './controllers/movementation/movementation.controller';
import { ClientController } from './controllers/client/client.controller';
import { UserRepository } from './repositories/user-respositories';
import { UserPrismaRepository } from './repositories/prisma/user-prisma-repositories';
import { MovementationRepository } from './repositories/movementation-repositories';
import { MovementationPrismaRepository } from './repositories/prisma/movementation-prisma-repositories';
import { ItemRepository } from './repositories/item-repositories';
import { ItemPrismaRepository } from './repositories/prisma/item-prisma-repositories';
import { ClientRepository } from './repositories/client-repositories';
import { ClientPrismaRepository } from './repositories/prisma/client-prisma-repositories';
import { NotFoundExceptionFilter } from './custom-errors/not-found-exception-filter/not-found-exception-filter';
import { EmployeeController } from './controllers/admin/employee/employee.controller';
import { EmployeeService } from './services/admin/employee/employee.service';
import { EmployeeRepository } from './repositories/admin/employee-repositories/employee-repositories';
import { EmployeePrismaRepositories } from './repositories/prisma/admin/employee-prisma-repositories/employee-prisma-repositories';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ItemController,
    MovementationController,
    ClientController,
    EmployeeController,
  ],
  providers: [
    AppService,
    PrismaService,
    UserService,
    MovementationService,
    ClientService,
    EmployeeService,
    ItemService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: MovementationRepository,
      useClass: MovementationPrismaRepository,
    },
    {
      provide: ItemRepository,
      useClass: ItemPrismaRepository,
    },
    {
      provide: ClientRepository,
      useClass: ClientPrismaRepository,
    },
    {
      provide: EmployeeRepository,
      useClass: EmployeePrismaRepositories,
    },
    EmployeeService
  ],
})
export class AppModule {}
