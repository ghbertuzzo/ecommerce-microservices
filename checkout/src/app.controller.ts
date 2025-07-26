import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { ORDER_CREATED, PAYMENT_SERVICE_RABBITMQ, PROCESS_PAYMENT } from './constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(PAYMENT_SERVICE_RABBITMQ) private readonly paymentRMQClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern(ORDER_CREATED)
  handleOrderCreated(@Payload() order: any) {
    //armazena dados do pedido na tabela de pedidos, dispara evento para fila de pagamentos
    console.log('CHECKOUT SERVICE: Received new order: ', order);
    console.log('CHECKOUT SERVICE: Send order to payment service: ', order);
    this.paymentRMQClient.emit(PROCESS_PAYMENT, order);
  }
}
