import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { EXPEDITION_SERVICE_RABBITMQ, PROCESS_EXPEDITION, PROCESS_PAYMENT } from '../shared/constants';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from '../payments/dtos/create-payment.dto'
import { PaymentStatus } from '../payments/enums/payment-status.enum';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentsService: PaymentsService,
        @Inject(EXPEDITION_SERVICE_RABBITMQ) private readonly expeditionRMQClient: ClientProxy,
    ) { }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.paymentsService.getById(id);
    }

    @Get('order/:id_order')
    getByOrderId(@Param('id_order') id_order: string) {
        return this.paymentsService.getByOrderId(id_order);
    }

    @MessagePattern(PROCESS_PAYMENT)
    async handleProcessPayment(@Payload() createPaymentDto: CreatePaymentDto) {
        const result = await this.paymentsService.handleProcessPayment(createPaymentDto);
        
        if (!result.success) {
            console.log('PAYMENT SERVICE: Payment rejected: ', result.reason);
            return;
        }
        console.log('PAYMENT SERVICE: Payment success:', result);
        console.log('PAYMENT SERVICE: Sending order to expedition service...');

        this.expeditionRMQClient.emit(PROCESS_EXPEDITION, createPaymentDto.id_order);
    }
}
