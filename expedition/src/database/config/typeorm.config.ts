import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Address } from 'src/expedition/entities/address.entity';
import { Delivery } from 'src/expedition/entities/delivery.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres_expedition',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.POSTGRES_EXPEDITION_USER || 'user',
  password: process.env.POSTGRES_EXPEDITION_PASSWORD || 'pass',
  database: process.env.POSTGRES_EXPEDITION_DB || 'expedition',
  entities: [Address, Delivery],
  synchronize: true,
};
