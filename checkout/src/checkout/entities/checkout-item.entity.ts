import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Checkout } from './checkout.entity';

@Entity('checkout_items')
export class CheckoutItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Checkout, (checkout) => checkout.items)
    checkout: Checkout;

    @Column({ type: 'uuid' })
    product_id: string;

    @Column()
    product_name: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unit_price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price: number;
}
