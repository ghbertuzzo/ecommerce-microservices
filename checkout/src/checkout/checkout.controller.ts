import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { ORDER_CREATED, PAYMENT_SERVICE_RABBITMQ, PROCESS_PAYMENT } from 'src/shared/constants';

@Controller('checkout')
export class CheckoutController {
    constructor(
        private readonly checkoutService: CheckoutService,
        @Inject(PAYMENT_SERVICE_RABBITMQ) private readonly paymentRMQClient: ClientProxy,
    ) { }

    @Get('order/:orderId')
    async findByOrderId(@Param('orderId', new ParseUUIDPipe()) orderId: string): Promise<any> {
        return this.checkoutService.findByOrderId(orderId);
    }

    @MessagePattern(ORDER_CREATED)
    async handleOrderCreated(@Payload() order: any) {
        const savedCheckout = await this.checkoutService.handleProcessOrder(order);

        const paymentPayload = {
            id_order: savedCheckout.id,
            method: order.payment_method,
            amount: savedCheckout.order_total,
            customer_id: order.customer_id,
            items: order.items,
            recipientName: order.recipientName,
            deliveryForecast: order.deliveryForecast,
            address: order.address,
        };

        console.log('CHECKOUT SERVICE: Send order to payment service: ', paymentPayload);
        this.paymentRMQClient.emit(PROCESS_PAYMENT, paymentPayload);
    }
}
