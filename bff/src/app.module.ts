import { Module } from '@nestjs/common';
import { BffController } from './controllers/bff.controller';
import { CheckoutService } from './services/checkout.service';
import { PaymentService } from './services/payment.service';
import { ExpeditionService } from './services/expedition.service';
import { RabbitMqModule } from './shared/rabbitMQ.module';
import { BffService } from './services/bff.service';

@Module({
  imports: [RabbitMqModule],
  controllers: [BffController],
  providers: [BffService, CheckoutService, PaymentService, ExpeditionService],
})
export class AppModule {}
