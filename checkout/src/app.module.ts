import { Module } from '@nestjs/common';
import { RabbitMqModule } from './shared/rabbitMQ.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/config/typeorm.config';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RabbitMqModule,
    CheckoutModule,    
  ],
})
export class AppModule {}
