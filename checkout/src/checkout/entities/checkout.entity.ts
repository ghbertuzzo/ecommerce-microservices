import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';
import { CheckoutItem } from './checkout-item.entity';

@Entity('checkouts')
export class Checkout {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    customer_id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    order_total: number;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => CheckoutItem, (item) => item.checkout, {
        cascade: true,
        eager: true,
    })
    items: CheckoutItem[];
}
