import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CHECKOUT_QUEUE, CHECKOUT_SERVICE_RABBITMQ } from './constants';

@Module({
  imports: [ClientsModule.register([
    {
      name: CHECKOUT_SERVICE_RABBITMQ,
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: CHECKOUT_QUEUE,
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
