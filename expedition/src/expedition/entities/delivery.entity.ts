import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { DeliveryStatus } from '../enums/delivery-status.enum';
import { Address } from './address.entity';

@Entity('deliveries')
export class Delivery {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    orderId: string;

    @Column()
    recipientName: string;

    @ManyToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @Column({ type: 'enum', enum: DeliveryStatus, default: DeliveryStatus.PENDING })
    deliveryStatus: DeliveryStatus;

    @Column({ type: 'timestamp' })
    deliveryForecast: Date;

    @Column({ type: 'timestamp', nullable: true })
    deliveredAt?: Date;

    @Column({ nullable: true })
    trackingCode?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
