import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from '../payments/entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentStatusHistory } from '../payments/entities/payment-status-history.entity';
import { PaymentFactory } from './payments.factory';
import { CreatePaymentDto } from '../payments/dtos/create-payment.dto';
import { PaymentStatus } from '../payments/enums/payment-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentProcessedDto } from './dtos/payment-processed.dto';

@Injectable()
export class PaymentsService {

    constructor(
        @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
        @InjectRepository(PaymentStatusHistory) private readonly historyRepo: Repository<PaymentStatusHistory>,
        private readonly factory: PaymentFactory,
    ) { }

    async handleProcessPayment(createPaymentDto: CreatePaymentDto) {
        console.log('PAYMENT SERVICE: Received new payment order: ', createPaymentDto);
        const payment = await this.savePayment(createPaymentDto);
        return await this.processPayment(payment);
    }

    async savePayment(order: CreatePaymentDto): Promise<Payment> {
        const payment = this.paymentRepo.create({
            id_order: order.id_order,
            amount: order.amount,
            method: order.method,
            status: PaymentStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const saved = await this.paymentRepo.save(payment);
        await this.historyRepo.save({
            payment: saved,
            status: PaymentStatus.PENDING,
            changedAt: new Date(),
        });
        return saved;
    }

    async processPayment(payment: Payment): Promise<{ success: boolean; reason?: string }> {
        const paymentSearch = await this.paymentRepo.findOne({
            where: { id: payment.id },
            relations: ['statusHistory'],
        });

        if (!paymentSearch) return { success: false, reason: 'Payment not found' };
        const processorType = this.factory.getStrategy(payment.method);

        const resultado: PaymentProcessedDto = await processorType.pay();

        paymentSearch.status = resultado.status;
        paymentSearch.updatedAt = new Date();
        await this.paymentRepo.save(paymentSearch);

        await this.historyRepo.save({
            payment: paymentSearch,
            status: resultado.status,
            changedAt: new Date(),
        });

        return resultado.status == PaymentStatus.APPROVED ? { success: true } : { success: false, reason: 'Random rejection for simulation' };
    }

    async getById(id: string): Promise<Payment> {
        const payment = await this.paymentRepo.findOne({
            where: { id },
            relations: ['statusHistory'],
        });

        if (!payment) throw new NotFoundException(`Payment with id ${id} not found`);

        return payment;
    }

    async findByOrderId(orderId: string): Promise<Payment> {
        const payment = await this.paymentRepo.findOne({
            where: { id_order: orderId },
            relations: ['statusHistory'],
        });

        if (!payment) throw new NotFoundException(`Payment with order id ${orderId} not found`);

        return payment;
    }

    async getAll(): Promise<Payment[]> {
        return await this.paymentRepo.find({
            relations: ['statusHistory'],
        });
    }

}
