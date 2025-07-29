import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Delivery } from './delivery.entity';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column({ nullable: true })
    complement?: string;

    @Column()
    city: string;

    @Column({ length: 2 })
    state: string;

    @Column()
    postalCode: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Delivery, delivery => delivery.address)
    deliveries: Delivery[];
}
