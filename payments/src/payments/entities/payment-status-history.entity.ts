import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { Payment } from "./payment.entity";

@Entity('payment_status_history')
export class PaymentStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Payment, payment => payment.statusHistory)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'changed_at' })
  changedAt: Date;
}
