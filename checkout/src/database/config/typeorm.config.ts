import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CheckoutItem } from 'src/checkout/entities/checkout-item.entity';
import { Checkout } from 'src/checkout/entities/checkout.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres_checkout',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.POSTGRES_CHECKOUT_USER || 'user',
  password: process.env.POSTGRES_CHECKOUT_PASSWORD || 'pass',
  database: process.env.POSTGRES_CHECKOUT_DB || 'checkout',
  entities: [Checkout, CheckoutItem],
  synchronize: true,
};
