/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { env } from 'process';

import axios from 'axios';

import { UserService } from '../user/user.service';
import { UserEntity } from '../../entity/user.entity';
import { EfiManagement } from '../../utils/efi-management/efi-management';
import { UserModel } from 'src/dtos/user-model';

@Injectable()
export class SignCobService {
  IS_COB = true;
  efiManager = new EfiManagement();

  planConfig = {
    method: 'POST',
    url: `${env.ROUTE_COB}/v1/plan`,
    headers: this.efiManager.headersConfig,
    httpsAgent: this.efiManager.agent,
    data: {},
  };

  constructor(private readonly accountService: UserService) {
    this.efiManager.getCertificate(env.ROUTE_COB, this.IS_COB);
  }

  async getPlans(): Promise<any> {
    try {
      await this.efiManager.getAccessToken();

      const plans = await axios({
        method: 'GET',
        url: `${env.ROUTE_COB}/v1/plans`,
        headers: this.efiManager.headersConfig,
        httpsAgent: this.efiManager.agent,
      });

      return plans.data.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSpecificPlan(plan_name: string): Promise<any> {
    try {
      await this.efiManager.getAccessToken();

      const plans = await axios({
        method: 'GET',
        url: `${env.ROUTE_COB}/v1/plans?name=${plan_name}`,
        headers: this.efiManager.headersConfig,
        httpsAgent: this.efiManager.agent,
      });

      return plans.data.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async getPlanId(plan_name: string): Promise<number> {
    const plan = await this.getSpecificPlan(plan_name);

    const plan_id: number = plan[0]['plan_id'];

    return plan_id;
  }

  async createPlans(plan_config: {
    name: string;
    interval: number;
    repeats: number;
  }): Promise<any> {
    try {
      await this.efiManager.getAccessToken();
      this.planConfig.headers = this.efiManager.headersConfig;
      this.planConfig.data = {
        name: plan_config.name,
        interval: plan_config.interval,
        repeats: plan_config.repeats,
      };

      const res = await axios(this.planConfig);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createSubscriptions(plan_data: {
    payment_token: string;
    plan_name: string;
    value: number;
    account_id: string;
  }): Promise<any> {
    try {
      const plan_id = await this.getPlanId(plan_data.plan_name);
      const url = `${env.ROUTE_COB}/v1/plan/${plan_id}/subscription/one-step`;

      const items = [
        {
          name: plan_data.plan_name,
          amount: 1,
          value: plan_data.value,
        },
      ];

      const accountUser: UserEntity = await this.accountService.getAccountInfo(
        plan_data.account_id
      );
      const juridical_info = {
        corporate_name: accountUser.name,
        cnpj: accountUser.cnpj,
      };

      // TODO: precisa pegar do usuário, quando criar a conta, endereço e data de nascimento do assinante (obs.: Deve ser maior dd 18).
      const billing_address = accountUser.user_address[0];
      const data = {
        items: items,
        payment: {
          credit_card: {
            customer: {
              phone_number: accountUser.phone_number,
              email: accountUser.email,
              juridical_person: juridical_info,
            },
            payment_token: plan_data.payment_token,
            billing_address: {
              street: billing_address.street,
              number: billing_address.house_number,
              neighborhood: billing_address.neighborhood,
              zipcode: billing_address.postal_code,
              city: billing_address.country,
              complement: billing_address.complement,
              state: billing_address.state,
            },
          },
        },
      };

      return await axios({
        method: 'POST',
        url: url,
        headers: this.efiManager.headersConfig,
        httpsAgent: this.efiManager.agent,
        data: data,
      })
        .then((res) => {
          const user: UserModel = {
            subscription_id: res.data.data.subscription_id,
            subscription_plan: res.data.data.plan.id,
            name: accountUser.name,
            email: accountUser.email,
            password: accountUser.password,
            type: accountUser.type,
            cnpj: accountUser.cnpj,
            phone_number: accountUser.phone_number,
            confirmed_email: accountUser.confirmed_email,
            is_assinant: accountUser.is_assinant,
            is_trial: accountUser.is_trial,
            expiration_trial: accountUser.expiration_trial,
          };

          console.log(res)
          console.log(user)
          this.accountService.updateUserAccount(plan_data.account_id, user);
          return res;
        })
        .catch((err) => console.error('erro do axios:', err.response.data));
    } catch (error) {
      throw new Error(error);
    }
  }
}
