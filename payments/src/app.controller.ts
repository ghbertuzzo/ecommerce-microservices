import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { EXPEDITION_SERVICE_RABBITMQ, PROCESS_EXPEDITION, PROCESS_PAYMENT } from './constants';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(EXPEDITION_SERVICE_RABBITMQ) private readonly expeditionRMQClient: ClientProxy,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern(PROCESS_PAYMENT)
  handleProcessPayment(@Payload() order: any) {
    //armazena dados do pagamento do pedido na tabela de pagamentos, dispara evento para fila de expedição qdo pagamento for aprovado
    console.log('PAYMENT SERVICE: Received new payment order: ', order);
    if (!this.appService.processPayment(order)) {
      console.log('PAYMENT SERVICE: Payment rejected: ', order);
    }
    console.log('PAYMENT SERVICE: Payment success: ', order);
    console.log('PAYMENT SERVICE: Send order to expedition service: ', order);
    this.expeditionRMQClient.emit(PROCESS_EXPEDITION, order);
  }
}
