import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PAYMENT_QUEUE } from './constants';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: PAYMENT_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  await app.listen();
  Logger.log("Payment Service listening on RabbitMQ...")
}
bootstrap();
