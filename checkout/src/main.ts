import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CHECKOUT_QUEUE } from './constants';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: CHECKOUT_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  await app.listen();
  Logger.log("Checkout Service listening on RabbitMQ...")
}
bootstrap();
