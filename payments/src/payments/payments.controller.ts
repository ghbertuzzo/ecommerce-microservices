import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { EXPEDITION_SERVICE_RABBITMQ, PROCESS_EXPEDITION, PROCESS_PAYMENT } from '../shared/constants';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

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

    @Get('order/:orderId')
    getByOrderId(@Param('orderId', new ParseUUIDPipe()) orderId: string) {
        return this.paymentsService.findByOrderId(orderId);
    }

    @MessagePattern(PROCESS_PAYMENT)
    async handleProcessPayment(@Payload() order: any) {
        const result = await this.paymentsService.handleProcessPayment(order);

        if (!result.success) {
            console.log('PAYMENT SERVICE: Payment rejected: ', result.reason);
            return;
        }
        console.log('PAYMENT SERVICE: Payment success:', result);
        console.log('PAYMENT SERVICE: Sending order to expedition service...');

        const expeditionPayload = {
            orderId: order.id_order,
            customer_id: order.customer_id,
            recipientName: order.recipientName,
            deliveryForecast: order.deliveryForecast,
            address: {
                street: order.address?.street,
                number: order.address?.number,
                complement: order.address?.complement,
                city: order.address?.city,
                state: order.address?.state,
                postalCode: order.address?.postalCode
            }
        };

        this.expeditionRMQClient.emit(PROCESS_EXPEDITION, expeditionPayload);
    }
}
