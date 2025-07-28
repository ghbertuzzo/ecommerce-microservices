import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { getRabbitMQOptions } from './shared/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, getRabbitMQOptions());
  await app.listen();
  Logger.log("Payment Service listening on RabbitMQ...")
}
bootstrap();
