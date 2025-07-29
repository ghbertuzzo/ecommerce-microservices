import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Delivery } from './entities/delivery.entity';
import { ExpeditionService } from './expedition.service';
import { ExpeditionController } from './expeditions.controller';

@Module({
  imports:
    [
      TypeOrmModule.forRootAsync({
        useFactory: async () => (await import('../database/config/typeorm.config')).typeOrmConfig
      }),
      TypeOrmModule.forFeature([Address, Delivery]),
    ],
  controllers: [ExpeditionController],
  providers: [ExpeditionService],
})
export class ExpeditionModule { }
