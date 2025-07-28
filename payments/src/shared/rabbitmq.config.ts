import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PAYMENT_QUEUE } from '../shared/constants';

export function getRabbitMQOptions(): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: PAYMENT_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  };
}
