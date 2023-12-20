import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { MovementationModel } from '../../dtos/movementation-model';
import { MovementationService } from '../../services/movementation/movementation.service';

@Controller('movementation')
export class MovementationController {
  constructor(private readonly movementationService: MovementationService) {}

  @Get('movementation/:id')
  async getMovementations(@Param('id') id: string): Promise<MovementationController[] | any> {    
    return await this.movementationService.getMovementations(id)
  }

  @Post('move')
  async move(@Body() body: MovementationModel): Promise<any> {
    return await this.movementationService.move(body.user_id, body.item_id, body)
  }

  @Delete('move/:id')
  async deleteMovementation(@Param('id') id: string): Promise<any> {
    return await this.movementationService.deleteMovementation(id)
  }
}
