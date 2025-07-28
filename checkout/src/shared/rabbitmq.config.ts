import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CHECKOUT_QUEUE } from '../shared/constants';

export function getRabbitMQOptions(): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: CHECKOUT_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  };
}
