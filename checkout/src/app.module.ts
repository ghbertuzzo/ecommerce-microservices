import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PAYMENT_QUEUE, PAYMENT_SERVICE_RABBITMQ } from './constants';

@Module({
  imports: [ClientsModule.register([
    {
      name: PAYMENT_SERVICE_RABBITMQ,
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: PAYMENT_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
