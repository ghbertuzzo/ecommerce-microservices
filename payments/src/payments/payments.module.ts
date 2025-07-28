import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentFactory } from './payments.factory';
import { PixType } from './payment-type/pix.type';
import { CreditCardType } from './payment-type/credit-card.type';
import { BoletoType } from './payment-type/boleto.type';
import { RabbitMqModule } from 'src/shared/rabbitMQ.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentStatusHistory } from './entities/payment-status-history.entity';

@Module({
  imports:
    [
      RabbitMqModule,
      TypeOrmModule.forRootAsync({
        useFactory: async () => (await import('../database/config/typeorm.config')).typeOrmConfig
      }),
      TypeOrmModule.forFeature([Payment, PaymentStatusHistory]),
    ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentFactory,
    PixType,
    CreditCardType,
    BoletoType,
  ],
})
export class PaymentsModule { }
