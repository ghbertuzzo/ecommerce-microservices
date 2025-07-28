import { Module } from '@nestjs/common';

import { PaymentsModule } from './payments/payments.module';
import { RabbitMqModule } from './shared/rabbitMQ.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RabbitMqModule,
    PaymentsModule,
  ],
})
export class AppModule { }
