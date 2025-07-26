import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EXPEDITION_QUEUE } from './constants';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: EXPEDITION_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  await app.listen();
  Logger.log("Expedition Service listening on RabbitMQ...")
}
bootstrap();
