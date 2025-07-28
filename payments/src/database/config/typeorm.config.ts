import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Payment } from '../../payments/entities/payment.entity';
import { PaymentStatusHistory } from '../../payments/entities/payment-status-history.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres_payments',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.POSTGRES_PAYMENTS_USER || 'user',
  password: process.env.POSTGRES_PAYMENTS_PASSWORD || 'pass',
  database: process.env.POSTGRES_PAYMENTS_DB || 'payments',
  entities: [Payment, PaymentStatusHistory],
  synchronize: true,
};
