import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EXPEDITION_QUEUE } from './constants';

export function getRabbitMQOptions(): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: EXPEDITION_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  };
}
