import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { getRabbitMQOptions } from './shared/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(getRabbitMQOptions());

  await app.startAllMicroservices();
  await app.listen(3000);
  
  Logger.log("Payment Service listening on RabbitMQ...")
}
bootstrap();
