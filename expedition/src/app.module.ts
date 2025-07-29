import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/config/typeorm.config';
import { ExpeditionModule } from './expedition/expeditions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ExpeditionModule,
  ],
})
export class AppModule {}
