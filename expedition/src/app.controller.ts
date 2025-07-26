import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PROCESS_EXPEDITION } from './constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern(PROCESS_EXPEDITION)
  handleProcessExpedition(@Payload() order: any) {
    //armazena dados da expedição do pedido na tabela de expedição
    console.log('EXPEDITION SERVICE: Received new expedition order: ', order);
    console.log('EXPEDITION SERVICE: Expedition success: ', order);
  }
}
