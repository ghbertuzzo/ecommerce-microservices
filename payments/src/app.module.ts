import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EXPEDITION_QUEUE, EXPEDITION_SERVICE_RABBITMQ } from './constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
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
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
