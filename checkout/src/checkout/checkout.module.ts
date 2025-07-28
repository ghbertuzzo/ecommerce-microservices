import { Module } from '@nestjs/common';
import { RabbitMqModule } from 'src/shared/rabbitMQ.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from './entities/checkout.entity';
import { CheckoutItem } from './entities/checkout-item.entity';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';

@Module({
  imports:
    [
      RabbitMqModule,
      TypeOrmModule.forRootAsync({
        useFactory: async () => (await import('../database/config/typeorm.config')).typeOrmConfig
      }),
      TypeOrmModule.forFeature([Checkout, CheckoutItem]),
    ],
  controllers: [CheckoutController],
  providers: [
    CheckoutService,
  ],
})
export class CheckoutModule { }
