import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_CREATED, CHECKOUT_SERVICE_RABBITMQ } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(CHECKOUT_SERVICE_RABBITMQ) private readonly client: ClientProxy,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("order")
  getOrder(idOrder: string): any {
    //busca dados do pedido no serviço de checkout
    //busca dados do pagamento no serviço de payment
    //busca dados da expedição no serviço de expedition
    //monta objeto com todas informações e retorna
    return { message: "Order full status" };
  }

  @Post("order")
  createOrder(@Body() order: any) {
    //cria pedido e dispara evento na fila de checkout
    this.client.emit(ORDER_CREATED, order);
    return { message: "Order sent to RabbitMQ", order };
  }

}
