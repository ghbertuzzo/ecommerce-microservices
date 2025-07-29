import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CHECKOUT_QUEUE, CHECKOUT_SERVICE_RABBITMQ } from '../shared/constants';

@Module({
  imports: [
    ClientsModule.register([
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
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMqModule {}
