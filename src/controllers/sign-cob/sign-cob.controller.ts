/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';

import { SignCobService } from '../../services/sign-cob/sign-cob.service';

enum Subscriptions {
  bronze = 'Assinatura - Plano Bronze',
  prata = 'Assinatura - Plano Prata',
  ouro = 'Assinatura - Plano Ouro',
}

@Controller('credit')
export class SignCobController {
  constructor(private readonly signCobService: SignCobService) {}

  @Get('plans')
  async getPlans(): Promise<any> {
    return await this.signCobService.getPlans();
  }

  @Post('subscription')
  async createSubscription(@Body() plan_body: any): Promise<any> {
    plan_body.plan_name = Subscriptions[plan_body.plan_name];
    const res = await this.signCobService.createSubscriptions(plan_body);

    return res;
  }

  @Get('specific-plan')
  async getSpecificPlan(@Body() plan_body: any): Promise<any> {
    return await this.signCobService.getSpecificPlan(plan_body.plan_name);
  }

  @Get('create-plan')
  async createAccountSign(
    @Body()
    create_plan_model: {
      name: string;
      interval: number;
      repeats: number;
    }
  ): Promise<any> {
    const res = this.signCobService.createPlans(create_plan_model);

    return res;
  }
}
