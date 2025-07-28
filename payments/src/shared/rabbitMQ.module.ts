import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EXPEDITION_QUEUE, EXPEDITION_SERVICE_RABBITMQ } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EXPEDITION_SERVICE_RABBITMQ,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: EXPEDITION_QUEUE,
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
